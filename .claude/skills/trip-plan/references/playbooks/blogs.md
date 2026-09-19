# Playbook: blog-mining research

Techniques proven on real trips. Paste this into the blogs agent's prompt.
Last updated: 2026-09-18 (Güneydoğu/Türkiye; Gothenburg 2026-09-03; Mallorca 2026-08-15; Sicily 2026-08-04).

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

## Additions from the Gothenburg run (2026-09-03)

- **Swedish keywords were the whole game**: `pris`, `biljett`, `öppettider`,
  `höstlov`, `dras in`, `banarbete`, `strejk`, `bastu boka gratis`, `dagens
  lunch pris`, `räkmacka bästa <år>`. They surfaced trafiken.nu (the only dated
  rail-closure list), gp.se, menydags (lunch price medians), alltombastu,
  helahisingen and upplevelsebloggen — none of which appeared in English SERPs.
  The Italian/Spanish trick generalises: one local-language word per query.
- **curl beats WebFetch on `.se` hosts.** WebFetch returned `getaddrinfo
  ENOTFOUND` on ~8 Swedish domains (saabcarmuseum, kvillessaluhall,
  kulturnatta.goteborg.se, opera.se, framtidsfonster…) that `curl -A Mozilla`
  fetched fine; strip tags with a few lines of python and grep for
  `kr|öppet|Mån`. Try curl before declaring a Swedish site dead.
- **goteborg.com: guides fetch, places don't.** The visitor site's `/guides/`
  pages fetch fine; its `/places/` pages exceed WebFetch's 10 MB cap and
  `/events/` pages 403. Get event dates from the guides or the venue.
- **Look for a hidden opening-hours API before scraping a calendar widget.**
  `curl` the venue's calendar page and grep `api|Endpoint`: Liseberg exposed
  `/sv/api/opening-hours/?date=YYYY-MM-DD` (plain JSON, no auth, one day per
  call) — exact per-day hours for the trip window, better than any blog.
- **An image-only PDF is readable.** Varberg's kallbadhus site redirects to a
  scanned one-page PDF; the Read tool renders it and gave every price and hour
  (pdftotext returns nothing).
- **Official pages caught closures no blog knew**: the Saab museum shut for
  relocation, the Marstrand express bus withdrawn, a fortress café closed for
  the year. Close every run with `<sight> öppettider/pris <year>` on the
  official domain — blogs run 1–3 years behind on closures as well as prices.
- **Blog transport numbers were stale in every article** (35/36/37 SEK singles
  vs 38 real; a "24h 345" typo; a "day ticket 85" from 2020). Exactly as the
  rule above says — harvest names, verify numbers.
- Dead: thatsup.se/.co.uk (403), timecenter.se (JS booking app), Universeum
  prices (JS on every page; only the Citybreak shop renders them — see
  ground-activities.md).


## Additions from the Güneydoğu (Türkiye) run (2026-09-18)

**For any Turkish trip, read `turkiye-resmi-kaynaklar.md` FIRST and go to the state's own
endpoints before opening a single blog.** Turkey publishes museum hours, closed days, live
open/closed status, prices, road distances, tolls and fuel prices as scrapable official data.
This run got essentially every number from the state and used blogs only for restaurant names.

### 🔴 A blog's visible date is worthless. Date it by an internal fact.

The sharpest version of this rule yet. **`cokgezenadam.com` stamps every article
"Son güncelleme: 21.06.2026" regardless of when it was written.** Three articles fetched all
carried that date; all three were demonstrably ancient:
- the Batman–Mardin guide describes **Hasankeyf as not yet flooded** — the reservoir filled in **2020**;
- the Antakya guide lists **Hatay Arkeoloji Müzesi as open at 24 ₺** and künefe at **6–9 ₺** — pre-2018;
- the Adana guide quotes a **3 ₺** minibus fare.

**Date every blog by an internal fact — a dam, a price, a disaster — before trusting a word of its
status claims.** `serhatengul.com` by contrast stamps honestly and *per section*
(*"en son 2 Nisan 2025 tarihinde güncellenmiştir"*) — those are usable.

### The official-portal trap: guides fetch, place pages don't
- `kulturportali.gov.tr/turkiye/<il>/gezilecekyer/<slug>` returned the portal **homepage** every time.
  ⚠️ Worse: **its slug routing silently swaps provinces for same-named sights** — Mardin's Zinciriye
  Medresesi 301-redirects to Aksaray's. Treat it per-page, never uniformly.
- `<il>.ktb.gov.tr` provincial pages are navigation shells with slideshows and no text.
- `<il>.gov.tr` valilik pages can serve **pre-disaster boilerplate** presenting a closed museum as open.
- **But provincial valilik sites are the ONLY source for seasonal hours** — `hatay.gov.tr/muzeler`
  published the explicit "02 Ekim–14 Nisan (Kış Dönemi): 08:30–17:00" that the national system omits.
  So: don't budget many fetches here, but do check the valilik when the *season* matters.
- **Municipal sites can be the best source of all**: `midyat.bel.tr/kultur-lokasyonlari-calisma-saatleri`
  gave official opening hours for every cultural venue in the town, by name. Always try
  `<ilçe>.bel.tr` and `gezirehberi.<il>.bel.tr`.

### curl beats WebFetch on Turkish hosts, and TLS failures are not dead sites
WebFetch refuses `gaziantep.bel.tr` ("unable to verify the first certificate") and
`deyrulzafaran.org` (serves a cert for `www.maridin.com`); **`curl -k` gets both pages.** Several
`.gov.tr` hosts fetch fine with a desktop UA where WebFetch summarises the tables away — for
anything tabular, **curl and parse it yourself.**

### When you can't search, use sitemaps
`<blog>/post-sitemap.xml` is how you find real slugs once WebSearch is gone. **Every hand-guessed
URL 404'd; every URL taken from a sitemap worked.** Same for news outlets:
`sitemap/sitemap-YYYY-MM.xml`.

### Turkish price keywords that surfaced real figures
`güncel fiyatlar` · `ne yenir` · `kaç para` · `giriş ücreti` · `coğrafi işaret` (the protected-origin
registry is a *great* source for what a regional dish actually is — it settled that *harire* is a
dessert, not a soup, and gave the legal definition of Kilis tava).
🔴 **Never quote a pre-2024 Turkish lira price.** Inflation makes them meaningless. Say
"2023 price, now much higher" instead. Observed drift on this run alone: Antep beyran 300 ₺
(Dec 2025) → 370 ₺ (May 2026); a museum night supplement 100 ₺ (Jun 2025) → 200 ₺ (Aug 2026).
