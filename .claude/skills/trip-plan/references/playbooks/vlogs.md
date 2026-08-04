# Playbook: YouTube vlog mining

Techniques proven on real trips. Paste this into the vlogs agent's prompt.
Last updated: 2026-08-04 (Sicily trip, 16 vlogs / 13 full transcripts).

## Finding vlogs — query shapes

- Best shape: plain WebSearch with "youtube" as a keyword + year + one
  concrete detail: `Taormina travel vlog 2025 Isola Bella youtube`,
  `Mondello beach vlog youtube 2024 Palermo how to get bus 806`.
- Itineraries: `"<region>" vlog youtube "7 days" OR "one week" itinerary
  <year>` — quoted-phrase OR-chains work.
- `site:youtube.com` UNDERPERFORMS (engine substitutes GetYourGuide/TikTok
  results) — fallback only.
- Goldmine: a good channel's description links its whole regional series —
  always read descriptions for sibling videos (4 free vlogs from one).

## Fetching — what fails and what works

- WebFetch on `youtube.com/watch` FAILS (JS shell). Go straight to:
- `curl -sL -A "<Chrome UA>" -H "Accept-Language: en-US,en;q=0.9"
  "https://www.youtube.com/watch?v=<ID>&hl=en"` → ~1.4 MB HTML. Parse
  `var ytInitialPlayerResponse = {...}` (brace-match → JSON):
  `videoDetails.title/.author/.viewCount/.shortDescription`,
  `microformat.playerMicroformatRenderer.publishDate`. `shortDescription`
  often carries chapters, venue names, even Google Maps links.
- Transcripts: the page's timedtext `baseUrl` returns an empty body
  (PO-token gated) and transcript sites 403 — skip both. **Working path:**
  `pip install --user yt-dlp`, then
  `python3 -m yt_dlp --skip-download --write-auto-subs --sub-langs
  "en,en-orig" --extractor-args "youtube:player_client=android" -o
  "sub_%(id)s" <url>` — **`player_client=android` is the load-bearing
  trick** (web and ios clients both fail). Non-English videos: grab the
  auto-translate `en` track. Convert VTT→text with a dedupe (drop a line
  contained in the previous one), inject `[mm:00]` markers.
- ASR mangles proper nouns — flag uncertain venue names as [ASR] and
  cross-check against the description; never guess a spelling into the
  plan.

## Triage before spending a transcript download

From metadata alone: publishDate ≤3 years old; length 400–1600 s (under
~3 min = a short, over ~30 min = padding); views ≥ ~5k as a soft signal;
**a description with chapters / named venues / transport numbers predicts
a mineable transcript almost perfectly.** Affiliate-link-wall descriptions
predict scripted montages — still good for place lists, label them apart
from real person-on-camera vlogs (verdicts, prices, mistakes).

## Fastest reliable sequence

1. 4–6 parallel WebSearches (shapes above) → collect video IDs.
2. One curl+parse Bash loop over all IDs → metadata/descriptions → triage.
3. Mine sibling links from the best channels; fetch those too.
4. yt-dlp (android client) auto-subs for every keeper; read transcripts
   directly — a 15-min video ≈ 2,000 words; reading beats delegating.
5. Corroborate vlog prices/schedules with one plain WebSearch, note year
   next to every price (stale prices are the #1 vlog hazard).

## Aggregation contract

Per vlog: title, channel, URL, year, places, tips, prices (with year),
warnings. Aggregate places-per-area with attribution, tips by category,
consensus = 2+ independent vlogs (3+ for load-bearing plan decisions).
Translate off-season crowd reports to the trip's actual season; say when
a data point wasn't covered and needs a blog-side check.
