---
name: trip-plan
description: >-
  Research and draft a complete, bookable holiday plan for any destination and
  date range — real flights with booking deep links, a Booking.com hotel
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

- Home: Wigston, Leicester, UK. Airports by drive time: East Midlands EMA
  (~45 min), Birmingham BHX (~1h), Luton LTN (~1h45), Stansted STN (~2h),
  Manchester MAN (~2h). Prefer the closest airport that has a sensible route.
- Party: 2 adults, cabin bags only, budget-airline comfortable.
- Hotels: Booking.com, score 8.0+, target £60–150/night (stretch ~£180 in
  resort towns in high season), central or near station/beach, 1 room.
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

State the frame in one short paragraph to the user before launching agents,
so a wrong guess dies early.

## Step 2 — Spawn the research agents

Launch **five parallel background agents** in a single message, using the
prompt templates in `references/agent-prompts.md` with the placeholders
filled in:

1. **Flights** — real routes and dates, times, prices, deep links.
2. **Stays** — Booking.com shortlist per base, live prices if scrapeable.
3. **Vlogs** — 10+ YouTube vlogs mined for places, tips, prices, warnings.
4. **Blogs** — 10+ articles mined the same way.
5. **Ground transport + activities** — trains/buses with operators and
   prices, tours and sight tickets with bookable product links.

Each template already tells the agent to try WebFetch first and fall back to
the stealth scraper (`mcp__plugin_maviapi_cloak__cloak_scrape` via
ToolSearch) on bot-walled sites, and to return raw structured markdown, not
prose. Two additions the templates also carry:

- **Playbooks in, method notes out.** Before launching, read
  `references/playbooks/` and paste the matching playbook into each agent's
  prompt — it holds the techniques previous trips paid to discover (which
  sites bot-wall, which URL/query shapes return real data, scraper
  fallbacks that actually work). Every agent must end its report with a
  `## Method notes (reusable)` section; without it the knowledge dies with
  the agent.

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
   exact-dates search URL.
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
first. Offer — don't start — the follow-ups: wiring the plan into the site
(app.js/i18n.js/stays-data.js in both languages), or re-verifying prices
closer to booking day.
