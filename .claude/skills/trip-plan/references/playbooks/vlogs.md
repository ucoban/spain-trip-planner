# Playbook: YouTube vlog mining

Techniques proven on real trips. Paste this into the vlogs agent's prompt.
Last updated: 2026-09-18 (Güneydoğu/Türkiye, 31 videos; Gothenburg 2026-09-03; Mallorca 2026-08-15; Sicily 2026-08-04).

## Finding vlogs — query shapes

- Best shape: plain WebSearch with "youtube" as a keyword + year + one
  concrete detail: `Taormina travel vlog 2025 Isola Bella youtube`,
  `Mondello beach vlog youtube 2024 Palermo how to get bus 806`.
- Itineraries: `"<region>" vlog youtube "7 days" OR "one week" itinerary
  <year>` — quoted-phrase OR-chains work.
- `site:youtube.com` UNDERPERFORMS (engine substitutes GetYourGuide/TikTok
  results) — fallback only.
- Goldmine: a good channel's description links its whole regional series —
  always read descriptions for sibling videos (4 free vlogs from one).

## Fetching — what fails and what works

- WebFetch on `youtube.com/watch` FAILS (JS shell). Go straight to:
- `curl -sL -A "<Chrome UA>" -H "Accept-Language: en-US,en;q=0.9"
  "https://www.youtube.com/watch?v=<ID>&hl=en"` → ~1.4 MB HTML. Parse
  `var ytInitialPlayerResponse = {...}` (brace-match → JSON):
  `videoDetails.title/.author/.viewCount/.shortDescription`,
  `microformat.playerMicroformatRenderer.publishDate`. `shortDescription`
  often carries chapters, venue names, even Google Maps links.
- Transcripts: the page's timedtext `baseUrl` returns an empty body
  (PO-token gated) and transcript sites 403 — skip both. **Working path:**
  `pip install --user yt-dlp`, then
  `python3 -m yt_dlp --skip-download --write-auto-subs --sub-langs
  "en,en-orig" --extractor-args "youtube:player_client=android" -o
  "sub_%(id)s" <url>` — **`player_client=android` is the load-bearing
  trick** (web and ios clients both fail). Non-English videos: grab the
  auto-translate `en` track. Convert VTT→text with a dedupe (drop a line
  contained in the previous one), inject `[mm:00]` markers.
- ASR mangles proper nouns — flag uncertain venue names as [ASR] and
  cross-check against the description; never guess a spelling into the
  plan.

## Triage before spending a transcript download

From metadata alone: publishDate ≤3 years old; length 400–1600 s (under
~3 min = a short, over ~30 min = padding); views ≥ ~5k as a soft signal;
**a description with chapters / named venues / transport numbers predicts
a mineable transcript almost perfectly.** Affiliate-link-wall descriptions
predict scripted montages — still good for place lists, label them apart
from real person-on-camera vlogs (verdicts, prices, mistakes).

## Fastest reliable sequence

1. 4–6 parallel WebSearches (shapes above) → collect video IDs.
2. One curl+parse Bash loop over all IDs → metadata/descriptions → triage.
3. Mine sibling links from the best channels; fetch those too.
4. yt-dlp (android client) auto-subs for every keeper; read transcripts
   directly — a 15-min video ≈ 2,000 words; reading beats delegating.
5. Corroborate vlog prices/schedules with one plain WebSearch, note year
   next to every price (stale prices are the #1 vlog hazard).

## Description-only is a legitimate result, not a failure

Some keepers have no transcript at all — music-montage and walking-tour videos
genuinely ship without captions (yt-dlp says so explicitly). Don't retry: refetch
just `shortDescription` via the same curl+brace-match, use title/channel/date
plus the description, and **label the entry description-only** in the writeup.
On the Mallorca run 15 of 17 priority videos yielded subs; the 2 failures were
both caption-less montages, and 4 entries went in as description-only.

Keep the VTT→text converter as a small reusable script rather than re-deriving
it: drop any line contained in the previous one (auto-captions re-emit growing
partial lines), inject `[mm:00]` markers.

## Aggregation contract

Per vlog: title, channel, URL, year, places, tips, prices (with year),
warnings. Aggregate places-per-area with attribution, tips by category,
consensus = 2+ independent vlogs (3+ for load-bearing plan decisions).
Translate off-season crowd reports to the trip's actual season; say when
a data point wasn't covered and needs a blog-side check.

## Additions from the Gothenburg run (2026-09-03)

- **Playlists: use yt-dlp, not regex.** A channel's "all my X videos" link
  (often a bit.ly → resolve with `curl -sI`) is a playlist; `python3 -m yt_dlp
  --flat-playlist --print "%(id)s | %(title)s" <url>` lists it in one call. A
  regex over the playlist HTML found nothing. One channel gave 5 usable
  regional vlogs this way.
- **The android-client warnings are noise.** yt-dlp prints "GVS PO Token" and
  "impersonation" warnings and still downloads the subs — 17 of 21 attempts
  succeeded; the four failures were genuine caption-less montages.
- **Long videos: grep a keyword window, don't read.** A 77-minute theme-park
  vlog (13,700 words) gave up every practical fact in two passes of
  `wristband|£|queue|closed|ID` over the converted transcript.
- **A short's description can hold the timetable.** A 90-second Liseberg short
  carried the full month's opening-hours table in its description — descriptions
  of shorts are worth a curl even when the video itself is useless.
- **Seasonal vlogs are found by adjacent seasons, not by the season word.**
  "Gothenburg in October/autumn/rain vlog" is not a genre; the seasonal signal
  came from a November city vlog, January island vlogs and the Halloween
  theme-park vlogs. Search for the *event* (Halloween, Lights festival) and the
  *neighbouring months*.
- **New-in-the-last-two-years venues have no vlogs.** World of Volvo (opened
  2024) had zero coverage and the listicles still described the museum it
  replaced. When a headline venue is recent, don't spend searches on it — hand
  it to the blogs/official agent.
- **maviapi `tripadvisor/attractions?geo=` payload is nested**: `data` is
  `{location, attractions}` — index `data["attractions"]`, not `data[]`.
- Two `watch?v=` pages returned HTML with no `ytInitialPlayerResponse` on
  repeated tries; a private video does the same. Skip after two attempts.
- Reusable scripts from this run (`fetchmeta.py`, `vtt2txt.py`) lived in the
  session scratchpad — copy them into this folder if a future run wants them.


## Additions from the Güneydoğu (Türkiye) run (2026-09-18)

### ⛔ Don't spend WebSearch on YouTube discovery. Scrape YouTube's own results page.

This is the biggest change to this playbook. A whole 200-call session budget was burned and the
WebSearch results were consistently *worse* than going direct — it substituted TikTok discover
pages, Tripadvisor listicles and news wires for actual vlogs. Instead:

```bash
curl -sL -A "<Chrome UA>" -H "Accept-Language: tr-TR,tr;q=0.9" \
  "https://www.youtube.com/results?search_query=<urlencoded>&hl=tr&gl=TR"
```
Brace-match `var ytInitialData = {` and walk the JSON for every `videoRenderer`. Each one gives
**videoId, title, ownerText, publishedTimeText ("3 hafta önce"), lengthText and viewCountText in a
single call** — full triage data for ~16 videos per request with no metadata fetch needed.
**`&gl=<CC>&hl=<lang>` matters**: it returns that market's results. ~18 of these produced
essentially every good video of the run.

### The "güncel fiyatlar" genre — hunt for it by name

Searching `<city> güncel fiyatlar` / `<city> ne yenir <year>` surfaces a whole class of vloggers who
**state every price on camera**. One such channel supplied the price backbone for four cities.
Then `python3 -m yt_dlp --flat-playlist --print "%(id)s | %(title)s" "https://www.youtube.com/@<channel>/videos"`
gives their whole regional series in one call. ⚠️ `--flat-playlist` returns **English-translated
titles** and `NA` for upload_date/view_count — use it for IDs only, then curl each ID for real metadata.
*The generalisation: every language has a "current prices" vlog genre. Find its local name.*

### Turkish ASR mangles proper nouns brutally — and the description is the fix

Real damage from this run: *Xale Meheme → "Hale Mehemme"/"Heleme"*; *Erciyes Ocakbaşı → "ercs"/"Air
Jess"*; *Al Hayaal → "Alha"*. **A good vlogger's description carries a timestamped chapter list with
the venue names spelled correctly** — one channel's chapter lists single-handedly corrected three
names the ASR had destroyed. **Always fetch descriptions before trusting a transcript spelling.**

### Description-only is often the BEST result, not a fallback
One Adıyaman food vlog's description carried **five venues with full street addresses and itemised
prices** — better data than 38 minutes of transcript. A **17-second short** carried the entire
Nemrut practical briefing (season warning, what's at the top, walk times, where to stay) in its
description. **Always curl the description of a short.**

### Seasonal vlogs are found by the PUBLISH DATE, not the query — confirmed hard again
`kışın güneydoğu` returned nothing usable. All three December datapoints came from **noticing a
publish date** on a video whose title said nothing about winter — and one of them opened its
description with *"Bu video 2025 Aralık ayında çekilmiştir."*
🔴 **Read the first line of every description for a "filmed in X" disclaimer** — publish date and
shoot date routinely differ by 6+ months.

### News-agency channels are the authority for road and closure questions
İhlas, DHA, AA and local papers publish short, dated, factual clips on exactly the "is the road
shut" question no travel vlogger covers. **The Nemrut answer came from two of these, not a vlog.**

### Absence of evidence IS evidence — and it corroborates
**Zero November–March Nemrut visitor vlogs across ~60 results, against dozens from May–September.**
That pattern, stated explicitly, corroborated the official closure independently. Count the
seasonal distribution of what you find and say what it implies.

### Disambiguate place names before searching
⚠️ **There are two Nemruts.** `Nemrut Dağı kış kar` returns mostly **Nemrut Krater Gölü**
(Bitlis/Tatvan) — a different mountain, with its own genuine "kapatıldı" stories that read exactly
like the answer you want. Add the province, the district or the culture (`Adıyaman`, `Kahta`,
`Kommagene`) to every query. **Check the province on every result before believing it.**

### Misc
- Long videos: grep a keyword window, don't read. Turkish set that paid for itself:
  `lira|TL|fiyat|ödedik|tuttu|hesap|otopark|park et|kapalı|açılıyor|saat \d|müze kart|giriş ücret|tavsiye|pahalı|ucuz|deprem|konteyner|usta`.
  When the `.tr` track has no punctuation, sentence-splitting fails — fall back to a **word-window**
  extractor (±22 words around each hit, merging overlapping windows).
- yt-dlp `player_client=android` held at **31/32**. The PO-token warnings remain noise.
- WebFetch on a Google search URL returns a Google error page. Useless.
