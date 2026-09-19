---
name: trip-plan
description: >-
  Research and draft a complete, bookable holiday plan for any destination and
  date range — real flights with booking deep links, a Booking.com and Airbnb
  shortlist, trains/buses between bases, activities with ticket links, and tips
  mined from YouTube vlogs and blog articles by parallel research agents — in
  the style of this repo's Spain (Barcelona + València) plan. Use whenever the
  user asks to plan a trip or holiday for a place and dates, in any language
  ("Sicilya planı yap", "plan a week in Lisbon", "tatil rotası çıkar",
  "/trip-plan Porto 10-17 Nisan"), even when they only name a region and a date
  range. The output is a DRAFT markdown file — never edit the site's own files
  unless explicitly asked to wire the plan in.
---

# Trip plan — research and draft a full holiday route

Produce the same thing the Spain plan in this repo is: a day-by-day route where
every flight, hotel, train and ticket has a real link, tips are mined from
vlogs and blogs, and prices are honest about what was verified live versus
estimated. The deliverable is **one draft markdown file** for the user to read
and react to — not site changes.

## Inputs and defaults

Parse from the user's message: **destination** (region or city pair) and
**date range**. If either is missing, ask before spawning anything. Everything
else defaults to the household profile below unless the user overrides it:

- Home: **South Wigston, Leicestershire — and the journey to the airport is
  BY TRAIN, from South Wigston station, out and back. There is no car and
  nothing is parked anywhere.** Never cost parking, fuel or drive time, and
  never rank airports by road distance.
  - So rank candidate airports by **rail connection from South Wigston**:
    total journey time, number of changes, return fare for 2, and whether the
    last train home still runs after an evening landing. Luton (Luton Airport
    Parkway + DART) and Birmingham International (station attached to the
    terminal) are rail-served; **East Midlands EMA has no station at all** and
    is reached by the Skylink bus from Leicester — check its hours against the
    flight times before recommending it.
  - Candidates to sweep, not a boundary: EMA, BHX, LTN, STN, MAN, plus
    Gatwick, Bristol and Liverpool. Let **door-to-door cost and time** decide.
  - **A UK-side open-jaw is fine** — with no car to strand, flying out of one
    airport and back into another is a legitimate headline option.
- Party: 2 adults, cabin bags only, budget-airline comfortable. **Normalise
  baggage before comparing carriers** — TUI and Jet2 include a cabin bag,
  Ryanair Basic doesn't, and the add-on can invert the ranking.
- Stays: **Booking.com and Airbnb, always both** — score 8.0+ (Airbnb 4.7+),
  target £60–150/night (stretch ~£180 in resort towns in high season),
  central or near station/beach, 1 room / entire place. Compare the two on
  true all-in totals (Airbnb's cleaning + service fees, which punish short
  legs) and check the local short-let licensing rules before recommending a
  rental.
- Style: swimming + sightseeing + food, no rental car — trains and buses.
- Open-jaw flights when the route has two bases (fly into one, home from the
  other), like BCN-in/VLC-out in the Spain plan.
- The user reads Turkish: the draft plan is written in **Turkish** (idiomatic,
  not translated-sounding), with place names and links untouched.

## Step 1 — Frame the trip before researching

Read `README.md` and `stays-data.js` to refresh the house style (skip if
already in context). Then decide the skeleton yourself — agents research
better against a concrete frame:

- Split the range into 1–2 bases (7 nights ≈ 4 + 3). Pick bases so that day
  trips are short and one base has proper swimming. Note the likely
  arrival/departure airports for the open-jaw.
- Sketch which day trips hang off which base (the Cefalù/Montserrat role).
- **Always have the stays agent price the single-base variant too**, not only
  the split you chose. One base for the whole range costs a changeover day,
  a luggage move and a second booking — and on a small island or a compact
  region it is often cheaper *and* easier, especially where a single hotel
  includes breakfast. The frame is a hypothesis; the price table is what
  settles it. Say what the single base gives up (usually: the far end of the
  region stops being a day trip) rather than assuming the split wins.

State the frame in one short paragraph to the user before launching agents,
so a wrong guess dies early. **Frame it as a proposal, and name the one or
two assumptions most likely to be wrong** — the user knows things the
research doesn't, and a frame stated as settled invites nothing back.

## Step 2 — Spawn the research agents

Launch **five parallel background agents** in a single message, using the
prompt templates in `references/agent-prompts.md` with the placeholders
filled in:

1. **Flights** — real routes and dates, times, prices, deep links.
2. **Stays** — Booking.com *and* Airbnb shortlist per base, live prices if
   scrapeable, compared on all-in totals plus the local licensing check.
3. **Vlogs** — 10+ YouTube vlogs mined for places, tips, prices, warnings.
4. **Blogs** — 10+ articles mined the same way.
5. **Ground transport + activities** — trains/buses with operators and
   prices, tours and sight tickets with bookable product links.

Each template already tells the agent which tools to reach for in which order,
and to return raw structured markdown, not prose. Two additions the templates
also carry:

- **Playbooks in, method notes out.** Before launching, read
  `references/playbooks/` and paste the matching playbook into each agent's
  prompt — it holds the techniques previous trips paid to discover (which
  sites bot-wall, which URL/query shapes return real data, scraper
  fallbacks that actually work). **`maviapi.md` goes into every agent's
  prompt**, on top of its own domain playbook. Every agent must end its
  report with a `## Method notes (reusable)` section; without it the
  knowledge dies with the agent.

  **Country playbooks go in too, when one exists.** `turkiye-resmi-kaynaklar.md`
  is the first: for a Turkish trip it replaces most blog research outright,
  because Turkey publishes museum hours, closed days, **live open/closed
  status**, prices, road distances, tolls and fuel prices as scrapable official
  data — while its travel-blog internet is almost entirely stale. Paste it into
  every agent on a Turkish trip. When a run discovers a country's official data
  layer, write it up as its own `<country>-*.md` rather than burying it in the
  domain files.

- **Ask the APIs before driving a browser.** maviapi
  (`https://api.maviapi.com/v1/sites/<slug>/...`, key in `~/.maviapi-key`)
  serves Booking.com, Airbnb, Trainline, Tripadvisor, GetYourGuide and flight
  fares as plain JSON — a hotel shortlist or a rail fare that used to take a
  Chrome session is one request. `references/playbooks/maviapi.md` has the
  working endpoints, the dead ones, and the one rule that matters: **when a
  location fails to resolve these endpoints return a different city rather
  than an error** (Mallorca queries came back as Barcelona; a guessed
  GetYourGuide slug came back as Cape Town). Check every result is about the
  place you asked for before a price from it reaches the draft. Treat the
  numbers as a shortlist and confirm the actual picks live — a headline that
  turns out not to be bookable is the one failure this whole skill exists to
  avoid.

- **Ask whether the trip is even shaped like this skill assumes.** The default
  profile (2 adults, UK rail to the airport, open-jaw, swimming) is a default,
  not a boundary. A trip can be a self-drive road trip with a rotating cast and
  free accommodation with friends — in which case the deliverables change: no
  flight fares, a **leg table with a whole-trip kilometre total** (it decides
  the rental's km policy, and every common daily cap fails a long route), a
  **cast-and-dates table** for who joins and leaves when, and hotel research
  for only the nights that actually need it. Re-scope the five agents to the
  trip in front of you rather than filling the template's slots. Five is a
  default too — the Türkiye run used six, split by region rather than by domain,
  because the sights research was the bulk of the work.

- **In a disaster-affected region, current-status verification IS the job.**
  After an earthquake, flood or war, every pre-event blog, guidebook and
  listicle describes buildings that may no longer stand — and reads as current.
  Tell every agent to establish dated post-event status for each sight, and to
  report "unverified status" as a finding rather than passing an old listing
  through. Two rules worth quoting to them verbatim: **"restoration complete"
  is not "open to visitors"** (one castle was declared restored twice and still
  has not opened), and **a Tripadvisor ranking is not evidence a place is open**
  (one site sat at #2 in its city eight years after closing, another at #1
  while shut since an earthquake).

- **Feasibility arithmetic is a first-class deliverable.** Ask each regional
  agent to set its day's driving against that day's actual daylight and return
  a verdict plus two or three alternative shapes. On the Türkiye run this
  killed one day as written (401 km of driving against 9h43 of light, leaving
  55 minutes per city) and rescued another that had looked impossible. **Give
  agents the computed sunrise/sunset up front** — a 20-minute error in an
  assumed sunset changes which days work.

While agents run, do any local prep (skeleton of the draft file);
synthesize only after all five report.

## Step 3 — Synthesize the draft

Write `<destination>-plan-taslagi.md` in the repo root (draft only — it is
fine that it's untracked; do not touch site files). Structure, mirroring the
Spain plan:

1. **Özet** — route in one line, the two headline flights with prices, the
   two hotel picks, rough total per person.
2. **Uçuşlar** — chosen flights with times, prices, booking deep links, plus
   1–2 alternatives; flag day-of-week limits and early departures.
3. **Konaklama** — per base: the pick (score, reviews, area, total price,
   cancellation) + 3–6 alternatives, each with its booking.com URL and the
   exact-dates search URL. Then the **Airbnb karşılaştırması**: the best
   entire-place candidates on all-in totals (nightly + cleaning + service
   fee), the verdict per base against the hotel pick, and any short-let
   licensing caveat that makes a rental risky to book.
4. **Gün gün plan** — every day: morning/afternoon/evening stops with rough
   times, category (yol / gezi / müze / tekne / yüzme / yemek / etkinlik),
   per-person € where known, and a mined tip with its source link where one
   exists. Swimming days get the beach logistics (free beach vs lettino
   price, water shoes, when to arrive).
5. **Uçmadan önce ayırt** — the booking checklist in order of urgency:
   flights, hotels, reserved-seat trains, timed sight tickets, tours — each
   line with its link and price.
6. **Bütçe** — table: flights / hotels / transport / tickets & tours / food
   estimate → total for 2 and per person.
7. **Kaynaklar** — the vlogs and blogs actually used, as link lists.

Honesty rules from the Spain plan: mark live-verified facts as such
("Gerçek durum: …" with the link), label estimates as estimates, and when a
desired route/hotel doesn't exist (like the missing VLC→EMA nonstop), say so
and give the workaround. Prefer fewer, verified links over many guessed ones
— a wrong deep link is worse than a Google Flights fallback.

## Step 4 — Fold the methods back into the playbooks

After synthesis, take each agent's `## Method notes (reusable)` section and
merge it into the matching file in `references/playbooks/` (`flights.md`,
`stays-booking.md`, `vlogs.md`, `blogs.md`, `ground-activities.md`) —
create the file if it's the first trip for that domain. Merge, don't
append-forever: keep techniques that generalize (URL patterns, param
gotchas, bot-wall workarounds, which tool to reach for first), drop
one-off trivia about the specific destination, and overwrite anything the
new trip proved outdated (e.g. a scraper that stopped being authorized, a
price filter param that changed). Date-stamp volatile facts. The playbooks
are why trip N+1 is faster and cheaper than trip N.

## Step 5 — Present

End with a short Turkish summary: the route, the two flights + prices, the
two hotels + totals, budget bottom line, and the 3–4 things that sell out
first. Offer — don't start — the follow-ups: wiring the plan into the site,
or re-verifying prices closer to booking day.

## Step 6 — Only if asked: wire it into the site

The draft is the deliverable. When the user asks for the plan on the site
(“siteye yükle”), follow `trip-italy.js` / `trip-mallorca.js` exactly: a
`trip-<id>.js` registering into `window.TRIPS` with `days`, `bookings`,
`maps`, `mapCity`, `places`, `stays`, `map` and `i18n` in both languages;
a card in `trips.js`; an accent ramp in `styles.css`; the script tag on
`index.html`, `stays.html` and `trip-map.html`; a README paragraph. Follow
the template and no other file needs touching.

**Every stop worth a picture gets a small gallery.** Add the trip to
`tools/photo-queries.json` and run `node tools/photos.mjs`, which resolves six
Wikimedia Commons photographs a stop — each with the author and licence that
let us publish it — into `photos.js`, which `app.js` hangs off the stop cards.
Then `node tools/tripadvisor.mjs` adds what the crowd made of each stop into
`ratings.js`. Four rules, each of which cost a round to learn:

- **Only the stops you would not recognise from their name.** Buses, flights
  and "dinner back at the base" get nothing; a stock airport photo is filler.
  A place appears once per trip, on its first visit, so the week doesn't
  repeat itself down the page.
- **A confidently wrong photograph is worse than none.** Unpinned search
  answered "El Carmen, Valencia" with El Cid and "Santa Catalina, Palma" with
  a castle in the Canaries. Pin the article (`ca:Banys Àrabs de Palma`), the
  Commons category (`cat:Coves del Drac-Inside`) or the exact file whenever
  the plain name is ambiguous — a query can be a list, so a hand-picked lead
  keeps a whole category for company. Read the resolver's report: it prints
  what each stop actually landed on.
- **Within a stop, rank the frames.** A Commons category is alphabetical, so
  taken as they come you get a manhole cover and a shop sign above the view of
  the town. Prefer what the article *and* the category both vouch for, then a
  filename that names the place, then the biggest — and keep the plans,
  crests, portraits and posters out by name.
- **Look at them before shipping.** Build one contact sheet of every resolved
  frame and screenshot it; that is what caught a protest march standing in for
  a bus square and *Toledo* cathedral standing in for Palma's. Loading a few
  hundred Commons thumbnails at once gets you throttled, and a throttled image
  looks exactly like a missing one — check a failure individually before
  believing it.

### What the Güneydoğu wiring added (2026-09-18)

- **Add the destination's language to `WIKIS` in `photos.mjs` before you run
  it.** English Wikipedia has no article for Yesemek, Perre, Karakuş, Hasan
  Paşa Hanı or the Adana museum; Turkish has all five. One word in a list
  turned three MISSes into six-frame galleries.
- 🔴 **A name that matches perfectly can still be the wrong continent.**
  `tr:Perre` resolves cleanly — to a *freguesia in Viana do Castelo,
  Portugal*, and the gallery came back as municipal coats of arms and a
  parish church. The Commagene city is `Perrhe`. The matcher can only check
  the name it was given, so on the contact sheet **ask what country each
  frame is in**, not just whether it looks like the right kind of thing.
- **A small town's Commons category is its diaspora's family album.**
  `Category:Midyat` leads with a 1927 language map and early-20th-century
  studio portraits. Pin the sub-category that is actually the place
  (`cat:Midyat Guest House, Midyat`, `cat:Old town scenes, Midyat town`) and
  keep the broad one last as filler.
- ⚠️ **`tools/tripadvisor.mjs` resolves nothing any more**: maviapi's
  `tripadvisor/search?q=` answers `scrape_failed` for every term (checked
  2026-09-18). A new trip gets no ratings. Say so rather than hunting for a
  bug; the existing `ratings.js` rows were harvested while it worked.

### When the trip doesn't fit the site's assumptions, change the site, not the truth

Three of this run's edits were to shared files, and each one existed because a
hardcoded assumption would otherwise have put a wrong thing on the page. All
three kept the other trips byte-identical, which is the bar:

- **The currency toggle was £/€ in the markup.** A trip priced in lira
  rendered "£6 a head" next to prose saying "~370₺". Now a trip may declare
  `currencies: [{code, sym, rate}]` and `app.js` builds the buttons and the
  conversion from it; the default is the pair the site always had. Store the
  prices in euros still, and **derive the euro figures from the local ones**
  (370₺ → 6.6, not 7) so the chip and the prose agree after conversion.
- **The filter row was a fixed list** including Boat trips and Swimming. A
  road trip through the southeast does neither, and an empty filter is a
  promise the week can't keep. Now derived from the categories the days
  actually contain — same for the map legend in `trip-map.html`.
- **The two travellers' names were in `index.html`.** A trip with a rotating
  cast of four needs them per-trip, so they became `travellerAName` /
  `travellerAInitial` / `travellerADesc` (and B) in the packs. `izemDesc` and
  `ahmetDesc` were renamed to match.
- Smaller, same reason: the stays rail's £90-190 band and its two labels come
  from `stays.band` and i18n; a hotel with no published guest score gets no
  score chip rather than an invented one; a hotel with no live price for the
  dates says so; a city with no alternatives draws no alternatives card; and
  `stays.cities[].search` gives the pick's button a real dated search when no
  per-hotel deep link could be verified.

### Verify links before you ship them, and say when you couldn't

For Türkiye no bookable per-hotel deep link could be confirmed — obilet 403s
every URL shape. So the hotel **names** open Google Maps (always right, always
works) and the **button** opens an enuygun dated city search whose URL shape
was curl-tested for a 200 first: `enuygun.com/otel/bolge/<il>/` (Diyarbakır is
the exception, `/otel/yer/diyarbakir/`) with
`?checkInDate=DD.MM.YYYY&checkOutDate=DD.MM.YYYY&roomDetail=<pax>%7C<rooms>&p=search&country=TR`.
A page that says plainly "no deep link could be verified, phone and confirm"
is worth more than a guessed one that 404s on the day.
