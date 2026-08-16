# Playbook: ground transport + activities research

Techniques proven on real trips. Paste this into the transport/activities
agent's prompt. Last updated: 2026-08-16 (Mallorca; Sicily 2026-08-04 before
that — Italy specifics kept where they generalise).

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
