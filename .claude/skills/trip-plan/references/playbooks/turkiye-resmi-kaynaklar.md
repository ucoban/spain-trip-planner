# Playbook: Türkiye — the official data layer

Last updated: 2026-09-18 (Güneydoğu / GAP run: Gaziantep–Urfa–Mardin–Diyarbakır–Nemrut–Maraş).

**Read this before any Turkish trip, and before `blogs.md`.** Turkey publishes almost everything a
trip plan needs — museum hours, closed days, live open/closed status, ticket prices, road distances,
tolls, fuel prices — as scrapable official data. The Turkish travel-blog internet is, by contrast,
almost entirely stale and will actively mislead you. **Go to the state first; use blogs only for names.**

## 1. `muze.gov.tr` — the province API. The single biggest unlock.

Every state museum and örenyeri in Turkey, with a **free-text status field** that exists nowhere
else on the internet. It is an ASP.NET MVC antiforgery-protected POST; no login needed.

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/131.0 Safari/537.36"
curl -s --compressed -c ck.txt -A "$UA" https://muze.gov.tr/muzeler -o mz.html
TOKEN=$(grep -oE 'name="__RequestVerificationToken"[^>]*value="[^"]+"' mz.html \
        | head -1 | sed 's/.*value="//;s/"//')
curl -s --compressed -b ck.txt -A "$UA" -X POST https://muze.gov.tr/Museums/GetSections \
  --data-urlencode "__RequestVerificationToken=$TOKEN" \
  --data-urlencode "provinceId=27" --data-urlencode "sections="
```

`provinceId` is the **plaka (number-plate) code**: Adana 1, Adıyaman 2, Diyarbakır 21, Gaziantep 27,
Hatay 31, K.Maraş 46, Mardin 47, Şanlıurfa 63, Batman 72, Kilis 79, Osmaniye 80.
Then `GET https://muze.gov.tr/muze-detay?SectionId=<SEC>&DistId=<DIST>` gives, verbatim:
**Açılış/Kapanış Saati · Gişe Kapanış Saati (last entry!) · Kapalı Günler · adres · telefon ·
MüzeKart geçerliliği · gece müzeciliği saatleri ve ek ücreti ·** and the free-text **`Durum:`** field.

That `Durum:` field is the whole game post-disaster. It is where
`"DEPREM SEBEBİYLE KAPALIDIR"`, `"Geçici olarak ziyarete kapalıdır"`,
`"TEMATİK TEŞHİR SALONU GEÇİCİ SÜRE İLE ZİYARETE KAPATILMIŞTIR"` and
`"(Ziyarete kapalıdır.)"` live.

### Three gotchas that cost real time
- **A wrong SectionId/DistId does NOT 404.** It 302s to a zero-byte response, or silently serves
  the museum-list page (~70,790 bytes). Brute-forcing codes gives false hits: `YSM01/MRK` is Hagia
  Sophia not Yesemek, `GRM01` is Göreme not Germanicia. **Never guess a code — use GetSections.**
- **`DistId` is usually `MRK` but not always** — Göbeklitepe `SGT01/SGT`, Zeugma Mozaik `GZN01/GZN`,
  Hatay `HTY01/HTY`, Şanlıurfa `SUM01,SUM02/SUM`.
- 🔴 **`Durum: AÇIK` is an ADMINISTRATIVE flag, not a live condition report.** Nemrut reads AÇIK all
  winter while its summit road is under 3 m of snow. **For any high-altitude or disaster-affected
  site, the ticketing status is not evidence the place is reachable.** The seasonal truth lives only
  in the Turkish warning prose and in dated news.
- `muze.gov.tr/sitemap.xml` is partial (61 URLs, made by a free generator). Useless as an index.
- E-bilet pages `urun-detay?CatalogNo=WEB-<SEC>-87-009` do **not** show prices — cart only.

## 2. DÖSİM national tariff — prices + a status column, one fetch

`https://dosim.ktb.gov.tr/TR-218202/muze-ve-oren-yeri-ucretleri.html`
One HTML table, ~366 rows: **İL | MÜZE/ÖRENYERİ | T.C. | Yabancı | DURUMU**.

🔴 **You MUST pass `--compressed`.** Without it curl gets a truncated 535 KB response that ends at
province **MUĞLA** — so Şanlıurfa, Osmaniye and everything N–Z silently vanish and the page looks
paginated. It is not; there is no pager. With `--compressed` you get the full 656 KB / 366 rows.
WebFetch also returns a lossy summary — parse the `<tr>`s yourself.

## 3. 🆕 The closure register — better than both, and the one most people miss

`https://kvmgm.ktb.gov.tr/TR-289637/gecici-sureyle-kapali-muzeler-ve-birimler.html`
Columns: **İL | MÜZE | KAPALI BÖLÜM | KAPANIŞ NEDENİ | KAPANIŞ TARİHİ | TAHMİNİ AÇILIŞ.**
It gives **the reason and the date**, and it catches sites the DÖSİM tariff omits entirely — which
is exactly how Gaziantep Kalesi (`Restorasyon | 6 Şubat 2023 | Çalışmalar Tamamlanana Kadar`)
slipped past a DÖSİM-only sweep. It also carries Nemrut's annual Aralık–Mart closure.

> **Use all three layers together: closure register (why and since when) → per-site `Durum`
> (current state) → DÖSİM tariff (price, coarse flag). Any one alone will mislead you.**
> They disagree on ~6 of 40 sites. **The per-site page wins**, and DÖSİM carries malformed legacy
> rows that read as live closures — one of them (`ŞANLIURFA E MOZAİK MÜZESİ`) nearly cost a trip
> its best museum. When they conflict, report the conflict and give the phone number.

## 4. 🔴 The Müzekart rule — Turkish citizens cannot buy single tickets

From the Ministry's own e-ticket engine: *"T.C. vatandaşları müze ve örenyerlerini **yalnızca
MüzeKart ile** ziyaret edebilirler."* So for a Turkish party, **every lira price for a state museum
is the wrong question** — the answer is always "Müzekart". Buy in the *Museums of Türkiye* app.

**Müzekart+ = 200 ₺** (raised 27 Jan 2026). İndirimli/Akademi 100 ₺, İlk Kartım 50 ₺,
**Müzekart'99 = 750 ₺** (a premium product — do **not** misread its e-ticket line as the standard card).
⚠️ **The tariff PDF linked off the live DÖSİM page is STALE** — it still showed 100 ₺ after the
January 2026 rise. *Lesson that generalises: "linked from the official page today" ≠ "current".
Cross-check any official PDF figure against a dated news story.*
Municipal museums (Büyükşehir-run: Gaziantep's Emine Göğüş, Hamam, Oyuncak, Panorama) sit **outside**
the Müzekart system and keep real lira prices — **carry cash for them.**
**Gece müzeciliği** (night opening) carries a **+200 ₺ supplement even for Müzekart holders** —
offered at Zeugma (19:00–21:00 daily), Şanlıurfa Müzesi + Haleplibahçe, and Nemrut (04:00–09:00).
*In a December trip with a 17:00 sunset, a night museum is a genuinely good use of an evening.*

## 5. 🔴 The winter-hours trap — applies to half of every Turkish plan

**`muze.gov.tr` publishes ONE set of hours per site and does not switch them for the season.**
Many museums show 18:45/19:00 closings that are summer values and will not be in force in winter.
Two official sources give the boundary and they disagree:

| Source | Winter period | Winter hours |
|---|---|---|
| `tastepeler.org` (Şanlıurfa/Taş Tepeler sites) | **24 Ekim – 1 Nisan** | **08:30–17:00**, gişe 16:30 |
| `hatay.gov.tr/muzeler` (Valilik) | **2 Ekim – 14 Nisan** | **08:30–17:00** |

**Assume 08:30–17:00 with the gişe shutting 16:30 for any winter date**, and find the *provincial*
source (Valilik or the project site) when the exact figure matters. Consequence worth writing into
the draft: a Turkish winter day has **one sightseeing block, ~08:30–16:30** — two museums plus a
driving leg, not three museums.

## 6. Roads, tolls, fuel

- **KGM distance spreadsheets** —
  `kgm.gov.tr/SiteCollectionDocuments/KGMdocuments/Root/Uzakliklar/ilmesafe.xlsx` (province matrix,
  57 KB) and **`ilcemesafe.xlsx` (district-to-district, 28 MB, ~1,007,013 rows** — `openpyxl` with
  `read_only=True`). Both stamped 03.03.2026. **Authoritative**, and it killed a brief's wrong
  "Diyarbakır–Kâhta 230 km" (real: 163). The page `Uzakliklar.aspx` shows nothing — grep the HTML
  for `.xlsx`.
  ⚠️ **But KGM can be wrong where geography changed**: its "Hasankeyf–Batman Havalimanı 39 km" is
  stale because the Ilısu reservoir drowned the old alignment (real: 57 km via "Eski D955").
  **Every pre-2020 Hasankeyf distance is systematically short.** Cross-check dam-affected regions.
- **OSRM for real geometry and marginal detour costs** —
  `router.project-osrm.org/route/v1/driving/LON,LAT;LON,LAT?overview=false&steps=true`, free, no key.
  Multi-waypoint URLs give per-leg splits, which is how a detour gets costed as *marginal* minutes
  rather than total. **Sanity-check every leg's implied speed**: OSRM is right on Turkish D-roads
  (65–80 km/h) and badly wrong on minor access roads. ⚠️ python `urllib` gets
  `SSLV3_ALERT_HANDSHAKE_FAILURE` on that host — curl to a file.
- **Tolls: KGM 2026 PDFs** under `.../OtoyolKopruUcret/2026Gecis_Ucret/`, listed on
  `UcretlerYeni.aspx`. `pdftotext -layout` — **the `-layout` flag is essential**, the matrices
  interleave into garbage without it. Every one ends *"01/01/2026 Saat 00:00'dan itibaren
  geçerlidir / Ücretlere KDV dahildir."* ⚠️ Filenames are not what you'd guess — grep the href.
  🔴 **Otoyols charge by station PAIR, not distance** — exiting and re-entering for a roadside sight
  can cost *more* than the through-run (Osmaniye exit: 45+65=110 ₺ vs 73 ₺ straight through).
  🔴 Much of eastern Turkey is **free bölünmüş yol, not otoyol** — only the O-52/O-53 system is tolled.
- **HGS**: hire cars carry a sticker; **confirm the balance is loaded at pickup** — a passing car
  with an empty tag records an *ihlal* and the rental firm's pass-through fine is many multiples of
  the toll. 15 days to settle; 15–45 days late = toll + penalty; **beyond 45 days = four times the toll.**
- **Winter tyres (kış lastiği)**: the mandate (KTK 65/A tebliğ) covers **commercial** passenger and
  goods vehicles — **privately-hired cars are legally exempt.** ⚠️ The window appears to have moved
  from **1 Aralık–1 Nisan** (base tebliğ text) to **15 Kasım–15 Nisan** (2026 reporting); the tebliğ
  PDF is the un-amended base text. Penalty **6,000 ₺** (2026). **Valiliks can apply it within a
  province and extend it a month either side** — check valilik announcements in late November.
  Chains do **not** substitute. Regardless of law: **ask the rental firm for kış lastiği in writing.**
- **Fuel**: `petrolofisi.com.tr/akaryakit-fiyatlari/<il>-akaryakit-fiyatlari` — prices render via JS
  but `curl` + regex `[0-9]{2,3}\.[0-9]{2}` on raw HTML works. Values come in
  **(KDV dahil, KDV hariç) pairs at exactly ×1.2** — use that to verify you parsed the right numbers.
  Regional spread across a whole trip is tiny (~0.5 ₺). **Prices move weekly — re-price near departure.**
- **Live conditions on the morning**: KGM Yol Durum Bülteni
  (`kgm.gov.tr/sayfalar/kgm/sitetr/yoldanisma/yoldurumbulteni.aspx`), `yol.kgm.gov.tr/guzergahanalizi`,
  MGM app for **buzlanma** and **sis** warnings.

## 7. Sun, prayer times, clocks

- **Turkey is permanently UTC+3 — no DST.** There is never a clock-change week to plan around.
- **Compute sun times, never search them.** ~30 lines of NOAA matched `api.sunrise-sunset.org` to
  2 minutes; `timeanddate` 403s everything. On this run the brief's assumed sunset was **20 minutes
  pessimistic**, which changed a day's shape. Add **~8–10 min per 2,000 m** of elevation for the
  visible sunset (depressed horizon).
- **Prayer times matter for mosque visits**: `api.aladhan.com` with `method=13` (Diyanet).
  A major mosque is effectively shut to sightseers ~30–40 min either side of **Öğle** and **İkindi** —
  in December those fall around 12:35 and 15:08, i.e. straight through the middle of a sightseeing day.

## 8. Flight *schedules* without fares

When the user says "don't look at tickets" but a day still hinges on a flight existing:
- `flightconnections.com/flights-from-<orig>-to-<dest>` (lowercase IATA — **the short form works;
  the long `flights-<city>-<iata>-to-...` form 404s**) gives airline, flight numbers, times,
  flights/week. ⚠️ **Its frequency counts can be wrong** — it said GZT–AYT was "4/week" when the
  route actually flew all seven days. It curls as 405 but WebFetches fine.
- **`uk.trip.com/flights/status-<flightno>/` is the truth** — a raw 7-day operating history with
  actual departure times. Derive the weekday pattern yourself from the date list.
- **maviapi `flightlist/search`** returns flight numbers and local times; filter `stops==0`, read
  `segments[]`. **Query seven consecutive dates** — a single date looks deterministic when the
  flight actually wanders by weekday (one Batman departure moved 20:00–22:05 across the week).
  Reverse origin/destination to get an **arrivals** board — on this run that was the single biggest
  lever on a day's shape (which morning arrival the party takes changed the day by two hours).
- Dead: `flightsfrom` 403, `airportinfo.live` DNS-dead this run.
- ⚠️ **Autumn runs must say so**: schedules read in September are the *summer* timetable. The winter
  timetable starts late October. Quote times ±30 min and tell the user to re-check in November.

## 9. Turkish-language search keywords that actually return data

`giriş ücreti` · `kış saati` · `ziyaret saatleri` · `açık mı` · `kapalı gün` · `restorasyon` ·
`deprem sonrası` · `yeniden açıldı` · `ibadete açıldı` · `Müzekart` · `yol durumu` · `kar` ·
`yol kapandı` · `tipi` · `nerede yenir` · `kaç saatte gezilir` · `otopark` · `güncel fiyatlar`.

**When WebSearch runs out — and it will —**
`news.google.com/rss/search?q=<urlencoded>&hl=tr&gl=TR&ceid=TR:tr` is plain XML, no bot wall, dated
Turkish headlines with outlet names. Article links are JS-obfuscated and won't resolve, but you
don't need them: take headline + date + outlet, then fetch that outlet's
`sitemap/sitemap-YYYY-MM.xml` or guess the slug. `search.brave.com` via curl is the best general
fallback but **rate-limits hard after ~4–6 queries** — space them out. DuckDuckGo, Bing, Ecosia,
Startpage and Yandex all served CAPTCHAs or **poisoned decoy results** (unrelated French/Chinese
content for specific Turkish queries) — never trust them unverified.

## 10. Post-disaster research — the rule this run was built on

After the 6 Feb 2023 earthquakes, **everything written before that date about Gaziantep, Kilis,
Hatay, Adıyaman, Kahramanmaraş, Malatya, Şanlıurfa, Diyarbakır, Adana and Osmaniye is suspect.**

- 🔴 **"Restorasyon tamamlandı" ≠ "ziyarete açıldı."** Gaziantep Kalesi's restoration was declared
  complete twice (10 Sep 2025, 3 Dec 2025) and the site still has not opened; four opening
  deadlines were missed in 2024–25. Only an *opening* story, or the Ministry's own status field, counts.
- 🔴 **A Tripadvisor ranking is not evidence a place is open.** Rumkale is Tripadvisor's **#2
  attraction in Gaziantep** (4.5, 330 reviews) and has been officially closed **since 18 April 2018**.
  Hatay Arkeoloji Müzesi is **#1 in Antakya** (4.7, 1,019 reviews) and has been shut since the
  earthquake. **Write this warning into the draft** — it is the single most transferable lesson.
- **Reopenings are announced and dated** — search `yeniden açıldı` / `ibadete açıldı` +
  the venue name, and check `aa.com.tr`, `trthaber`, Euronews Türkçe and the local press.
  A ministerial reopening ceremony is the most reliable "it is really open" signal available.
- **"Unverified post-quake status" is a finding, not a gap.** Say it in the draft and give the phone
  number. A confidently recommended museum that is a building site is the failure to avoid.
