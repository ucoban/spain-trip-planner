# Playbook: blog-mining research

Techniques proven on real trips. Paste this into the blogs agent's prompt.
Last updated: 2026-08-15 (Mallorca, 22 articles; Sicily 2026-08-04).

## The one rule that outranks everything else here

**Blogs are for places, tips and atmosphere — never for transport line numbers,
fares or opening hours.** They recycle dead data for years and read as current.
On the Mallorca run the articles collectively gave: a bus line to Valldemossa
that doesn't serve it, seven north-coast line numbers retired in 2019, a beach
shuttle that no longer exists, a train fare five euros stale, and a "free public
transport in 2026" headline that turns out to be residency-gated. Every one of
those reads as authoritative. **Harvest names and experiences from blogs, then
verify every number against the operator's own site or API** — and say in the
report which figures still need that check.

## Query shapes that work

- `one week in <region> without a car itinerary by train blog` — "without a
  car" + "blog" filters out tour-operator pages; yields personal
  itineraries with prices.
- Embed a concrete half-known fact plus "prices": `<beach> guide bus 806
  beach club prices` — surfaces logistics articles, not vibes.
- **Use one local-language keyword where prices matter** (Italian
  "lettini", "lido") — pulls local/expat sites with real euro figures that
  English-only queries miss. Best single trick of the Sicily run.
- `<place> day trip from <base> by train guide blog` — hands-on posts, not
  rail aggregators.
- `<sight> official ticket site <operator guess> price <year>` — reliably
  surfaces official ticketing pages that blogs never link.

## Skip on sight (SEO sludge)

rome2rio.com, Expedia/Kayak attraction pages, Tripadvisor review
permalinks, moovitapp.com landing pages, invented-"<year> prices" content
farms, GetYourGuide/Viator listings (price sanity-checks only, useless to
read).

## Local newspapers beat travel blogs for two specific things

Prices set by a council (beach loungers, taxi tariffs) and anything political
(protests, new restrictions) live in the **local press**, not in guides. The
Spanish-language price keyword trick surfaced Última Hora and Ara Balears,
which carried the only real sunbed figures — including the municipal 2026
tender rates — that English-only queries never found. Majorca Daily Bulletin
gave the protest story with dates, crowd numbers and organiser names, where
travel blogs gave vibes. Add a local-paper query to every run.

## Domains worth fetching first (Italy-proven; pattern generalizes)

alongdustyroads.com (prices/hours/exact bus stops), wearepalermo.com-style
local-run city sites (scam warnings, lido economics),
doeatbetterexperience.com (dish+address+€), goaskalocal.com ("local's
guide" series), thedirtypassport.com (per-club beach prices),
etnatracking.com / sicilyactive.com (specialist logistics sites — look for
the niche specialist for any signature excursion). Personal blogs with
hard numbers beat glossy magazines. Empty calories: villa-rental /
tour-operator content marketing (good place names, zero prices/hours).

## Blocking / workarounds

Most blogs and official .gov/.it pages fetch fine. On a 403, don't fight
it — the same SERP has 2–3 substitutable articles; substitute and move on.
Escalate to the cloak scraper or claude-in-chrome only for a truly unique
source.

## Fastest reliable sequence

1. Load WebSearch+WebFetch in one ToolSearch call.
2. Fire ALL topic searches as parallel blocks of 4 (itinerary-no-car /
   city guide per base / day trips / beaches+prices / food), each with
   "blog" + a concrete fact + a local-language price keyword.
3. Per SERP pick 1 personal blog + 1 local/expat site.
4. WebFetch in parallel blocks of 4 with a fixed extraction template:
   "exact title; every place by name; all prices; opening hours;
   transport lines/stops/durations; tips and warnings (heat, crowds,
   dress code, pickpockets, free vs paid beach); official URLs.
   Exhaustive, bullet points." Generic prompts return prose; this
   returns tables.
5. Finish with a parallel block of `<sight> official tickets <operator>
   price <year>` searches — blogs run 1–3 years stale on prices; expect
   conflicts and flag them for verification.
6. Budget ≈ 7 searches + 17 fetches in ~5 parallel tool blocks. Never
   fetch serially.
