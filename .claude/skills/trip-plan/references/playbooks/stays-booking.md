# Playbook: stays research — Booking.com **and** Airbnb

Techniques proven on real trips. Paste this into the stays agent's prompt.
Last updated: 2026-08-15 (Mallorca trip; Sicily 2026-08-04 before that).

**Always research both platforms.** Hotels win more often than not, but the
comparison is the deliverable — and in a resort town where the hotel search
comes back thin, Airbnb is what saves the base. Compare on **true all-in
totals**, never nightly headline rates.

## Tool order that works

1. **WebFetch on Booking.com or Airbnb: bot-walled.** Don't burn rounds on it
   beyond one try.
2. **maviapi cloak scraper (`mcp__plugin_maviapi_cloak__cloak_scrape`):
   returned `unauthorized` upstream as of 2026-08-04.** Try once — if
   unauthorized again, move on immediately and note it (update this line if
   it ever works again).
3. **What actually works: a real Chrome session via the chrome-devtools MCP
   tools.** Load in one ToolSearch call:
   `select:mcp__plugin_chrome-devtools-mcp_chrome-devtools__new_page,mcp__plugin_chrome-devtools-mcp_chrome-devtools__navigate_page,mcp__plugin_chrome-devtools-mcp_chrome-devtools__evaluate_script,mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_pages`

### `evaluate_script`, never `take_snapshot` (the decisive technique)

`take_snapshot` on a results grid returns 1,000+ lines and blows the token
budget instantly. Instead, after `navigate_page` loads the results, run
`evaluate_script` with a small JS function that queries the result cards and
returns a compact JSON array (name / price / score / reviews / distance /
free-cancel / href), sorted by price client-side.

- Booking.com card selectors: `[data-testid="property-card"]`, and within it
  `[data-testid="title"]`, `[data-testid="price-and-discounted-price"]`,
  `[data-testid="review-score"]`, `[data-testid="distance"]`, plus
  `.innerText.includes('Free cancellation')`.
- Airbnb card selectors: `[itemprop="itemListElement"]` /
  `[data-testid="card-container"]`.

**Gotcha: a stale chrome-devtools browser process** from an earlier session
blocks `new_page`/`list_pages` with "browser already running for
chrome-profile". Check `list_pages` first — a live browser is reusable and
already warm. Only if it genuinely blocks: `ps aux | grep chrome-profile` →
`kill -9` the orphan → retry `new_page`.

**Gotcha: the browser is shared and page indices are global.** A concurrent
agent can navigate your tab out from under you — on the Mallorca run a stays
scrape came back with a train timetable and a cathedral ticket page.
`isolatedContext` isolates cookies, not tab selection. Mitigations:
1. **Guard every script** — first line
   `if (!/booking|airbnb/.test(location.host)) return { WRONG_PAGE: location.href };`
   so a silently-wrong result becomes an obvious one.
2. Prefer `navigate_page` over `select_page` — re-navigating guarantees
   content, re-selecting only guarantees an index.
3. Keep navigate→evaluate **adjacent**; don't interleave other work.

## Booking.com URL patterns

```
https://www.booking.com/searchresults.en-gb.html?ss=<PLACE>&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&group_adults=2&no_rooms=1&group_children=0&selected_currency=GBP&nflt=review_score%3D80
```

- `nflt=review_score%3D80` → score 8.0+; combine filters with `%3B`.
- Price band filter shape: `price%3DGBP-<min>-<max>-1`. **Run the first search
  WITHOUT the price filter** in a high-season resort — the household's
  £60–150 band frequently doesn't exist and the filter hides the whole market
  (peak-August Palma: nothing under £166/night at score 8.0+).
- Property URLs: `https://www.booking.com/hotel/<cc>/<slug>.en-gb.html` — the
  `.en-gb.html` suffix keeps pages in English. Spain = `es`, Italy = `it`.

### The `ss=` resolver gotcha (bites every trip — check it every time)

An ambiguous `ss=` string **silently mis-resolves** to a broad regional grid
while still rendering ~25 cards. **Detection: read the page `<h1>` after
navigating — if it doesn't say "Hotels in `<place>`", the query failed**, and
Booking will literally print "No properties found" above a full grid.

- `Port de Pollença`, `Puerto Pollensa`, `Puerto de Alcudia`, bare `Catania`
  → all mis-resolve.
- Fix that works: **drop the "Port de"/"Puerto" prefix and search the parent
  municipality Booking actually indexes** — `ss=Pollensa, Majorca, Spain`
  correctly resolves to "Hotels in Port de Pollensa". Or use the full
  `ss=Port d'Alcudia, Majorca, Spain` (apostrophe URL-encoded `%27`).
- The homepage autocomplete can reveal `dest_id` values, but for resort
  districts it often only offers individual properties — the
  parent-municipality trick is faster than fighting the UI.

## Reading the Booking.com result cards

- Headline price = total for the stay, cheapest room; "+ £X taxes and
  charges" is Booking's excluded-charges figure — record both.
- The free-cancellation flag describes the **cheapest** rate; most properties
  also sell a flexible rate ~10–15% higher.
- **Record the matched-property count per search — it's the sell-out-risk
  signal, and it is often the single most decision-changing number in the
  report.** Mallorca: Port de Sóller matched **9** properties (£196–500/night,
  one viable option) against Port d'Alcúdia's **33** at £160–200 — that one
  figure moved the whole second base. Taormina 135 = tight; Catania 1,131 =
  slack.
- **Card padding**: for a small micro-destination Booking pads the grid with
  properties several km inland. Filter by the distance field — **metres =
  genuinely in town, km = padding** — and trust the "X properties found"
  count over the number of cards rendered.

## Airbnb specifics

**Airbnb is easier to scrape than Booking.com** — `new_page` →
`evaluate_script` on `airbnb.co.uk` works first try, no bot wall, no CAPTCHA.

```
https://www.airbnb.co.uk/s/<Place>--<Country>/homes?checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&adults=2&currency=GBP&display_currency=GBP&search_by_map=true&ne_lat=&ne_lng=&sw_lat=&sw_lng=&zoom=13
```

- **Never add `room_types[]=Entire home/apt`.** Airbnb sells hotel rooms and
  aparthotels too, and in a city that has regulated private rentals out of
  existence they are the only good value left on the platform — the filter
  hides exactly the listings worth finding. On the Mallorca run that filter
  made the whole platform look like a write-off in Palma; the user then found
  a 7-night hotel on Airbnb at £1,235 all-in *including* unlimited brunch,
  undercutting the two-base hotel pairing (£1,326) that had been recommended
  instead. A hotel booked through Airbnb reads `Registration details:
  Exempt – hotel`, so the licensing risk doesn't apply to it either.
- **Cross-check any hotel found on Airbnb against Booking.com for the same
  dates, and vice versa** — the same property is routinely priced differently
  on the two platforms, and Airbnb sometimes adds credit or a price-match.

- **Map bounds are essential.** A plain place search returns island- or
  region-wide results (a "Palma" search returned 262 listings, the first one
  50 km away). Only a `search_by_map=true` + lat/lng box gives a real
  neighbourhood count.
- Card extraction: `document.querySelectorAll('[itemprop="itemListElement"]')`
  → read `card.innerText`, split on `\n`, **dedupe (every label is emitted
  twice for screen readers)**, then regex: total `/£([\d,]+)\s*total/`,
  rating+reviews `/([\d.]+)\s*\((\d[\d,]*)\)/`, unrated `/New\b/`,
  cancellation `/Free cancellation/i`.
- **The single most important gotcha: filter out alternate-date fallback
  cards.** When inventory is thin Airbnb silently pads the grid with listings
  available on *other* dates, identical except for a leading date-range line.
  Unfiltered, a 9-listing market looks like 13–15. Detect with
  `/^\d{1,2}([–-]|\s+to\s+)\d{1,2}\s+\w+$/` on the first line, and cross-check
  your exact-date count against the `<h1>` ("N homes within map area"). If the
  `<h1>` is much higher, that's pagination — Airbnb pages at 18.
- **Always report the all-in total**, not the nightly rate. With
  `currency=GBP&display_currency=GBP` the cards render `£X total`, which
  Airbnb defines as cleaning + service fee included, before taxes. Verify per
  run by grepping a card for the literal string `total`; if you only see bare
  nightly rates, say so rather than reporting the low number.
- **The cleaning/service split is unobtainable without a login** — "Show price
  breakdown" never renders in an automated session and `/book/stays/{id}`
  returns "Something went wrong". Don't burn calls on it; report the all-in
  total and state the limitation. (The `£` figures scrapeable on a listing
  page mostly come from the "Other places to stay" carousel at the foot — easy
  to misread as fees. Sanity-check against the search-card total.)
- **A fixed cleaning fee still punishes short legs**, visible in the per-night
  maths even when the split is hidden: on the Mallorca run the 3-night legs
  came out at £222–223/night against £200/night for the 4-night one.
- Listing-page (PDP) scraping is the highest-value step: navigate to
  `/rooms/{id}?check_in=&check_out=&adults=2&currency=GBP`, wait 4–5 s, then
  slice `document.body.innerText` around these stable anchors — `Registration
  details` (next 6 lines = regional + national licence numbers),
  `Cancellation policy` (next 2 lines), and **`Where you'll be` (next 3 lines
  = the host's own walking distances, better than any map estimate)**.
- **Cancellation is usually the killer, not price.** Inside the cancellation
  window every listing collapses to *"Free cancellation for 24 hours. After
  that, non-refundable."* Paying more for a non-refundable room against a
  free-cancellation hotel is the wrong side of the trade — pull the
  cancellation line on every candidate, it routinely flips a close comparison.
- Non-price factors that decide it in practice: reception and daily cleaning,
  breakfast, and **luggage storage on changeover day** (a hotel holds bags
  after checkout; an Airbnb usually can't).

### Run the count comparison BEFORE the price comparison

In any regulated European city the listing count diagnoses the market faster
than any price table. Mallorca: **9 entire-place listings in central Palma
against 31 in Port d'Alcúdia** — that one contrast identified a city-wide
tourist-rental ban before the legal research came back, and corroborated it
independently. Where the count has collapsed, there is no Airbnb angle to
find and the surviving listings are commercial establishments at a premium.

### Short-let licensing — check it before recommending any rental

This is destination-specific law and it bites hardest exactly where trips go.
Establish, with sources: whether the city restricts or bans tourist rentals in
apartment buildings; the licence number listings must display (**Balearics
ETV**, Portugal AL, Italy CIN, Barcelona/Amsterdam registration); and the
guest's practical exposure. Fines fall on the **host, never the guest** — the
real risk is a short-notice delisting-driven cancellation into a sold-out
peak-season market. **If most listings in a base look unlicensed, that leads
the section, not a footnote.** Run this as a parallel subagent while the
scraping happens — it costs nothing and the legal findings often lead.

**Licence codes are frequently in the listing title** — grep search-grid
titles for `ETV|ETVPL|TI/|AG|VT-` and you get the signal without opening a
single listing page.

Spain / Balearics as of 2026-08 (the shape generalises; re-verify the facts):
`ETV/xxxxx` = detached holiday let, `ETVPL/xxxxx` = let in an apartment
building, `ETV60/` = owner-present, `TI/` = *turismo de interior*
establishment (a commercial category that sits outside apartment-building
bans). **Palma bans holiday rentals in multi-family dwellings** (Balearic Law
6/2017, reinstated by the Tribunal Supremo Jan 2023, extended municipality-wide
Feb 2026) — which is exactly why Palma's surviving listings are all `TI/`
establishments and villas, while Sóller, in the same island, still has
licensed `ETVPL` apartments. The **national** Registro Único (RD 1312/2024)
that drove the 2025 mass delistings **was annulled by the Tribunal Supremo on
19 May 2026** — the regional licence is the gate that actually bites, not the
national registry. Verify a specific listing in the Consell de Mallorca's
"Verificador alquiler turístico" app.

## Tourist tax

Usually paid at the property, often cash, and **excluded from every quoted
total** — note it separately, don't fold it in. Rates band by accommodation
category and season, and **holiday rentals usually sit in a different band
from hotels** — give both, and say whether the platform collects it or the
host does. Balearic ecotasa, high season (1 May–31 Oct) 2026: 5★/4★-sup €4,
4★/3★-sup €3, 1–3★ and holiday homes €2 per person per night over 16, +10%
VAT, 50% off from the 9th night.

## Price BOTH platforms for the same hotel — the gap is real and asymmetric

Same week, same properties, Mallorca 2026-08: Booking undercut Airbnb by
£164–£227 on four hotels, by £28 on a fifth, tied on a sixth — and **lost by
£30 on the seventh**. A 12–14% Airbnb premium is the norm, not a rule. Always
price both.

**But the difference that decides it is usually rate *structure*, not price.**
Booking exposes a full rate ladder per room (non-refundable / free
cancellation / breakfast / half board / bed type) where Airbnb shows one
number. On the deciding property the free-cancellation rate and the
double-bed option existed **only on Booking** — Airbnb hard-coded "2 single
beds" and offered no flexible rate at all. Open the Booking hotel page even
when Airbnb looks equal; you are checking for rates Airbnb never renders.

**Booking search-card prices exclude taxes; the hotel page itemises them.**
The surcharge is not proportional (£13, £26 and £39 across three properties in
one search), so you cannot estimate it — open the hotel page for anything you
intend to quote.

**Finding a Booking slug from a hotel name:** search `ss=<Hotel Name> <City>`;
the `<h1>` reads `"<Name>: 1 property found"` and card 1 is the match. Slugs
are unguessable and several are the *pre-rebrand* name (tent Arenal = `tal`,
Copaiba = `hsm-venus-playa`, Inmood Aucanada = `hotel-president-alcudia`).

### Extra selectors worth knowing

- Booking `[data-testid="recommended-units"]` — the most valuable and easiest
  to overlook: bed configuration, breakfast, cancellation policy and scarcity
  in one string, straight off the search card.
- Booking room table `#hprt-table` / `table.hprt-table` → `innerText` gives the
  whole rate ladder as readable tab-separated text. Highest-yield selector on
  the site.
- Booking coordinates:
  `document.querySelector('[data-atlas-latlng]').getAttribute('data-atlas-latlng')`
  — the only reliable way to check a property is really in the district it
  claims. Caught two properties ranking in a district search while sitting 4 km
  and 20 km outside it.
- Booking prose distances: index `innerText` on the literal labels
  `What's nearby`, `Beaches in the neighbourhood`, `Most popular facilities`.
  The property's own distances beat any map estimate.
- Airbnb card totals: regex `/£([\d,]+)\s*total/i` — take **`total`**, never
  the first `£` on the card, which is often pre-discount or per-night.

### Reviews: Airbnb for substance, Booking for the rate ladder

- Booking's in-page reviews modal renders **empty** under automation and
  `/reviews/es/hotel/<slug>...` **302-redirects** to the hotel page. Scrape the
  **static** review snippets under the hotel page's `Guest reviews` anchor
  instead — you also get the official property description, which is where the
  hard facts live (exact metres to the beach, renovation year, brunch hours).
- Airbnb's review modal is far richer: click `Show all N reviews`, wait ~4 s,
  read `[role="dialog"].innerText`, then filter lines by keyword regex
  (`/nois|loud|air ?con|sleep|small|breakfast|crowd/i` over lines >40 chars)
  rather than dumping everything. Two calls produced every substantive
  complaint. Airbnb's own `Guest reviews mention` counters are a fast proxy for
  what a property is actually known for.
- **The complaint that matters is rarely the one you expect.** On a hotel in a
  notorious nightlife strip, 940 reviews contained exactly one street-noise
  report (weekend-specific) — the repeated complaint was slamming corridor
  doors through unsealed frames. Pool hours, a chargeable safe and
  non-blackout curtains appeared only in reviews, never in the listing.
- Airbnb's "Show all N rooms" opens a **login wall**. Don't stop: dismiss via
  `[role="dialog"] button[aria-label*="Close" i]`, wait ~1.5 s, re-read from
  the `Choose your room` anchor — the room list has already expanded inline
  behind the modal.

## When the user reports a listing you missed, geocode it first

Two independent filters silenced the same property on the Mallorca run:
`room_types[]` excluded it as a hotel room, **and** the map box's `sw_lat` cut
it off geographically by 0.01°. Fixing either one alone would still have
missed it. Test a reported-missing listing against **every** filter dimension —
type, price band, score, and each edge of the bounding box — before concluding
which one was at fault. And pad Airbnb map boxes by ~0.01–0.02° beyond where
you think the area ends: resort strips extend past their nominal polygon, and
a suspiciously low result count (13 vs 25 after padding) is the tell.

## Search the single-base shape, not just the frame's split

The frame proposes a split (4 + 3); the price table decides. Run one extra
search per candidate area for the **whole range in one property** — it drops a
changeover day, a luggage move and a second booking, and where the single
hotel includes breakfast it frequently wins outright. Then price the thing the
split was buying: **the commute.** A cheap base 13 km from the old town means
a 30–40 min bus each way, every sightseeing day, for a week — that is the real
cost, and it belongs in the comparison next to the nightly rate, along with
which day trips stop being feasible from there.

## Fast reliable sequence

One Chrome page. `new_page` to the first Booking search URL →
`evaluate_script` immediately (skip `take_snapshot` entirely) → check the
`<h1>` resolved → record the matched count → `navigate_page` to each
subsequent URL and re-run the same script. One search per base plus one per
twin-town alternative, then the same loop over the Airbnb URLs, then open only
the two picks' property pages to confirm rate + cancellation. Finish with the
licensing and tourist-tax check via WebSearch.
