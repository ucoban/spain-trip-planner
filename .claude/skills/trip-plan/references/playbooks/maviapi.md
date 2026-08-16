# Playbook: maviapi — travel data as JSON, before you reach for a browser

Last updated: 2026-08-16 (Mallorca trip, first use).

maviapi turns bot-walled travel sites into plain REST. Where it answers, it
replaces twenty minutes of Chrome driving with one `curl`. Where it doesn't,
fall back to the browser techniques in the other playbooks — **but read the
"Wrong answers" section first, because the failure mode here is not an error.**

## Calling it

    GET https://api.maviapi.com/v1/sites/<slug>/<endpoint>?<params>
    Authorization: Bearer $MAVIAPI_KEY

The key lives in `~/.maviapi-key`, outside the repo — never commit it, never
paste it into a file the site serves:

    MAVIAPI_KEY=$(cat ~/.maviapi-key)

Discovery, when you need an endpoint this file doesn't list:

    GET /v1/apis                      # every API, with slug and endpoint count
    GET /v1/apis/<slug>/endpoints     # paths, methods, one-line descriptions

Notes that cost time to learn:

- The catalogue lives at `/v1/apis/...` but calls go to `/v1/sites/...`.
  Everything else 404s with a bare `404 Not Found`, not JSON.
- Responses are `{data, cached, source, pagination}`. `source` names the actual
  upstream technique (`tripadvisor:typeahead-graphql`, `thetrainline:graphql`)
  — useful when deciding how much to trust a field.
- Errors come back as JSON with a `message`: `scrape_failed` means the upstream
  fetch died (often transient, sometimes permanent for that endpoint);
  `Not enough credits` means the endpoint is metered and the account is out.
- CORS only allows `https://maviapi.com`, so nothing here can be called from
  the site's own front-end. Everything must be fetched at build/research time
  and baked in.

## What worked, 2026-08-16

| Call | Verdict |
|---|---|
| `booking/search?location=&checkin=&checkout=&adults=` | **Best in the set.** name, url, `price_amount`, stars, `review_score`, `review_count`, distance, image. Straight into a stays shortlist. |
| `thetrainline/locations?q=` | Resolves free text to a station code. `South Wigston` → `SWS1949gb`. |
| `thetrainline/fares?from=&to=&date=` | Cheapest single per day plus departure times, over a small date window. This is how you price the South Wigston → airport leg without opening National Rail. |
| `flightlist/search?from=&to=&date_from=&date_to=` | Real fares with flight numbers and times across a date range. **Returns USD** — convert before comparing with a GBP quote. |
| `tripadvisor/search?q=` | Geo/place lookup with `geo_id` and coordinates. |
| `getyourguide/activities/<slug>` | Tour listings with price, rating, next availability and an image URL. |
| `airbnb/search?location=&checkin=&checkout=&adults=` | Works — **but see below.** |

Broken or unusable on that date: `tripadvisor/attractions`, `tripadvisor/place`
and `getyourguide/activity/<id>` all returned `scrape_failed` on every retry;
`google/images` returned `Not enough credits`. Re-test before assuming; update
this table when one flips.

## Wrong answers, confidently given

This is the thing to internalise. When a location doesn't resolve, these
endpoints do **not** return an error — they return somebody else's city.

- `airbnb/search?location=S'Arenal Mallorca` returned Barcelona listings
  (Les Corts, Sants-Montjuïc, Eixample). So did `location=Palma de Mallorca`.
  `location=Lisbon Portugal` returned Lisbon correctly. The resolver silently
  falls back rather than failing.
- `getyourguide/activities/palma-de-mallorca-l1077` — a slug I guessed —
  returned **Cape Town quad-bike tours**. A wrong `-lNNN` number is a valid
  page somewhere else. Find the real slug with `getyourguide/catalog` rather
  than inventing one.

So: **every result must be checked against the place you asked for** before a
single price from it reaches the draft. Coordinates, the `location` field, the
city in the title — whichever the payload gives you. A price for the wrong
island is worse than no price, because it looks like research.

## Where it fits in the tool order

1. **maviapi** — one call, structured, no session to babysit. Start here for
   hotel shortlists, rail fares, flight fare ranges and place lookup.
2. **The operator's own JSON API** (see `ground-activities.md`) — still the
   only source for timetables, live availability and booking rules.
3. **WebFetch** — for ordinary pages that aren't walled.
4. **chrome-devtools MCP** — for the walled ones, and for anything where the
   exact live price on exact dates is the deliverable. maviapi's Booking
   numbers are a shortlist, not a quote: confirm the pick in a real session
   before it goes in the plan as a bookable price.

## Photographs

`google/images` would resolve anything, but it hands back a hotlink with no
rights attached — fine inside an agent's research, wrong on a page we publish.
For pictures that go on the site, use Wikimedia Commons instead
(`tools/photos.mjs` in this repo), which carries an author and a licence.
maviapi's role there is the last resort: `getyourguide/activities/<slug>`
returns tour photography that is at least licensed for display, for a place
Wikimedia has never photographed.
