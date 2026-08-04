# Playbook: flight research

Techniques proven on real trips. Paste this into the flights agent's
prompt. Last updated: 2026-08-04 (Sicily trip).

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
  NEXT month — useless <4 weeks out, good for patterns.
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
