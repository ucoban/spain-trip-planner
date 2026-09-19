# Playbook: maviapi — travel data as JSON, before you reach for a browser

Last updated: 2026-09-18 (Güneydoğu/Türkiye run; Gothenburg 2026-09-03; Palermo 2026-08-19; Mallorca 2026-08-16).

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
| `tripadvisor/search?q=` | Place lookup. The result `url` carries both ids — `-g187463-d244037-` — and that is the only way to learn which geo a place belongs to. |
| `tripadvisor/attractions?geo=` `restaurants?geo=` `hotels?geo=` | Top thirty for a town: rating, review count, category, coordinates. `restaurants` also carries an `image`; **`attractions` carries none**. |
| `tripadvisor/reviews?id=&geo=&type=` | Actual review text. Where the "€22 to visit a church" complaints live. |
| `getyourguide/activities/<slug>` | Tour listings with price, rating, next availability and an image URL. |
| `airbnb/search?location=&checkin=&checkout=&adults=` | Works — **but see below.** |

**Tripadvisor's parameter is `geo`, not `geo_id`** — even though `/search`
*returns* the field called `geo_id`. Pass the wrong name and you get
`scrape_failed`, not "missing parameter", so it reads exactly like a dead
endpoint. This cost a whole round of "Tripadvisor is broken" that was not
true. When something returns `scrape_failed` on every attempt, omit the
parameters entirely first: the error message then names what it wants.

Genuinely dead on 2026-08-16: `tripadvisor/place` (every id and both types,
including ones `/reviews` answers fine with the same parameters),
`getyourguide/activity/<id>` and `getyourguide/explore` — all `scrape_failed`;
`google/images` — `Not enough credits`. The Tripadvisor lists cap at 30 and do
not page: `limit` and `offset` are accepted and ignored, so a real place
outside a town's top thirty simply cannot be priced or rated through them.

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

Not from here, and Tripadvisor is the specific disappointment: `/attractions`
returns no image field at all, only `/restaurants` carries one, and `/place` —
the detail endpoint that would have had a gallery — is dead. `google/images`
would resolve anything but hands back a hotlink with no rights attached: fine
inside an agent's research, wrong on a page we publish.

For pictures that go on the site, use Wikimedia Commons (`tools/photos.mjs` in
this repo), which is the only source that hands over a named author and a
licence with the file. maviapi's role there is the last resort:
`getyourguide/activities/<slug>` returns tour photography that is at least
licensed for display, for a place Wikimedia has never photographed.

What Tripadvisor *is* for is the crowd's verdict — rating, review count and
the reviews themselves (`tools/tripadvisor.mjs`). That is worth more next to a
plan than another photograph anyway, and it is worth most when it disagrees
with the plan: Palma's Banys Àrabs sit in the itinerary at 3.4 and Platja de
Palma at 3.7, which is exactly what somebody deciding what to cut needs to
know.

## Additions from the Palermo run (2026-08-19)

- **`booking/search` quotes EUR, not GBP.** The payload carries `currency: "€"`
  next to `price_amount`, and `price_amount` is the **whole-stay total for the
  date range**, taxes and charges included — not a nightly rate. Read the
  field; don't infer the currency from the household's.
- **Its Booking numbers were exact.** Every one of the 18 Palermo properties
  matched a live stealth-browser read of the same search URL to the euro,
  including the struck-through "original price". Treat `booking/search` as a
  quote-grade shortlist for *price*; what it does **not** carry is the **free
  cancellation** flag and the "members-only price" caveat, and at short notice
  those decide the pick. One cloak read of the search URL backfills both for
  the whole list at once — cheaper than opening property pages one by one.
- **`airbnb/search` resolved "Palermo Sicily Italy" correctly** (all 16 results
  at 38.1x/13.3x). The wrong-city trap is real but not universal: **naming the
  region and country in the `location` string is the cheap defence**, and
  checking returned `coordinate` values is the confirmation.
- **`getyourguide/catalog?q=` ignores the query** — it returned Normandy, Siem
  Reap and Guanacaste for `q=Palermo`. It is an index dump, not a search. Get
  the real city slug from a WebSearch of `site:getyourguide.com <city>`
  (Palermo = `palermo-l387`) and go straight to
  `getyourguide/activities/<slug>`, which returned 16 products with price,
  rating, review count, next availability and URL — enough to build a whole
  activities section.
- **`flightlist/search` carries `seats_available`** on the cheapest itinerary.
  Ryanair's own `farfnd` does not. At three days out that field was the single
  most decision-relevant number in the flight research ("2 seats left on the
  return") — always surface it.
- **`thetrainline/fares` returns a ~3-day window starting at `date`, and
  silently omits days with no advance fares.** An absent day means "no advance
  inventory found", **not** "no service" — say so that way in the draft and
  quote a walk-up estimate rather than leaving the leg unpriced.
- `tripadvisor/attractions?geo=` still works and is worth the call for its
  ratings alone: Mondello at **3.7 (3,496)** changed how a beach day got
  written. `tripadvisor/restaurants?geo=` returned empty on this run.
- **zsh gotcha in the curl loops:** `set -- $pair` does **not** word-split in
  zsh, so the classic `for p in "A B"; do set -- $p` idiom silently passes the
  whole string as `$1` and runs four identical broken requests. Use
  `p=A:B; o=${p%%:*}; d=${p##*:}` instead.

## Additions from the Gothenburg run (2026-09-03)

- **`tripadvisor/search?q=` was `scrape_failed` on every query**, but the geo
  id is in any Tripadvisor URL a WebSearch returns (`-g189894-`), and
  `attractions?geo=` / `restaurants?geo=` then worked (30 each, attractions
  carried `image` this time). `data` is nested — `data.attractions[]`,
  `data.restaurants[]` — not a bare list.
- **`thetrainline/fares` is useless outside the UK**: every Swedish route
  returned empty days. Price Swedish rail on sj.se in Chrome (see
  `ground-activities.md`).
- **`flightlist/search` can miss a direct flight** — AYT–GOT returned only
  connecting itineraries although Pegasus flies it nonstop. Its absence in the
  top results is not evidence the route doesn't exist.
- `getyourguide/activities/gothenburg-l479` — the real slug, found via
  `site:getyourguide.com gothenburg` — was `scrape_failed`; the cloak MCP
  server failed to connect the whole session. GetYourGuide prices this run came
  from affiliate mirrors only.


## Additions from the Güneydoğu (Türkiye) run (2026-09-18)

**The wrong-city trap is WORSE than this file said, and it is the headline lesson again.**
Four separate confident-but-wrong answers in one run:

- `tripadvisor/attractions?geo=297968` → **Side**. `geo=297963` → **Belek**.
- `booking/search?location=Viransehir` → **Kayseri**.
- A naive Mardin geo guess → **Kırşehir**.

All four returned plausible-looking *Turkish* data, which is far harder to catch than the
Mallorca→Barcelona case: the language, the naming and the price shapes all look right.
**Verify a returned name or coordinate against the region before any number from it is used.**

**Correct Tripadvisor geo ids, this region:** Şanlıurfa **652373** · Mardin **672951** ·
Midyat **780971** · Viranşehir **12219421**.
`tripadvisor/search?q=` was `scrape_failed` on **every** query again (third run in a row — treat it
as permanently dead). Get geo ids from the `-gNNNNNN-` in any Tripadvisor URL a search returns.

**`flightlist/search` is the right tool when the user says "don't look at tickets" but a day hinges
on a flight existing.** Two techniques worth keeping:
- **Query seven consecutive dates, never one.** A single date looks deterministic; the Batman
  departure actually wandered 20:00–22:05 across the week, and the plan's assumed "20:00" was 20:35.
- **Reverse origin/destination to get an arrivals board.** On this run, which morning arrival the
  party took changed the shape of a whole day by two hours. That was the single highest-leverage
  number in the flight work, and it came from querying the route backwards.

**For Turkey specifically, the state's own endpoints beat maviapi for everything maviapi is used
for here** — museum hours/prices/status, road distances, tolls, fuel. See the new
`turkiye-resmi-kaynaklar.md`. maviapi's role on a Turkish trip is flight schedules and Tripadvisor
ratings, nothing else.

## Confirmed again 2026-09-18: `tripadvisor/search?q=` is dead, not flaky

`GET /v1/sites/tripadvisor/search?q=<anything>` answers
`{"error":"scrape_failed","message":"The upstream source could not be fetched"}`
for every term tried. The consequence is concrete: `tools/tripadvisor.mjs`
resolves **0 of 27** stops for a new trip, and would for any trip run today.
Don't debug it — the tool is fine, the endpoint is gone. Note it and ship the
trip without ratings rather than inventing them.
