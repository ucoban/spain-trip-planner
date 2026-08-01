# España · the Çelik plan

An eight-day trip planner for Barcelona and València, 22–29 September. Pick a
day, filter it down to the boat trips or the fiestas, tick things off as they
happen, and keep boarding passes and booking PDFs pinned to the stop they
belong to.

Ticked moments, uploaded documents, the hero photo, and the chosen currency all
live in the browser's `localStorage`, so the plan survives a reload without any
backend.

## What's in here

| File | What it does |
| --- | --- |
| `index.html` | The page itself — nav, hero, route, embedded map, day view, sidebar |
| `app.js` | Itinerary data, tick/filter/day state, travel wallet, document preview |
| `trip-map.html` | Leaflet route map — every stop pinned, flown to per city |
| `image-slot.js` | `<image-slot>` custom element: drop or browse a photo, downscaled to WebP |
| `styles.css` | Design-system tokens and component classes |

No build step and no dependencies to install. Leaflet and the two Google fonts
load from their CDNs; everything else is in the repo.

## Running it locally

Any static server will do — the pages fetch each other over HTTP, so opening
`index.html` straight off the filesystem won't load the map iframe.

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

It's a plain static site, so Vercel serves it as-is: import the repo, leave the
framework preset on **Other**, and leave the build command and output directory
empty.

## Editing the trip

The itinerary is one array at the top of `app.js`. Each day has a label, a city,
a subtitle, and a list of activities:

```js
{ id: 'd2a1', t: '09:00', cat: 'sights', title: 'Sagrada Família',
  desc: '…', tip: 'Izem: add the Passion tower…', eur: 26 }
```

`cat` picks the colour and the filter chip it answers to (`travel`, `sights`,
`museum`, `boat`, `swim`, `food`, `event`). `eur` is the per-person cost in
euros; the £/€ control in the header converts it. Keep `id` stable — it's the
key ticked state and attached documents are stored under.

Map pins are a separate list in `trip-map.html` (`SPOTS`), since not every
activity needs a pin and a few pins cover more than one day.
