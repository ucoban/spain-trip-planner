# Playbook: ground transport + activities research

Techniques proven on real trips. Paste this into the transport/activities
agent's prompt. Last updated: 2026-08-04 (Sicily trip; Italy-heavy — keep
the Italy specifics, they'll recur, but the tool order generalizes).

## Fetchability map

Worked with plain WebFetch:
- `https://www.thetrainline.com/en/train-times/<origin>-to-<destination>`
  (kebab-case station slugs, e.g. `palermo-centrale-to-taormina-giardini`)
  — static SEO pages with avg/fastest duration, trains/day, first/last
  departure, "from £X", operators. **Best single source for rail route
  facts in Europe without touching the operator's JS site.**
- Official bus/urban operator route pages (in Italy: SAIS
  `saisautolinee.it/en/sicily-tpl-lines-routes/<city>-<city>`, Interbus,
  ASM `asmtaormina.com/en/urban-transport/`, Prestia e Comandè
  `prestiaecomande.it/orari-e-linee/` — note prices often hide in PDFs;
  get the numbers via WebSearch instead).
- Official heritage-site ticket pages (Sicily:
  `parchiarcheologici.regione.sicilia.it/<park>/en/biglietti/<site>/`;
  foundations: federicosecondo.org — prices on the Italian
  `/costo-biglietto/` page; teatromassimo.it; monasterodeibenedettini.it;
  CoopCulture product pages).
- Recent-year local guide sites (search with the target year in the query)
  for airport buses/cable cars.

Bot-walled or dead — don't burn rounds: GetYourGuide product pages (403),
ticketone.it (timeout), operator journey-search pages with dynamic JS
(trenitalia.com search — never attempt; use Trainline static pages),
taorminatoday.com (401). Cloak scraper
(`mcp__plugin_maviapi_cloak__cloak_scrape`): unauthorized upstream as of
2026-08-04 — try once, then route around.

## GetYourGuide / Viator prices without scraping

1. WebSearch topic + "GetYourGuide <year>" → result titles carry the
   canonical product URL with its t-number (`...-t636956/`).
2. Prices come from fetchable affiliate mirrors that republish GYG
   products: happytovisit.com, theabroadguide.com, veronikasadventure.com,
   world-tourism.org (slug ≈ product title kebab-cased). Strip their
   `?partner_id=...` — report the clean
   `getyourguide.com/<location-lX>/<slug>-t<ID>/` URL.
3. No mirror → WebSearch the exact product name + "price"; snippets
   surface "$X per person".
4. Viator URLs (`viator.com/tours/<city>/<name>/d<geo>-<code>`) appear in
   search results with prices in snippets; no fetch needed.

## Gotchas that generalize

- Aggregators (Trainline/Omio/Busbud) quote USD/GBP with fees baked in —
  always restate the official EUR fare as ground truth.
- Official *index* ticket pages lag the per-site pages (exhibition
  surcharges); trust the per-site page, flag conflicts for verification.
- Seasonal fare jumps are common (cable cars, lidos) — prefer sources
  with the target year in title/URL.
- Regional/commuter trains with flat fares can't sell out — crowding is
  the only variable; reserved-seat (IC/AVE-type) economy tiers selling
  out IS the book-now signal.
- Italy August trips: search "franchigia estiva" + year — the late-July
  to early-Sept transport strike ban can zero out sciopero risk.
- **Event calendars: only the venue's own ticketing page counts.** Local
  news listings and festival blogs recycle previous years' line-ups, and
  they read as current. On the Sicily run three concerts sourced that way
  (taorminatoday, taorminaitalia) turned out not to exist on the trip's
  dates at all — the venue's TicketOne calendar showed the season ending
  two days before arrival, and one "sunrise concert" was a normal 21:00
  show ten days earlier. Never put a dated event in the plan on a
  secondary source: open the venue page, read the month, and if the page
  is JS-heavy, drive it with a real browser rather than downgrading to
  the blogs. "No event in our window" is a finding worth writing down —
  it stops the next reader re-researching it.
- Local-language searches surface official closure notices that English
  queries miss — do one caveat sweep in the local language.

## Fastest reliable sequence

(1) One parallel WebSearch batch (~6 queries, each topic + year);
(2) Trainline `train-times` pages for every rail pair;
(3) official operator route pages for EUR fares;
(4) official ticket pages for monuments;
(5) GYG/Viator via search-title t-numbers + mirror prices;
(6) local-language caveat sweep (closures, strikes, seasonal changes).
