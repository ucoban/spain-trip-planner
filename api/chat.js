/* The trip assistant.
 *
 *   POST /api/chat — { brief, live, messages } → the answer, streamed
 *
 * The page knows the trip; this function knows the model. chat.js renders
 * the whole plan (plus the field guide and the two hotels, in the reader's
 * language) into `brief`, and the things that change while you use the site
 * — what's ticked, what's in the wallet, today's date — into `live`. Both
 * arrive with every question, because there's no database to keep them in;
 * `brief` sits behind a cache breakpoint so a back-and-forth only pays for
 * it once every five minutes.
 *
 * Gated on the same unlock cookie as the wallet: the itinerary is public,
 * but a chat about it spends real money, so it takes the family key.
 *
 * The answer streams back as Server-Sent Events. Failures before the stream
 * opens are ordinary JSON (the client re-voices them via I18N.server);
 * anything the model does after that arrives as an `error` event.
 */
import Anthropic from '@anthropic-ai/sdk';
import { isUnlocked, json, locked } from './_auth.js';

const MODEL = 'claude-sonnet-5';
const MAX_TOKENS = 1500;
const MAX_TURNS = 30;
const MAX_QUESTION = 4000;
const MAX_BRIEF = 300_000; // the whole trip in one language, with headroom
const MAX_LIVE = 20_000;

// Frozen, and first in the prompt: every byte before the cache breakpoint
// has to be identical between questions or the briefing caches for nothing.
// Anything that varies — the language, the date, the ticks — rides in `live`.
const RULES = `You are the trip assistant built into "España · the Çelik plan", the private seven-day planner Izem and Ahmet Çelik are using for Barcelona and València, 8-14 August 2026. You are talking to one of them, or to someone they handed the passphrase to.

Everything you know about this trip is in the briefing that follows: the day-by-day plan with times, prices and places, the "book before you fly" list, the two hotels, and the field guide — every place and every tip mined from 29 travel vlogs and 22 blog articles, including the ones that never made it into the plan.

Izem and Ahmet do not drink alcohol. Never suggest a bar, tasting, winery or drink for the alcohol in it, and never treat "the local thing to order" as a reason to. Where a famous local drink is alcoholic — agua de València, vermut, cava, sangría, clara — say so plainly and give the non-alcoholic order instead: mosto, Vichy Catalan, horchata, granizado, zumo de naranja natural. Places in the briefing that serve food are still fair game; the drink just is not.

How to answer:
- Answer the question that was asked. A sentence or two is usually the whole job; this is a panel beside the plan, not an essay.
- The briefing is the truth about this trip. If it doesn't cover something, say so instead of inventing it. General knowledge about Spain is welcome as context — just make clear it's yours and not part of the plan.
- Prices in the plan are per person in euros. The field guide's prices are whatever the vlogs and articles quoted and will have drifted; say so when the number is the point.
- The guide holds far more than the week does. When something good was left out, feel free to offer it, and say which day it would have to displace.
- You can't change the plan, book anything, or open the travel wallet. Point at the Replan button or the sidebar instead.
- Plain prose, short paragraphs, "- " bullets only when a list is genuinely a list. No headings, no tables, no code blocks, no markdown links. Write place names exactly as the briefing spells them — the page turns them into map links by itself.`;

const bad = () => json({ error: 'That question did not come through.' }, 400);

const isText = (v, max) => typeof v === 'string' && v.trim().length > 0 && v.length <= max;

// Rebuild the conversation rather than forwarding what arrived: only these
// two roles, only text, and it has to start and end with a question.
function cleanMessages(input) {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_TURNS) return null;
  const out = [];
  for (const turn of input) {
    if (!turn || typeof turn !== 'object') return null;
    if (turn.role !== 'user' && turn.role !== 'assistant') return null;
    if (!isText(turn.content, MAX_QUESTION)) return null;
    out.push({ role: turn.role, content: turn.content.trim() });
  }
  if (out[0].role !== 'user' || out[out.length - 1].role !== 'user') return null;
  return out;
}

function apology(error) {
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
    return 'The assistant key was rejected.';
  }
  if (error instanceof Anthropic.RateLimitError) return 'The assistant is busy — ask again in a moment.';
  return 'The assistant is unreachable right now.';
}

// Named method exports — see api/unlock.js for why there's no default.
async function handler(request) {
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405);
  if (!isUnlocked(request)) return locked();
  if (!process.env.ANTHROPIC_API_KEY) {
    return json({ error: 'ANTHROPIC_API_KEY is not set on this deployment.' }, 500);
  }

  let body = {};
  try { body = await request.json(); } catch { return bad(); }

  const messages = cleanMessages(body.messages);
  if (!messages) return bad();
  if (!isText(body.brief, MAX_BRIEF) || !isText(body.live, MAX_LIVE)) return bad();

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const encoder = new TextEncoder();
  let stream = null;

  const sse = new ReadableStream({
    async start(controller) {
      // The browser can leave at any point; enqueueing into a closed stream
      // throws, and that must not read as a model failure.
      let open = true;
      const send = (event, data) => {
        if (!open) return;
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
        } catch { open = false; }
      };

      try {
        stream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          // No tools and no arithmetic worth deliberating over: the answer is
          // a lookup in the briefing, so skip thinking and keep the first
          // token close. Effort still tunes how much of the guide it weighs.
          thinking: { type: 'disabled' },
          output_config: { effort: 'medium' },
          system: [
            { type: 'text', text: RULES },
            { type: 'text', text: body.brief, cache_control: { type: 'ephemeral' } },
            { type: 'text', text: body.live }
          ],
          messages
        });

        for await (const event of stream) {
          if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
            send('delta', { text: event.delta.text });
          }
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === 'refusal') {
          send('error', { error: 'The assistant would rather not answer that.' });
        } else {
          send('done', { truncated: final.stop_reason === 'max_tokens' });
        }
        console.log('chat', {
          in: final.usage.input_tokens,
          cached: final.usage.cache_read_input_tokens,
          written: final.usage.cache_creation_input_tokens,
          out: final.usage.output_tokens
        });
      } catch (error) {
        console.error('chat error', error);
        send('error', { error: apology(error) });
      } finally {
        open = false;
        try { controller.close(); } catch { /* already closed by a cancel */ }
      }
    },
    cancel() {
      // Tab closed or question retracted — stop paying for the rest of it.
      if (stream) stream.abort();
    }
  });

  return new Response(sse, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'private, no-store',
      'Connection': 'keep-alive',
      // Proxies that buffer would hold the whole answer back to the end.
      'X-Accel-Buffering': 'no'
    }
  });
}

export { handler as POST };
