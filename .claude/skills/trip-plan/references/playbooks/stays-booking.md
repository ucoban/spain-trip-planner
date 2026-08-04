# Playbook: Booking.com stays research

Techniques proven on real trips. Paste this into the stays agent's prompt.
Last updated: 2026-08-04 (Sicily trip).

## Tool order that works

1. **WebFetch on Booking.com: bot-walled.** Don't burn rounds on it beyond
   one try.
2. **maviapi cloak scraper (`mcp__plugin_maviapi_cloak__cloak_scrape`):
   returned `unauthorized` upstream as of 2026-08-04** (stale wrapper token
   on the Worker). Try it once — if unauthorized again, move on immediately
   and mention it in method notes (and if it works again, update this line).
3. **What actually worked: a real Chrome session via the chrome-devtools
   MCP tools** (`new_page` → `navigate_page` → `take_snapshot` /
   `get_page_text` pattern). Booking search-results pages render fully and
   carry live prices, scores, review counts, distances and cancellation
   flags right on the result cards — no need to open property pages for a
   shortlist.

## URL patterns

Search results, exact dates, filters in `nflt`:

```
https://www.booking.com/searchresults.en-gb.html?ss=<PLACE>&checkin=YYYY-MM-DD&checkout=YYYY-MM-DD&group_adults=2&no_rooms=1&group_children=0&selected_currency=GBP&nflt=review_score%3D80%3Bprice%3DGBP-60-150-1
```

- `nflt=review_score%3D80` → score 8.0+; combine filters with `%3B`.
- Price band filter shape: `price%3DGBP-<min>-<max>-1`.
- Property URLs: `https://www.booking.com/hotel/<cc>/<slug>.en-gb.html` —
  the `.en-gb.html` suffix keeps pages in English.
- **Gotcha: an ambiguous `ss=` + price filter can mis-resolve to 0
  results** (seen with `ss=Catania`). Use the fuller string
  (`ss=Catania%2C+Sicily%2C+Italy`); if a search returns 0, suspect the
  resolver before concluding "nothing available".

## Reading the result cards

- Headline price = total for the stay, cheapest room; "+ £X taxes and
  charges" is Booking's excluded-charges figure — record both.
- The free-cancellation flag on a card describes the **cheapest** rate;
  most properties also sell a flexible rate ~10–15% higher.
- Record the matched-property count per search — it's the sell-out-risk
  signal (Taormina 135 matches = tight; Catania 1,131 = slack).
- City tax (tassa di soggiorno in Italy) is usually paid at the property,
  often cash; note it separately, don't fold it into totals.

## Fast reliable sequence

One search URL per base (plus one per twin-town alternative), snapshot each
results page, take the top ~7 in-budget candidates from the cards, then
open only the pick's property page to confirm rate + cancellation. Run all
searches in one Chrome page, navigating between URLs.
