# España · the Çelik plan

A seven-day trip planner for Barcelona and València, 8-14 August. Pick a
day, filter it down to the boat trips or the fiestas, tick things off as they
happen, and keep boarding passes and booking PDFs pinned to the stop they
belong to. The itinerary and its embedded tips are distilled from 21
Barcelona and València travel vlogs (routes, prices, and warnings mined from
their transcripts and comments).

Ticked moments, the hero photo, and the chosen currency live in the browser's
`localStorage` — they're cheap to redo and nobody needs them on a second
device. **Documents don't:** they live in a private [Vercel Blob][blob] store
behind `/api`, so a boarding pass uploaded on the laptop opens on Izem's phone
too, and the wallet isn't capped by the ~5 MB `localStorage` quota (or wiped by
Safari's seven-day storage eviction).

[blob]: https://vercel.com/docs/vercel-blob

## What's in here

| File | What it does |
| --- | --- |
| `index.html` | The page itself — nav, hero, route, embedded map, day view, sidebar |
| `app.js` | Itinerary data, tick/filter/day state, travel wallet, document preview |
| `trip-map.html` | Leaflet route map — every stop pinned, flown to per city |
| `image-slot.js` | `<image-slot>` custom element: drop or browse a photo, downscaled to WebP |
| `styles.css` | Design-system tokens and component classes |
| `api/docs.js` | List, upload, re-pin and delete wallet documents |
| `api/file.js` | Stream one private document to the browser |
| `api/unlock.js` | Exchange the shared passphrase for an unlock cookie |
| `api/_auth.js` | Passphrase check and cookie signing |
| `api/_wallet.js` | Blob pathname scheme and its validation |

The page itself still has no build step and no client-side dependencies —
Leaflet and the two Google fonts load from their CDNs, everything else is in
the repo. Only the `api/` functions have an npm dependency, which Vercel
installs at deploy time.

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

## Setting it up on Vercel

1. Import the repo. Leave the framework preset on **Other** and the build
   command and output directory empty; Vercel picks up `api/` on its own.
2. **Storage → Create Database → Blob**, access **Private**. Connect it to the
   project so `BLOB_READ_WRITE_TOKEN` and `BLOB_STORE_ID` are added for you.
3. Add a `WALLET_PASSPHRASE` environment variable (Production, Preview, and
   Development) — this is the phrase everyone types once per device. Without
   it the wallet stays locked and says so.

All of this fits in the Hobby free tier; the wallet is a few MB of PDFs against
an allowance measured in gigabytes.

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

## Editing the trip

The itinerary is one array at the top of `app.js`. Each day has a label, a city,
a subtitle, and a list of activities:

```js
{ id: 'd2b1', t: '09:00', cat: 'sights', title: 'Sagrada Família',
  desc: '…', tip: 'Izem: add the Passion tower…', eur: 26 }
```

`cat` picks the colour and the filter chip it answers to (`travel`, `sights`,
`museum`, `boat`, `swim`, `food`, `event`). `eur` is the per-person cost in
euros; the £/€ control in the header converts it. Keep `id` stable — it's the
key ticked state is stored under, and it's baked into the pathname of every
document pinned to that stop.

Map pins are a separate list in `trip-map.html` (`SPOTS`), since not every
activity needs a pin and a few pins cover more than one day.
