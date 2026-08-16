# Playbook: flight research

Techniques proven on real trips. Paste this into the flights agent's
prompt. Last updated: 2026-08-16 (Mallorca; Sicily 2026-08-04 before that).

**Start with `maviapi.md`.** `flightlist/search?from=&to=&date_from=&date_to=`
returns real fares with flight numbers and times across a whole date range in
one call — the fastest way to find which day is cheap. It quotes **USD**, so
convert before it meets a GBP number, and it is a shortlist, not a booking:
the carrier's own page still settles the fare and the baggage below.

## Normalise baggage BEFORE comparing carriers — this inverts rankings

The most common way to get a flight comparison wrong is to rank on headline
fare across carriers with different allowances. Ryanair Basic is under-seat
only; **TUI and Jet2 include a proper cabin bag** and some TUI fares include
hold luggage. Adding a 10 kg cabin bag to a Ryanair fare **7 days out costs
~£25–40 per person per leg — £100–160 for two adults return**, which is more
than the fare gap it was "winning" by. On the Mallorca run a £63 TUI ticket
was dismissed against a £48.09 Ryanair one; with bags counted the TUI ticket
was the cheaper of the two.

Always report **two figures per person**: the headline fare as sold, and the
fare **normalised to the party's actual luggage** (state the assumption).
State each carrier's included allowance explicitly rather than assuming, and
rank the recommendation on the normalised figure. Ryanair's bag price is
dynamic and climbs toward departure — get it live at the booking step, or
label it an estimate.

## The airport list is a default, not a boundary

The profile names five airports. Treating that as the search space silently
hides cheaper options: on the Mallorca run **Bristol was the cheapest outbound
anywhere (£33.71)** and a **Gatwick TUI return undercut every Ryanair option
on its date** — neither was searched, because neither was on the list. Sweep a
wider set first; it costs one loop of the fares API.

## Ask how they get to the airport — don't infer it

**Check the profile for the household's actual mode before costing anything at
the UK end, and if it isn't stated, ask rather than assume.** On the Mallorca
run the profile listed airports "by drive time", so a whole comparison was
built around parking, fuel and a stranded car — and the household in fact
takes the **train** from their local station, out and back. Everything derived
from the car assumption was wasted, and one of its conclusions was actively
wrong.

- **By train**: rank airports by rail connection from the home station — total
  journey time, changes, return fare for 2, and **whether the last train home
  still runs after an evening landing** (an arrival that forces an overnight
  in London is a real cost). Beware that some airports have no station at all:
  East Midlands is bus-only, which erases the advantage its short road
  distance appears to give it. **A UK-side open-jaw is fine by rail** — out of
  one airport, back into another, is a legitimate headline option.
- **By car**: cost parking (7–8 days differs by well over £50 between a
  regional and a London airport), fuel, and drive time — and then **both legs
  must use the same airport**, because a landing elsewhere strands the car.
  Price a mixed-airport pairing only as a separate line with the cross-country
  transfer cost made explicit.

Either way the ranking is on **door-to-door cost and time**, not on fares. If
a distant airport still wins after that, recommend it — but show the
arithmetic.

**Don't anchor on a station whose name merely sounds right.** "East Midlands
Parkway" is not East Midlands Airport and has no reliable link to it; anchoring
on it produced a wrong "you'd be stranded after a late landing" conclusion.
The real answer was the **Skylink bus, which runs 24/7** from Leicester and
made EMA the *only* airport of seven where a midnight landing doesn't force an
overnight. Always find the airport's actual published ground link, and check
the **last leg home** separately — the airport connection can run all night
while the last local train has already gone (Leicester→South Wigston stops at
22:25), which turns into a short taxi, not a crisis.

## Before anything: how many airports does the destination have?

One airport means **no open-jaw** — say so in one line and stop hunting.
Mallorca is PMI and nothing else; the whole open-jaw framing in this playbook
simply doesn't apply. Establish this first, it saves a research pass.

## When the dates are flexible, build a matrix

If the user gives alternative return dates, price **every** one against
**every** viable UK airport before recommending. On the Mallorca run the
spread was decisive and entirely counter-intuitive: from EMA the return leg
cost £86.99 on the Friday, £163.99 on the Saturday and £176.59 on the Sunday —
so the 8th night cost £12.60/person on the flight while the 6-night option
saved £77/person. Present the matrix and the per-combination totals, then
recommend; the cheapest flight date is often not the best trip.

## The two Ryanair APIs (no auth, plain JSON, WebFetch-able) — start here

1. Timetable — which days a route flies, with flight numbers and times:
   `https://www.ryanair.com/api/timtbl/3/schedules/{ORIG}/{DEST}/years/{YYYY}/months/{M}`
   Empty `"days":[]` reliably means "route does not exist" — loop all
   plausible IATA pairs to map the network in minutes.
2. Fares — cheapest per-person price per day for a whole month:
   `https://services-api.ryanair.com/farfnd/v4/oneWayFares/{ORIG}/{DEST}/cheapestPerDay?outboundMonthOfDate=YYYY-MM-01&currency=GBP`
   On single-flight days the day price IS that flight's price. Prices are
   Basic fare (under-seat bag only) — normalize bag policy before
   comparing airlines (Jet2 includes a 10kg cabin bag).
   **`farfnd` also flags `unavailable: true` on days with no service** — a
   second, independent confirmation of the `timtbl` day pattern, and the way
   to spot scarcity pricing: a fare 3–4× the route's normal level on a thin
   weekly schedule means the inventory is nearly gone, not that the route is
   expensive. Say so rather than just quoting the number.

## Other carriers

- Route + airlines + frequency: `https://www.flightconnections.com/flights-from-{orig}-to-{dest}`
  (lowercase IATA; fetches fine). Day-of-week detail lives in its JS
  calendar though — pin days with:
- trip.com flight-status pages: `https://uk.trip.com/flights/status-{flightno}/`
  (easyJet numbers are `u2xxxx`, not `ezyxxxx` which 404s) — ~3 weeks of
  operating history; derive the weekly pattern from the raw date list.
- easyJet prices: `https://stafftravel.easyjet.com/en/cheap-flights/{Origin-Slug}/{Dest-Slug}`
  — the staff-travel mirror is NOT bot-walled while www.easyjet.com is.
  Fare calendar with flight numbers/times/prices, but only renders the
  NEXT month — **useless <4 weeks out** (2026-08 run: returned the
  route-listing page with no fare table at all). Don't plan on it for a
  short-notice trip.
- trip.com airfares: `https://uk.trip.com/flights/{city}-to-{city}/airfares-{orig}-{dest}`
  (slug naming is fussy; try the metro-area code, e.g. `airfares-lon-pmo`).
- WebSearch snippets for route news (which airline just opened/never had
  a route).

## Dead ends — don't waste calls

WebFetch 403: flightsfrom.com, www.easyjet.com (including its
searchfares API), flightaware/flightera. Timeouts: jet2.com (prices
unobtainable without a real browser — link the date-picker page and say
so). Google Flights via WebFetch: pure JS shell, zero data — only emit it
as a human-clickable fallback link
(`https://www.google.com/travel/flights?q=Flights%20from%20X%20to%20Y%20on%20YYYY-MM-DD`).
Cloak scraper: unauthorized upstream as of 2026-08-04.

## Deep-link patterns

- Ryanair (verified):
  `https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=YYYY-MM-DD&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=XXX&destinationIata=YYY`
- easyJet legacy deeplink (unverified, may redirect):
  `https://www.easyjet.com/deeplink?lang=EN&dep=XXX&dest=YYY&dd=YYYY-MM-DD&apax=2&cpax=0&ipax=0&isOneWay=on`;
  safe fallback `https://www.easyjet.com/en/cheap-flights/{origin}/{dest}`.
- Jet2: no working deeplink — use
  `https://www.jet2.com/en/cheap-flights/{origin}/{dest-slug}`.
- Skyscanner human link:
  `https://www.skyscanner.net/transport/flights/{orig}/{dest}/{yymmdd}/?adults=2`.

## Gotchas

- WebFetch's summarizer mislabels weekdays — always recompute the weekday
  from the raw date yourself; derive patterns from date lists, not its
  prose.
- Same flight number can fly different times on different weekdays — two
  listed departure times usually means two weekdays, not two daily
  flights.
- Route existence ≠ date fit: most missed combinations die on day-of-week
  gaps. Resolve every candidate to the exact date before recommending.
- Aggregator "from £X" lead-ins disagree with live airline APIs by 3–4x —
  never quote them as bookable.
- Open-jaw on low-cost carriers = two separate one-way bookings; price
  each leg's direction independently (return legs are often the price
  driver — flag which leg to book first).

## Fastest reliable sequence

(1) Ryanair `timtbl` across all plausible pairs → network + days;
(2) flightconnections per route → other carriers;
(3) trip.com `status-{flightno}` → pin weekdays;
(4) Ryanair `farfnd` → real prices;
(5) stafftravel.easyjet.com → easyJet patterns;
(6) WebSearch → close gaps (Wizz/TUI/BA);
(7) hand-build deep links from the patterns above.
