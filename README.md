# España · the Çelik plan

A seven-day trip planner for Barcelona and València, 8-14 August. Pick a
day, filter it down to the boat trips or the fiestas, tick things off as they
happen, and keep boarding passes and booking PDFs pinned to the stop they
belong to. The itinerary and its embedded tips are distilled from 29
travel vlogs and 22 blog articles (routes, prices, and warnings mined from
their transcripts, comment sections, and pages). And none of it is fixed:
**Replan** in the day header turns the whole plan editable in place.

The plan picks a path; the **field guide** (`guide.html`) keeps the whole
haul: every place the sources suggested (160, grouped by city, each linked
to Google Maps and to the vlog moment or article that recommended it, and
badged when it appears in the itinerary) plus all 133 merged tips by
category, with the full source lists at the bottom.

**Where we sleep** (`stays.html`) is the accommodation file: a live
Booking.com search (2 Aug 2026, 2 adults, score 8+, £60-150 a night) boiled
down to seven candidates per city, each plotted on the £100-150 budget band.
The two picks — HCC Taber in Barcelona, easyHotel Ciutat Vella in València —
are check-in stops in the itinerary, lines in "Book before you fly", and
bed-icon pins on the route map.

Ticked moments, the hero photo, and the chosen currency live in the browser's
`localStorage` — they're cheap to redo and nobody needs them on a second
device. **Documents and replanned itineraries don't:** they live in a private
[Vercel Blob][blob] store behind `/api`, so a boarding pass uploaded (or a stop
added) on the laptop opens on Izem's phone too, and the wallet isn't capped by
the ~5 MB `localStorage` quota (or wiped by Safari's seven-day storage
eviction).

[blob]: https://vercel.com/docs/vercel-blob

## What's in here

| File | What it does |
| --- | --- |
| `index.html` | The page itself — nav, hero, route, embedded map, day view, sidebar |
| `i18n.js` | Every user-facing string, per language (English and Turkish) |
| `app.js` | Itinerary skeleton, tick/filter/day state, travel wallet, document preview |
| `guide.html` | The field guide page: every mined place, every tip, every source |
| `guide.js` | Renders the field guide from `guide-data.js` and `i18n.js` |
| `guide-data.js` | Generated guide skeleton: ids, groups, mention counts, links |
| `stays.html` | Where we sleep: the Booking.com shortlist per city, the two picks, the budget band |
| `stays-data.js` | The shortlist itself — prices, scores, distances, the two picks |
| `chat.js` | The assistant: builds the briefing, streams the answer, draws the panel |
| `places.js` | Place-name → Google Maps dictionary; turns place references in prose into links |
| `trip-map.html` | Leaflet route map — every stop pinned, flown to per city |
| `image-slot.js` | `<image-slot>` custom element: drop or browse a photo, downscaled to WebP |
| `styles.css` | Design-system tokens and component classes |
| `api/itinerary.js` | Read the replanned itinerary (public), save it (passphrase-gated) |
| `api/chat.js` | Put a question to Claude with the trip attached; stream the answer back |
| `api/docs.js` | List, upload, re-pin and delete wallet documents |
| `api/file.js` | Stream one private document to the browser |
| `api/unlock.js` | Exchange the shared passphrase for an unlock cookie |
| `api/_auth.js` | Passphrase check and cookie signing |
| `api/_wallet.js` | Blob pathname scheme and its validation |

The page itself still has no build step and no client-side dependencies —
Leaflet and the two Google fonts load from their CDNs, everything else is in
the repo. Only the `api/` functions have an npm dependency, which Vercel
installs at deploy time.

## Languages

The site speaks English and Turkish. The EN/TR toggle in the nav picks one
(persisted as `celik-spain-lang` in `localStorage`); a first visit falls back
to the browser language. Every word lives in `i18n.js` — static page text is
swapped in via `data-i18n` attributes, everything rendered by `app.js`,
`chat.js`, `trip-map.html` and `image-slot.js` reads from `window.I18N`, and
the known English error messages the `/api` functions return are re-voiced
client-side. The assistant is told which language the reader is in and
answers in it, off a briefing written in that language too. Adding a language
is one more entry in `STRINGS` plus a nav button.

## How the travel wallet works

There's no database. A document's Blob pathname *is* its metadata:

```
wallet/<activity id>/<doc id>/<base64url of the filename>
```

so rebuilding the whole wallet is one `list()` call, and re-pinning a document
to another stop is one `rename()`. `api/_wallet.js` is the only thing that
builds or parses these, and it rejects anything that doesn't match the shape
exactly — a crafted pathname can't traverse out of the `wallet/` prefix.

Because the site is public but the documents aren't, every `/api` route is
gated on a shared passphrase. `POST /api/unlock` swaps it for an HttpOnly
cookie holding a signed expiry (never the passphrase), which is what lets the
preview `<img>`, the PDF `<iframe>` and the download link fetch `/api/file`
directly. Uploads that aren't an image or a PDF are always served as
`Content-Disposition: attachment`, so an `.html` or `.svg` upload can't run
script in this origin.

Documents are capped at **4 MB** each — Vercel rejects a Function request body
over 4.5 MB.

## How the assistant knows the trip

There's no retrieval step and no vector store either. The whole trip is about
60 KB of text, which is small enough to simply hand over, so every question
carries the entire briefing: `chat.js` renders it out of what the page has
already loaded — the live itinerary (`window.TripPlan`, so a replanned stop is
in the answer and so is a ticked one), the field guide's 160 places and 133
tips, both hotels, in whichever language the reader is using.

That briefing splits in two, because they change at different speeds. `brief`
is the trip itself and only moves when someone replans, so `api/chat.js` sits
a [prompt-cache][cache] breakpoint after it and a back-and-forth pays for it
once every five minutes rather than once a question. `live` — the date, the
language, what's ticked, what's in the wallet — goes after the breakpoint,
where it costs nothing to change.

[cache]: https://platform.claude.com/docs/en/build-with-claude/prompt-caching

The model is **Claude Sonnet 5** with thinking off: the answer is a lookup in
a briefing it has just been given, not a chain of reasoning, and the first
word arriving quickly matters more. It streams back as server-sent events; a
proxy that refuses to stream costs only the typewriter effect, since a
buffered response parses the same way.

The panel is gated twice. It won't compose while the wallet is locked, and
`POST /api/chat` checks the unlock cookie regardless — the itinerary is
public, but questions about it spend real money. Answers are built as text
nodes, never markup, and place names in them pick up the same Google Maps
links the rest of the site uses.

`api/chat.js` needs an `ANTHROPIC_API_KEY` environment variable ([Console →
API keys][keys]). Without one the panel says so instead of failing quietly.
A conversation costs roughly a cent or two: about 17k input tokens the first
time, a tenth of that per question while the cache holds.

[keys]: https://platform.claude.com/settings/keys

## Setting it up on Vercel

1. Import the repo. Leave the framework preset on **Other** and the build
   command and output directory empty; Vercel picks up `api/` on its own.
2. **Storage → Create Database → Blob**, access **Private**. Connect it to the
   project so `BLOB_READ_WRITE_TOKEN` and `BLOB_STORE_ID` are added for you.
3. Add a `WALLET_PASSPHRASE` environment variable (Production, Preview, and
   Development) — this is the phrase everyone types once per device. Without
   it the wallet stays locked and says so.
4. Add an `ANTHROPIC_API_KEY` for the assistant, from [Console → API
   keys](https://platform.claude.com/settings/keys). Without it everything
   else still works and the chat panel explains what's missing.

All of this fits in the Hobby free tier; the wallet is a few MB of PDFs against
an allowance measured in gigabytes. The assistant is the one part that bills
separately, per question, on the API key.

## Running it locally

The itinerary, map and photo slots work off any static server:

```sh
python3 -m http.server 8000
```

The wallet needs the Functions and the Blob store, which means the Vercel CLI:

```sh
npm install
npx vercel link      # once
npx vercel env pull  # fetches WALLET_PASSPHRASE and the Blob credentials
npx vercel dev       # then open http://localhost:3000
```

## Replanning on the site

**Replan** (next to the day title) is the everyday way to change the trip:
add a stop, remove one, rewrite a title, description or tip, change its
time, category, price or day, nudge it earlier or later with the arrows,
edit a day's heading, and add or strike booking lines. Editing asks for the
same shared passphrase as the wallet — a change lands on everyone's plan,
so it takes the family key.

There's still no database. The first edit materialises the built-in
itinerary (every language at once) into one JSON document,
`itinerary/plan.json` in the same private Blob store, and from then on the
site renders from that document instead of the baked-in data. Reading it is
public — the itinerary already ships in the page source — but `PUT
/api/itinerary` checks the unlock cookie and re-validates the whole plan
shape server-side before storing it (`api/itinerary.js`).

Every text field exists once per language. The edit dialogs show EN and TR
side by side, and a field left blank borrows from the other language, so
the two versions never drift apart silently. Two housekeeping notes: map
pins (`SPOTS` in `trip-map.html`) and the field guide's "in the itinerary"
badges are still generated from the baked-in plan, so a brand-new stop
won't appear on the map; and documents pinned to a since-removed stop stay
in the wallet, listed as general.

## Editing the trip in the source

The built-in itinerary — what the site shows until someone replans, and the
seed for the first edit — lives in the repo. Its skeleton is one array at
the top of `app.js` — ids, times, categories and prices only:

```js
{ id: 'd2b1', t: '09:00', cat: 'sights', eur: 26 }
```

Its words (title, description, tip, plus the day's title and subtitle) live in
`i18n.js` under the same id, once per language:

```js
d2b1: { title: 'Sagrada Família', desc: '…', tip: 'Izem: add the Passion tower…' }
```

`cat` picks the colour and the filter chip it answers to (`travel`, `sights`,
`museum`, `boat`, `swim`, `food`, `event`). `eur` is the per-person cost in
euros; the £/€ control in the header converts it. Keep `id` stable — it's the
key ticked state is stored under, and it's baked into the pathname of every
document pinned to that stop.

Map pins are a separate list in `trip-map.html` (`SPOTS`), since not every
activity needs a pin and a few pins cover more than one day.

Every stop also carries a **Google Maps link** (the pin pill next to its
tags; the route map's popups have one too). The link's search query comes
from `MAPS` in `app.js` — place name plus city, keyed by stop id, shared by
every language. A stop the table doesn't know — added or retitled while
replanning — falls back to searching its own title, steered towards that
day's city.

Place references in **prose** open Google Maps too: descriptions, tips, day
subtitles, booking lines, the hero blurbs, the trip strip's city cards, and
the field guide's notes and tips. `places.js` builds one dictionary for the
whole site from the field guide's curated places (`guide-data.js`) plus
aliases for the spellings the text actually uses — Turkish included, since
place names are proper nouns in both languages. Matching is case-sensitive
and word-bounded, so a rename in the prose simply stops linking rather than
linking wrongly.
