# Research agent prompt templates

Five templates, one per agent. Replace the `{PLACEHOLDERS}` and launch all
five with the Agent tool **in one message** (they run in the background in
parallel). Placeholders:

- `{TODAY}` — today's date
- `{DEST}` — the destination region ("Sicily", "the Algarve")
- `{BASE1}` / `{BASE2}` — chosen bases with their airports ("Palermo (PMO)")
- `{OUT_DATE}` / `{RET_DATE}` — outbound and return dates
- `{SWITCH_DATE}` — the day the party moves from BASE1 to BASE2
- `{N1}` / `{N2}` — nights per base
- `{DAYTRIPS}` — the sketched day trips ("Cefalù from Palermo, Etna from Taormina")

Every agent prompt ends with the same contract: *"Your final message is raw
research data for synthesis into a trip plan, not prose for a human. Return
structured markdown. Include every URL in full. End with a `## Method notes
(reusable)` section: which tools/sites worked and which were dead ends, the
exact URL/query patterns that produced real data, gotchas, and the fastest
reliable sequence a future agent should follow."* Keep all of that — the
first half stops agents returning chatty summaries with the links stripped;
the method notes are how the playbooks in `playbooks/` stay current instead
of every trip rediscovering the same bot walls.

Before launching, check `playbooks/` for a file matching each agent's domain
(`flights.md`, `stays-booking.md`, `vlogs.md`, `blogs.md`,
`ground-activities.md`). If one exists, paste its contents into that agent's
prompt under a "Known techniques from previous trips — start here:" heading.
An agent that starts from the playbook skips the dead ends the last trip
already paid for.

---

## 1. Flights

> You are researching real, bookable flights for a {DEST} holiday. Today is
> {TODAY}. Trip: outbound {OUT_DATE}, return {RET_DATE}. 2 adults, cabin bags
> only, budget-airline style.
>
> Home base: Wigston, Leicester, UK. Airports by convenience: East Midlands
> (EMA, ~45 min drive), Birmingham (BHX, ~1h), Luton (LTN, ~1h45), Stansted
> (STN, ~2h), Manchester (MAN, ~2h). Destination airports: {BASE1 airport},
> {BASE2 airport}, plus any nearby fallbacks.
>
> Strong preference for an OPEN-JAW: fly into {BASE1}, home from {BASE2} —
> the trip is {BASE1} {N1} nights then {BASE2} {N2} nights.
>
> Tasks:
> 1. Establish which airlines fly which UK→{DEST} routes this season
>    (Ryanair, easyJet, Jet2, Wizz Air, BA, TUI) and on which days of the
>    week. Use WebSearch and WebFetch on airline route pages,
>    flightsfrom.com / flightconnections.com, and Google Flights.
> 2. Find actual options for the exact dates: airline, flight number if
>    obtainable, times, price per person. Airline sites are JS-heavy; if
>    WebFetch fails, load the stealth scraper via ToolSearch
>    ("select:mcp__plugin_maviapi_cloak__cloak_scrape") and use it.
> 3. Produce booking deep links for every recommended flight — Ryanair
>    pattern:
>    https://www.ryanair.com/gb/en/trip/flights/select?adults=2&dateOut={OUT_DATE}&originIata=XXX&destinationIata=XXX&isReturn=false
>    — easyJet/Jet2 equivalents, plus a Google Flights link per leg as
>    fallback.
> 4. Recommend the best combination (price × airport convenience × times)
>    and 2–3 alternatives, including a same-airport return if open-jaw is
>    bad value.
>
> Flag: weekday-only routes, pre-dawn departures, hold-bag pricing.
>
> Return: (a) route availability table; (b) best options per leg with
> times, prices, booking links; (c) recommended combination +
> alternatives; (d) caveats. [+ the standard data contract]

## 2. Stays

> You are researching Booking.com accommodation for a {DEST} holiday. Today
> is {TODAY}. Party: 2 adults, 1 room. Score 8.0+, £60–150/night (stretch
> ~£180 in resort towns in high season), central or near station/beach.
>
> Stays needed:
> 1. {BASE1} — check-in {OUT_DATE}, check-out {SWITCH_DATE} ({N1} nights).
>    Preferred areas: [fill from the frame].
> 2. {BASE2} — check-in {SWITCH_DATE}, check-out {RET_DATE} ({N2} nights).
>    If the base has a cheaper twin town (Taormina vs Giardini Naxos),
>    research both and say which is better for a swimming-focused stay.
>
> For each: a Booking.com search URL with exact params
> (checkin/checkout/group_adults=2/no_rooms=1/selected_currency=GBP,
> nflt=review_score%3D80), then 5–7 named candidates with property URL,
> neighbourhood, distances, score + review count, approx total in GBP, free
> cancellation y/n. One recommended pick per base with a one-line reason.
>
> **Also price the SINGLE-BASE variant** — one property for the whole range,
> in each candidate area — alongside the split above. A changeover costs a
> day, a luggage move and a second booking, and the single base is often
> cheaper and easier; the table decides it, not the frame. For each
> single-base candidate, state what it gives up: the commute from that base
> to the region's main sights, and which day trips stop being feasible.
>
> **Then do the same on Airbnb** — it is not optional, and in resort towns
> where the hotel search comes back thin it is often the thing that saves
> the base. **Do NOT filter to entire homes**: Airbnb sells hotel rooms and
> aparthotels too, and where private rentals are regulated out they are the
> only good value on the platform. Per base: 5–7 listings with URL, type,
> rating + review count, beds, distance, free-cancellation window, and the
> **all-in total in GBP including cleaning and service fees** — Airbnb's
> headline nightly rate hides both, and a fixed cleaning fee punishes a
> 3-night leg far harder than a 7-night one, so a rental that looks cheaper
> per night often isn't. Cross-check any hotel found on one platform against
> the other; the same property is routinely priced differently on each.
> Finish with a side-by-side verdict per base: best Airbnb vs best hotel on
> true total, plus the non-price factors (reception and daily cleaning vs
> self-check-in, **breakfast included is worth ~£150–200 for 2 over a week —
> count it**, luggage storage on changeover day).
>
> **Read the reviews of whatever you recommend** and report what guests
> actually complain about — noise, room size, aircon, beach crowding. A star
> average is not a finding; "reviews repeatedly mention street noise until
> 3am" is.
>
> **Check the local short-let licensing rules before recommending any
> rental** — they bite hardest exactly where trips go. Establish whether the
> city restricts or bans tourist rentals in apartment buildings, what
> licence number listings must display (Balearics ETV, Portugal AL, Italy
> CIN, Amsterdam/Barcelona registration), the state of any national
> registry purge delisting unregistered properties, and what the guest's
> practical risk is (short-notice cancellation, no recourse). If most
> listings in a base look unlicensed, that leads the section — it is not a
> footnote.
>
> Booking.com and Airbnb both block plain fetches: try WebFetch once, then
> the stealth scraper via ToolSearch
> ("select:mcp__plugin_maviapi_cloak__cloak_scrape"), then a real Chrome
> session (see the playbook — `evaluate_script` over the result cards, never
> `take_snapshot`). If live prices stay out of reach, fall back to
> well-reviewed properties verified via WebSearch and mark prices as
> estimates. Note city/tourist taxes — including the different rate band
> holiday rentals usually pay versus hotels, and who collects it — and flag
> likely sell-outs in high season. [+ the standard data contract]

## 3. Vlogs

> You are mining YouTube travel vlogs for a {DEST} trip plan ({BASE1} {N1}
> nights + {BASE2} {N2} nights, {OUT_DATE}–{RET_DATE}, couple, swimming +
> sightseeing + food, no car — trains and buses only). Today is {TODAY}.
>
> Find at least 10 relevant vlogs, ideally recent, covering the bases, the
> day trips ({DAYTRIPS}), food/street food, and "X days in {DEST}"
> itineraries. Use WebSearch (site:youtube.com and plain queries); WebFetch
> the video pages; mine descriptions/transcripts where accessible.
>
> For EACH vlog: title, channel, URL, year, then places recommended by
> name, practical tips, prices mentioned, warnings (scams, heat, crowds,
> overrated spots).
>
> Then AGGREGATE: places per area with which vlog(s) recommend each; tips
> by category (transport, food, beaches, heat/crowds, money/scams);
> consensus items marked. [+ the standard data contract]

## 4. Blogs

> Same shape as the vlogs prompt, but for blog articles / written guides:
> "{DEST} by train / without a car" itineraries, city guides per base, day
> trip guides ({DAYTRIPS}), best-beaches-in-{MONTH} pieces, food guides.
> WebSearch to find, WebFetch to actually read each one.
>
> For EACH article: title, site, URL, places by name, prices, opening
> hours, tips, warnings (dress codes, pickpockets, beach-club vs free
> beach). AGGREGATE as in the vlogs prompt, plus: official ticket/booking
> URLs for sights wherever an article links one. [+ the standard data
> contract]

## 5. Ground transport + activities

> You are researching ground transport and bookable activities for:
> land {BASE1 airport} {OUT_DATE} → {BASE1} {N1} nights → travel
> {SWITCH_DATE} to {BASE2} → {N2} nights → fly home from {BASE2 airport}
> {RET_DATE}. 2 adults, no car. Today is {TODAY}.
>
> Real prices and booking links; official operator sites first, then
> thetrainline.com / GetYourGuide / Viator. Stealth scraper fallback via
> ToolSearch ("select:mcp__plugin_maviapi_cloak__cloak_scrape").
>
> TRANSPORT: airport↔city both ends (all options, prices, frequency);
> {BASE1}↔{BASE2} (train vs bus, duration, price, booking link, which is
> better with luggage); trains/buses for each day trip ({DAYTRIPS});
> booking specifics (which trains need seat reservations and when they
> sell out, validation rules, strike risk).
>
> ACTIVITIES with specific bookable product links and per-person prices:
> the signature excursion(s), a boat trip, the headline sights' official
> ticket pages, a food tour option, anything with timed entry that sells
> out. Also: beach logistics — lettino/umbrella day prices vs free areas,
> water shoes, best arrival times. [+ the standard data contract]
