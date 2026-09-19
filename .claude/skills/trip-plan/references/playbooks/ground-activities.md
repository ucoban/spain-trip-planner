# Playbook: ground transport + activities research

Techniques proven on real trips. Paste this into the transport/activities
agent's prompt. Last updated: 2026-09-18 (Güneydoğu/Türkiye; Gothenburg 2026-09-03; Mallorca 2026-08-16;
Sicily 2026-08-04 — earlier specifics kept where they generalise).

**Start with `maviapi.md`** for the two things it does well here:
`thetrainline/fares` prices the UK rail leg to the airport without opening
National Rail, and `getyourguide/activities/<slug>` lists tours with prices
and availability. Neither replaces the operator's own API below — timetables,
live availability and booking rules only exist there — and a *guessed*
GetYourGuide slug returns a real page for a different continent, so resolve
it through `getyourguide/catalog` rather than inventing the number.

## Find the transport authority's internal JSON API before reading any HTML

This is the single biggest unlock, and it generalises to most European
regional operators. Open one line page in a real browser, list the network
requests filtered to xhr/fetch, and read the endpoint names. Then pull
timetables in bulk instead of fighting a JS calendar.

Mallorca's TIB (`tib.org`) exposed everything unauthenticated:
- `/o/manager/all-lines?entity=ctmr4&groupId=20124&langId=es_ES` → every line
  with code, name, towns. **Use this to kill stale line numbers before
  researching them.**
- `/o/manager/line/<CODE>/entity/ctmr4/es` → full stop list with lat/lon
- `/o/manager/schedules/<lineId>?groupId=20124&languageId=es&entity=ctmr4` →
  every timetable version with `urlScheduleFile`; prefix the host and you have
  the official PDF, validity dates in the filename (`L334, 2026.05.15 a
  2026.10.18`)
- `/o/manager/time-town/<townId>` → the fare zone
- `/o/manager/card-rate` (POST) → the live fare engine
- `/o/manager/alerts/enriched/ctmr4?lineCode=<N>` → service alerts

Then `curl` the PDF and `pdftotext -layout` it. **`-layout` is essential** —
without it the columns interleave into garbage. Beware stacked two-line
headers: reconstruct the column→stop mapping from the API's stop list and
sanity-check every journey duration (if all runs come out at an identical
sensible number, the mapping is right).

**Some operators need a token from the page.** EMT Palma's `/maas/api/v1/...`
returns `USER_UNAUTHORIZED` unauthenticated; in-page:
```js
const u = JSON.parse(localStorage.getItem('userAccountInformation'));
fetch('/maas/api/v1/fare/getFaresTable?locale=en', {headers:{Authorization:'Bearer '+u.bearerToken}})
```
`schedule/?sublineCode=<n>&locale=en` returned both directions' full
`departureTimes[]` — which the UI refuses to show for the reverse direction.

**Fare tables published as images**: `curl` the PNG to the scratchpad and
**Read the image file** — the model reads the table directly. Faster than
hunting for a text version that doesn't exist (TIB publishes fares only as
PNGs; its own site says "Tarifas no disponibles (en construcción)").

## Bot walls: go to the ticketing subdomain

When a venue's marketing site is Cloudflare-walled, its ticket shop usually
isn't. `catedraldemallorca.org` never cleared the challenge even in headless
Chrome after 50 s; **`catedraldemallorca.entradasdemuseos.com` was wide open
with every price.** Generalises to `<venue>.entradasdemuseos.com`,
`tickets.patrimonionacional.es`, and operator portals `reservas.<operator>.com`.

Also fetchable with plain WebFetch: `thetrainline.com/en/train-times/
<origin>-to-<destination>` (kebab-case station slugs) — static SEO pages with
durations, trains/day, first/last departure, operators. Best source for
European rail route facts without touching the operator's JS site.

Bot-walled or dead — don't burn rounds: GetYourGuide product pages (403),
municipal sites (`castelldebellver.palma.es`, `mobipalma.mobi` refused
connection), ticketone.it, operator journey-search pages with dynamic JS
(trenitalia search — never attempt). Cloak scraper: unauthorized upstream as
of 2026-08-04.

## GetYourGuide / Viator prices without scraping

1. WebSearch topic + "GetYourGuide <year>" → result titles carry the canonical
   product URL with its t-number (`...-t636956/`).
2. Prices come from fetchable affiliate mirrors: happytovisit.com,
   theabroadguide.com, veronikasadventure.com, world-tourism.org. Strip their
   `?partner_id=` — report the clean
   `getyourguide.com/<location-lX>/<slug>-t<ID>/` URL. **Mirrors disagree**
   (one Mallorca catamaran: €56 vs €69) — report the spread, don't average.
3. Viator URLs appear in search results with prices in snippets; no fetch.
4. Prefer the operator's own site when it exists — Secret Food Tours published
   a firm €79.99 while the Viator equivalent showed USD 180 against a
   traveller-reported €87.

## The findings that actually change an itinerary

- **Query the operator's live availability feed for the real travel dates.**
  This converts a vague "book ahead" into "your 10:00 and 11:00 slots are
  already at zero on 22–29 Aug". Highest-value single move of the Mallorca run.
- **Advance-booking policy is a first-class research target, not a footnote.**
  The Sóller train sells *only* the combined round-trip online (€32 vs €40 at
  the window); every other ticket is same-day box-office only. That one rule,
  on one page of the operator's site and mentioned by no third party, reshapes
  the whole day plan.
- **Check what day things close.** Cartoixa de Valldemossa closed Sundays;
  Almudaina, Es Baluard and Bellver closed Mondays. It silently invalidates
  itineraries.
- **"Free public transport" headlines are almost always residency-gated.** TIB
  and EMT are both free in 2026 — for *empadronado* cardholders only. The
  tourist-relevant number was the **contactless discount (~40% off cash, and
  cheaper per head for 2+ people tapping the same card)**, buried in an HTML
  footnote. Always find the tourist rate, and always note tap-on/tap-off rules
  and the penalty for missing the exit tap.
- **A "restriction" is often two different rules with different exemptions.**
  The Cap de Formentor road has separate regimes either side of PK 8+700:
  taxis are exempt on the first stretch and **not** on the second, so only the
  bus reaches the lighthouse 10:00–22:00. Read the actual legal annex (BOE),
  not the press release — the press release even had the wrong end date.
- **Departure-morning feasibility is a real constraint — compute it.** From a
  mountain base the earliest public-transport arrival at PMI was 07:40, so any
  flight before ~09:30 needs a pre-booked taxi. Work the chain backwards from
  the flight and state the cutoff.

## Gotchas that generalise

- **Blogs recycle dead bus lines for years.** Half the internet still routes
  Palma→Porto Cristo on line 412, which stopped being that route in 2022;
  lines 320/330/340/350/351/352 and the Es Trenc shuttle (530) don't exist at
  all. **Validate every line number against the operator's live line index or
  GTFS before planning around it.** GTFS `routes.txt` / `stops.txt` is ground
  truth for "does this service exist" — a beach with no stop in `stops.txt`
  has no bus, whatever the guides say.
- Aggregators (Trainline/Omio/Rome2Rio/Kiwitaxi) quote USD/GBP with fees baked
  in — Kiwitaxi quoted ~€130 for a €55 metered taxi. Always restate the
  official EUR fare/tariff as ground truth. For taxis, find the published
  decree (flag + €/km + airport supplement + minimum) and compute it.
- Official *index* ticket pages lag the per-site pages; trust the per-site
  page and flag conflicts. Third-party price quotes run 1–3 years stale —
  expect conflicts and say which source you trust and why.
- Seasonal fare jumps are common (heritage trains, boats, lidos) — prefer
  sources with the target year in title/URL.
- Flat-fare local buses can't sell out; crowding is the only variable.
  Reserved-seat or limited-capacity products (boats, heritage trains, timed
  monument entry) selling out IS the book-now signal.
- **Event calendars: only the venue's own ticketing page counts.** Local news
  and festival blogs recycle previous years' line-ups and read as current. On
  the Sicily run three concerts sourced that way did not exist on the trip's
  dates. "No event in our window" is a finding worth writing down.
- **A shared browser is hostile.** Another session repeatedly stole the
  selected page mid-task; `isolatedContext` did not reliably protect it. Do
  navigate → evaluate in tight pairs, guard every script with a
  `location.href` host check and bail if wrong, and prefer an in-page
  `fetch()` of a JSON API over multi-step UI clicking.
- **Spend the search budget on discovery, not harvesting.** It runs out faster
  than you expect (~200/session). Use searches to find official domains and
  exact URL paths, then go direct.

## Local-language caveat sweep — always do one

Query in the local language for: *huelga / sciopero* (strike), *cierre /
chiusura* (closure), *restricción*, *ola de calor* (heatwave),
*manifestación* (protest), plus the target year. It surfaces legal texts,
strike resolutions and closure notices English queries never return — on the
Mallorca run it found the BOE decree behind the Formentor restriction, the
handling strike's resolution date, and two anti-tourism protests. Italy August
trips: search "franchigia estiva" — the late-July to early-Sept transport
strike ban can zero out strike risk.

## Fastest reliable sequence

(1) One parallel WebSearch batch (~6 queries, topic + year) purely to discover
official domains and URL paths; (2) find the transport authority's internal
API, then bulk-pull timetable PDFs and `pdftotext -layout` them; (3) official
operator pages for EUR fares, reading fare images directly where needed;
(4) official ticket pages for monuments, jumping to the ticketing subdomain
when the main site is walled; (5) query booking endpoints for the actual
travel dates to turn "book ahead" into a concrete sell-out finding;
(6) local-language caveat sweep; (7) delegate breadth early to parallel
subagents — but brief them with the fetchability map so they don't
rediscover the same 403s, and be ready to backfill if one doesn't return.

## Read the tour's own product page before describing it (Palermo, 2026-08-19)

A tour listing from an API gives price, rating and title. It does **not** give
the itinerary, and the itinerary is where the draft goes wrong. On the Palermo
run a WebSearch summary confidently said the Zingaro/San Vito boat trip
included "a light lunch on board with cunzato bread, wine, water and fruit" —
that is a *different operator's* product from the same port. The actual page
said four hours of free time in San Vito Lo Capo and no lunch at all. Had that
gone in, the day's food line and the day's mood would both have been wrong.

So: for any tour that becomes a whole day of the plan, open **that product
page** and take the times, the pickup points, the stops and the inclusions
from it. What it also hands over for free, and what no aggregator carries:
the **cancellation policy** ("free cancellation up to 24 hours", "reserve now
& pay later"), the **operator's name**, and recent dated reviews.

GetYourGuide product pages **403 WebFetch** and return Cloudflare's error page
on the free cloak tier. `cloak_scrape` with **`pro: true` and `proxy: true`**
read it first try — that combination is the one to reach for on GYG, and the
`evaluate` expression `document.body.innerText.slice(0,3500)` is enough; no
selector hunting needed.

## Events: two independent calendars, or it doesn't go in the plan

This repo has already shipped three concerts that were not real. The cheap
guard that worked: take the candidate list from an aggregator (Songkick), then
confirm the exact dates against **the festival's or venue's own calendar**, and
only write what both agree on. On the Palermo run both sources gave the same
four Velodromo/Ippodromo dates — and the honest finding was that **none of them
fell on a night we were free**. Write that up explicitly as a table with a
"does it fit?" column; "there is nothing on" is a real answer that stops the
user searching, and it is only credible if the checking is shown.

## Additions from the Gothenburg run (2026-09-03) — Swedish operators

- **Västtrafik publishes every timetable as an Azure-blob PDF.** Each line page
  `https://www.vasttrafik.se/reseplanering/tidtabeller/linje/<lineId>/` links
  `vtstorage002.blob.core.windows.net/vtstoragecontainer01/<line>__0__LINE__<from>__<to>__<guid>__.pdf`
  (and `__STOP__` PDFs per stop, listed on the same page); `pdftotext -layout`
  reads them cleanly, with validity dates in the filename. Line IDs follow
  `90110145<line>00000` for trams (5 = `9011014500500000`, 11 =
  `…501100000`), `9011014520500000` for bus X4, `9011014528100000` for boat
  281. **Fares live in the board paper**
  (`globalassets/…/nr-05-prisjustering-2026.pdf`, grep "Prislista") — the
  ticket pages carry no price table. The journey planner needs an OAuth token:
  don't bother. Tap-to-pay works on trams/buses/boats but **not on regional
  trains** — a fact worth a line in every Swedish draft.
- **Flygbussarna is DataDome-walled end to end** — 403 to curl, WebFetch and
  even in-page `fetch` of its `/api/mobile/catalogue/*` from a real Chrome tab,
  and Västtrafik's page for the line carries no timetable. Quote the fare from
  the operator's landing page, the frequency from Swedavia, and say the
  timetable must be checked in the app on the day. FlixBus's route page is open
  and is the honest fallback.
- **SJ fares render in headless Chrome**:
  `https://www.sj.se/en/search-journey/choose-journey/<From>/<To>/YYYY-MM-DD`
  with **Swedish station names** (`Köpenhamn H`, not `København H`); prices
  appear ~5 s after "Loading price", so one `evaluate_script` with a 6–8 s
  sleep grabbing lines matching `Departure time` returns every train with its
  fare. Trainline renders the schedule but "can't sell" Öresundståg.
- **Citybreak ticket shops hide prices behind a button.** Universeum's
  `book.universeum.se` product page prints adult/child/senior prices only after
  clicking "BOKA NU" in Chrome; the marketing site never shows them. Same
  pattern likely for other Citybreak-hosted venues.
- **Events, Swedish double-sourcing that worked**: gotevent.se venue pages
  (Scandinavium/Ullevi) + Songkick metro page (Gothenburg is `34443`; `29357`
  is Ambur, India — check the city in the title); Tickster venue listings for
  club venues (Trädgår'n, Pustervik); gso.se paginates with `?offset=24/48`;
  football fixtures from the clubs' own sites (ifkgoteborg.se, gais.se,
  bkhacken.se/matcher) — the league aggregators were a year stale.
- **Booking systems on Cloudflare (timecenter.se)** never clear the "Just a
  moment" challenge headless — link the booking URL for the human, take the
  rules from the municipality page, and say the live slot pattern is
  unverifiable.
- **Municipal free things have a release calendar.** Gothenburg's free public
  sauna releases a month of slots on the third Monday of the previous month —
  the date the household must act on. Always ask "when do slots open?" for
  anything free and booked; it is the most urgent line in the checklist.
- maviapi this run: `thetrainline/fares` returned empty for every Swedish
  route (no advance inventory ≠ no service); `flightlist/search` missed the
  direct Pegasus flight and showed only connections; `getyourguide/activities/
  gothenburg-l479` (the real slug) was `scrape_failed`;
  `tripadvisor/attractions?geo=189894` worked. airportinfo.live/flight/<no>
  gives a flight's published schedule and punctuality when flightera/flightaware
  403.
- **Clock-change weeks**: check whether the trip straddles the DST change
  (last Sunday of October in Europe) — sunset moves an hour earlier mid-trip,
  which reorders outdoor days, and Västtrafik states night timetables are
  pre-adjusted.


## Additions from the Güneydoğu (Türkiye) run (2026-09-18) — a CAR trip, not public transport

**Turkey-specific detail lives in `turkiye-resmi-kaynaklar.md`.** What generalises:

### For a self-drive trip, the deliverable is a LEG TABLE, not a timetable
Every leg with **km and a realistic seasonal drive time**, plus a **total for the whole trip** —
because the total is what decides the rental's kilometre policy. On this run the route came to
**~2,490 km over 8 days**, which fails *every* common daily-km cap (even 300 km/day falls short).
**That single number was the most consequential output of the whole transport research.**
Always compute it and lead with it.

### Get distances from the national road authority, not a map API
Most countries' road authorities publish official distance matrices. Turkey's KGM ships them as
**downloadable spreadsheets** (province matrix and a 1,007,013-row district matrix). Authoritative,
and it corrected a brief's wrong figure by 67 km — which changed a day's feasibility verdict.
⚠️ **But cross-check anywhere the geography has changed**: a dam had drowned an old alignment, so
the official figure was 18 km short and every pre-flood distance for that town was systematically wrong.

### OSRM for *marginal* detour costs
`router.project-osrm.org/route/v1/driving/LON,LAT;LON,LAT?overview=false&steps=true` — free, no key.
**Multi-waypoint URLs give per-leg splits**, which is how you cost a detour as "+36 min" rather than
as a total. That framing is what makes a detour decidable. ⚠️ Sanity-check each leg's implied speed;
OSRM is right on trunk roads and badly wrong on minor access roads. ⚠️ python `urllib` gets
`SSLV3_ALERT_HANDSHAKE_FAILURE` on that host — curl to a file.

### Compute solar times; never search them
~30 lines of NOAA matched `api.sunrise-sunset.org` to 2 minutes (`timeanddate` 403s everything).
On this run the brief's assumed sunset was **20 minutes pessimistic**, and that alone changed
whether a day worked. Add **~8–10 min per 2,000 m** of elevation for the visible sunset.
Also check whether the country observes DST at all — Turkey is permanently UTC+3, so there is no
clock-change week to plan around.

### 🔴 Winter/mountain access is a SEASONAL question the ticketing system will not answer
The headline sight of one day (a 2,150 m summit) is **snow-closed roughly December–March every
year**, and the Ministry's own ticketing page showed it as **"Durum: AÇIK"** throughout — because
that flag is administrative, not a condition report. The truth was in (a) free-text Turkish warning
prose telling you to phone the museum directorate, and (b) **dated news wires reporting the annual
road-clearing operation**, which named the exact date the road reopened (4 April).
**For any high-altitude or seasonal site: find the season-opening news story from the previous
spring. It is published every year and it is the most reliable answer available.**

### Mountain passes: check the incident history, not just "is it open"
A named pass on the route turned out not to be a *snow* risk at all — the authority keeps it open —
but to have a monthly rhythm of **fog, rockfall and lorry rollovers**, including a **two-way closure
from a rockfall** and planned intermittent closures for controlled rock-clearing. Query
`<pass name>` + `kapandı` / `heyelan` / `sis` / `devrildi` + year. **The right output is "treat this
65-minute leg as 65 not 52, and don't drive it in the dark" — not a binary open/closed.**

### Prayer times are an opening-hours constraint
For any trip with mosque visits: `api.aladhan.com` (Turkey: `method=13`, Diyanet). A major mosque is
effectively shut to sightseers ~30–40 min either side of the midday and afternoon prayers, which in
winter fall straight through the middle of the sightseeing block. Put the windows in the day plan.

### Toll systems charge by station PAIR
Exiting a motorway for a roadside sight and rejoining can cost **more** than the through-run
(45+65 vs 73 on this route). Small money, but state it so a detour's real cost is honest.
Electronic-only tolling (Turkey's HGS) means **a hire car's tag balance is the renter's problem** —
an empty tag becomes a violation with a multiple-of-toll penalty. "Confirm the tag has balance at
pickup" belongs in every self-drive checklist.
