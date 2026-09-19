/* Güneydoğu · the Çelik plan — the fifth trip, whole.
 *
 * Same shape as trip-mallorca.js: the skeleton is ids, times, categories and
 * per-person money; the words live once per language; the map keeps only
 * geometry. Registers itself into window.TRIPS and app.js / i18n.js /
 * trip-map.html read it when it is the one chosen (see trips.js).
 *
 * Four things make this one different in shape, and the data says so rather
 * than pretending otherwise:
 *
 *  — The cast rotates. Önder and Eren start on the 5th, Berk and Üsame land
 *    on the 8th, Eren flies out of Batman on the 9th, Berk out of Maraş on
 *    the 11th. Every day's words name who is actually in the car.
 *  — It is a self-drive: ~2,490 km of it. So `travel` stops carry no
 *    per-person fare — they carry distance, driving time and, where there is
 *    one, the toll for the car. The money is in the hire, the fuel and the
 *    three hotels, and all of that lives in the booking list.
 *  — Four of the eight nights are free: Ozan Kağan's house in İslahiye. Only
 *    three nights were ever researched, and `stays` holds exactly those.
 *  — Everything was priced in Turkish lira and is shown here in euros at
 *    **1 € = 55.9 ₺** (Frankfurter and open.er-api, both read 18 Sep 2026).
 *    Every price in the prose keeps its lira figure as well, because that is
 *    what will actually be handed over, and because Turkish inflation makes
 *    a euro conversion age faster than the lira it came from.
 *
 * What the price chip means here: what THIS party pays at the door. The four
 * of them carry Müzekart, so the state museums read "free" — Göbeklitepe,
 * Zeugma, the two Urfa museums, Hasankeyf, Perre, Maraş. The tariff those
 * cards buy past is in each stop's words. The ones Müzekart does not cover
 * (Panorama 60 ₺, Deyrulzafaran 100 ₺, the two municipal museums at 15 ₺) do
 * carry a price, because that is cash out of a pocket on the day.
 *
 * Sources are the state's own: muze.gov.tr's per-site pages for hours,
 * closed days and the free-text `Durum:` field, DÖSİM for tariffs, the
 * ministry's closed-units register for why and since when, KGM's official
 * district distance table (03.03.2026) for every kilometre and the 2026
 * toll tariff for every toll. Sunrise and sunset were computed, not searched.
 *
 * Researched 18 Sep 2026, 78 days before departure. Flight FARES were not
 * looked at — that was the brief. Flight EXISTENCE was, and one of the
 * requested flights turned out not to exist (k1).
 *
 * Loaded after trips.js and before i18n.js.
 */
window.TRIPS = window.TRIPS || {};
window.TRIPS.guneydogu = {

  // Everything was priced in lira, so lira is what the chip shows by default;
  // the euro is kept as the second option because that is the unit the rest of
  // the site's plans are in. Rate read 18 Sep 2026 — it will have moved.
  currencies: [
    { code: 'TRY', sym: '₺', rate: 55.9 },
    { code: 'EUR', sym: '€', rate: 1 }
  ],

  // — the skeleton ——————————————————————————————————————————————
  start: [2026, 11, 5],
  days: [
    { dom: '5', dot: 'var(--color-accent-5)', acts: [
      { id: 'gd1b1', t: '08:00', cat: 'travel', eur: null },
      { id: 'gd1b2', t: '08:45', cat: 'food', eur: 6.6 },
      { id: 'gd1b3', t: '10:00', cat: 'sights', eur: 0 },
      { id: 'gd1b4', t: '11:30', cat: 'sights', eur: 0 },
      { id: 'gd1b5', t: '12:35', cat: 'museum', eur: 0.5 },
      { id: 'gd1b6', t: '13:45', cat: 'sights', eur: 0 },
      { id: 'gd1b7', t: '14:30', cat: 'museum', eur: 1.1 },
      { id: 'gd1b8', t: '15:45', cat: 'museum', eur: 0 },
      { id: 'gd1b9', t: '17:45', cat: 'food', eur: 14.3 },
      { id: 'gd1b10', t: '19:15', cat: 'travel', eur: null },
      { id: 'gd1s1', t: '20:30', cat: 'stay', eur: null }
    ] },
    { dom: '6', dot: 'var(--color-accent-5)', acts: [
      { id: 'gd2b1', t: '06:10', cat: 'travel', eur: null },
      { id: 'gd2b2', t: '08:15', cat: 'food', eur: 8.1 },
      { id: 'gd2b3', t: '09:30', cat: 'sights', eur: 0 },
      { id: 'gd2b4', t: '10:50', cat: 'museum', eur: 0 },
      { id: 'gd2b5', t: '13:00', cat: 'food', eur: 15.2 },
      { id: 'gd2b6', t: '14:25', cat: 'sights', eur: 0 },
      { id: 'gd2b7', t: '15:40', cat: 'sights', eur: 0 },
      { id: 'gd2b8', t: '16:20', cat: 'travel', eur: null }
    ] },
    { dom: '7', dot: 'var(--color-accent-5)', acts: [
      { id: 'gd3b1', t: '07:00', cat: 'travel', eur: null },
      { id: 'gd3b2', t: '08:45', cat: 'food', eur: 7.2 },
      { id: 'gd3b3', t: '09:50', cat: 'museum', eur: 0 },
      { id: 'gd3b4', t: '11:20', cat: 'sights', eur: 0 },
      { id: 'gd3b5', t: '12:00', cat: 'museum', eur: 0 },
      { id: 'gd3b6', t: '13:30', cat: 'sights', eur: 0 },
      { id: 'gd3b7', t: '16:15', cat: 'sights', eur: 0 },
      { id: 'gd3b8', t: '17:05', cat: 'food', eur: 6.3 },
      { id: 'gd3b9', t: '18:15', cat: 'travel', eur: null }
    ] },
    { dom: '8', dot: 'linear-gradient(135deg, var(--color-accent-5) 50%, var(--color-accent-2) 50%)', acts: [
      { id: 'gd4b1', t: '08:25', cat: 'travel', eur: null },
      { id: 'gd4b2', t: '08:50', cat: 'travel', eur: null },
      { id: 'gd4b3', t: '11:20', cat: 'museum', eur: 0 },
      { id: 'gd4b4', t: '13:25', cat: 'food', eur: 6.3 },
      { id: 'gd4b5', t: '14:25', cat: 'museum', eur: 0 },
      { id: 'gd4b6', t: '16:10', cat: 'sights', eur: 0 },
      { id: 'gd4b7', t: '17:10', cat: 'food', eur: 1.8 },
      { id: 'gd4b8', t: '17:50', cat: 'sights', eur: 0 },
      { id: 'gd4b9', t: '18:20', cat: 'travel', eur: null },
      { id: 'gd4s1', t: '20:15', cat: 'stay', eur: null }
    ] },
    { dom: '9', dot: 'var(--color-accent-2)', acts: [
      { id: 'gd5b1', t: '08:00', cat: 'sights', eur: 0 },
      { id: 'gd5b2', t: '10:45', cat: 'sights', eur: 1.8 },
      { id: 'gd5b3', t: '12:00', cat: 'travel', eur: null },
      { id: 'gd5b4', t: '13:00', cat: 'sights', eur: 1.3 },
      { id: 'gd5b5', t: '14:40', cat: 'travel', eur: null },
      { id: 'gd5b6', t: '15:25', cat: 'sights', eur: 0 },
      { id: 'gd5b7', t: '17:30', cat: 'travel', eur: null },
      { id: 'gd5b8', t: '18:45', cat: 'travel', eur: null },
      { id: 'gd5s1', t: '20:05', cat: 'stay', eur: null }
    ] },
    { dom: '10', dot: 'var(--color-accent-2)', acts: [
      { id: 'gd6b1', t: '07:45', cat: 'food', eur: 5.4 },
      { id: 'gd6b2', t: '08:45', cat: 'sights', eur: 0 },
      { id: 'gd6b3', t: '11:15', cat: 'museum', eur: 0 },
      { id: 'gd6b4', t: '12:05', cat: 'food', eur: 7.5 },
      { id: 'gd6b5', t: '13:00', cat: 'travel', eur: null },
      { id: 'gd6b6', t: '15:40', cat: 'sights', eur: 0 },
      { id: 'gd6b7', t: '16:20', cat: 'sights', eur: 0 },
      { id: 'gd6b8', t: '17:00', cat: 'travel', eur: null },
      { id: 'gd6s1', t: '17:40', cat: 'stay', eur: null }
    ] },
    { dom: '11', dot: 'var(--color-accent-2)', acts: [
      { id: 'gd7b1', t: '08:30', cat: 'sights', eur: 0 },
      { id: 'gd7b2', t: '09:30', cat: 'sights', eur: 0 },
      { id: 'gd7b3', t: '10:00', cat: 'food', eur: 1.3 },
      { id: 'gd7b4', t: '10:45', cat: 'travel', eur: null },
      { id: 'gd7b5', t: '13:00', cat: 'sights', eur: 0 },
      { id: 'gd7b6', t: '14:30', cat: 'museum', eur: 0 },
      { id: 'gd7b7', t: '15:40', cat: 'sights', eur: 0 },
      { id: 'gd7b8', t: '17:00', cat: 'food', eur: 3.6 },
      { id: 'gd7b9', t: '17:45', cat: 'food', eur: 5.4 },
      { id: 'gd7b10', t: '19:00', cat: 'travel', eur: null },
      { id: 'gd7b11', t: '19:15', cat: 'travel', eur: null }
    ] },
    { dom: '12', dot: 'var(--color-neutral-500)', acts: [
      { id: 'gd8b1', t: '09:15', cat: 'travel', eur: null },
      { id: 'gd8b2', t: '09:45', cat: 'sights', eur: 0 },
      { id: 'gd8b3', t: '11:15', cat: 'travel', eur: null },
      { id: 'gd8b4', t: '11:45', cat: 'food', eur: 8.9 },
      { id: 'gd8b5', t: '12:50', cat: 'travel', eur: null },
      { id: 'gd8b6', t: '14:15', cat: 'travel', eur: null }
    ] }
  ],

  bookings: ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'],

  maps: {
    gd1b1: 'Gaziantep Havalimanı',
    gd1b2: 'Metanet Lokantası, Kozluca Caddesi, Gaziantep',
    gd1b3: 'Bakırcılar Çarşısı, Gaziantep',
    gd1b4: 'Zincirli Bedesten, Gaziantep',
    gd1b5: 'Emine Göğüş Mutfak Müzesi, Gaziantep',
    gd1b6: 'Kurtuluş Camii, Gaziantep',
    gd1b7: 'Panorama 25 Aralık Müzesi, Gaziantep',
    gd1b8: 'Zeugma Mozaik Müzesi, Gaziantep',
    gd1b9: 'İmam Çağdaş, Gaziantep',
    gd1b10: 'İslahiye, Gaziantep',
    gd1s1: 'İslahiye, Gaziantep',
    gd2b1: 'İslahiye, Gaziantep',
    gd2b2: 'Kazancılar Çarşısı, Seyhan, Adana',
    gd2b3: 'Taşköprü, Adana',
    gd2b4: 'Adana Müzesi, Seyhan',
    gd2b5: 'Kaya Kebap, Adana',
    gd2b6: 'Sabancı Merkez Camii, Adana',
    gd2b7: 'Yılankale, Ceyhan, Adana',
    gd2b8: 'İslahiye, Gaziantep',
    gd3b1: 'Antakya, Hatay',
    gd3b2: 'Antakya Gastronomi Çarşısı, Hatay',
    gd3b3: 'Necmi Asfuroğlu Arkeoloji Müzesi, Antakya',
    gd3b4: 'Habib-i Neccar Camii, Antakya',
    gd3b5: 'St. Pierre Kilisesi, Antakya',
    gd3b6: 'Titus Tüneli, Çevlik, Samandağ',
    gd3b7: 'İskenderun Sahili, Hatay',
    gd3b8: 'İskenderun, Hatay',
    gd3b9: 'İslahiye, Gaziantep',
    gd4b1: 'Gaziantep Havalimanı',
    gd4b2: 'Şanlıurfa',
    gd4b3: 'Göbeklitepe, Şanlıurfa',
    gd4b4: 'Şanlıurfa',
    gd4b5: 'Şanlıurfa Arkeoloji Müzesi',
    gd4b6: 'Balıklıgöl, Şanlıurfa',
    gd4b7: 'Gümrük Hanı, Şanlıurfa',
    gd4b8: 'Sipahi Pazarı, Şanlıurfa',
    gd4b9: 'Mardin',
    gd4s1: 'Ramada Plaza by Wyndham Mardin',
    gd5b1: 'Mardin Ulu Camii',
    gd5b2: 'Deyrulzafaran Manastırı, Mardin',
    gd5b3: 'Midyat, Mardin',
    gd5b4: 'Midyat Devlet Konuk Evi',
    gd5b5: 'Hasankeyf, Batman',
    gd5b6: 'Hasankeyf Kalesi, Batman',
    gd5b7: 'Batman Havalimanı',
    gd5b8: 'Diyarbakır',
    gd5s1: 'Turistik Palas Otel, Diyarbakır',
    gd6b1: 'Hasan Paşa Hanı, Diyarbakır',
    gd6b2: 'Diyarbakır Surları',
    gd6b3: 'Diyarbakır Arkeoloji Müzesi',
    gd6b4: 'Ciğerci Neşet, Diyarbakır',
    gd6b5: 'Kâhta, Adıyaman',
    gd6b6: 'Cendere Köprüsü, Kâhta',
    gd6b7: 'Karakuş Tümülüsü, Kâhta',
    gd6b8: 'Adıyaman',
    gd6s1: 'Adıyaman Park Hotel',
    gd7b1: 'Perre Antik Kenti, Adıyaman',
    gd7b2: 'Musalla Camii, Adıyaman',
    gd7b3: 'Şahinbey Çarşısı, Adıyaman',
    gd7b4: 'Kahramanmaraş',
    gd7b5: 'Kahramanmaraş Kalesi',
    gd7b6: 'Kahramanmaraş Müzesi',
    gd7b7: 'Kahramanmaraş Kapalı Çarşı',
    gd7b8: 'Emek Pastanesi, Kahramanmaraş',
    gd7b9: 'Kahramanmaraş',
    gd7b10: 'Kahramanmaraş Havalimanı',
    gd7b11: 'İslahiye, Gaziantep',
    gd8b1: 'Yesemek, İslahiye',
    gd8b2: 'Yesemek Açık Hava Müzesi ve Heykel Atölyesi',
    gd8b3: 'İslahiye, Gaziantep',
    gd8b4: 'İslahiye, Gaziantep',
    gd8b5: 'Gaziantep Havalimanı',
    gd8b6: 'Gaziantep Havalimanı'
  },

  // The day's centre of gravity, for the stops the table above doesn't know.
  mapCity: ['Gaziantep', 'Adana', 'Antakya', 'Şanlıurfa', 'Mardin', 'Diyarbakır', 'Kahramanmaraş', 'Gaziantep'],

  places: {
    'Gaziantep': 'Gaziantep',
    'Antep': 'Gaziantep',
    'Zeugma': 'Zeugma Mozaik Müzesi, Gaziantep',
    'Zeugma Mozaik Müzesi': 'Zeugma Mozaik Müzesi, Gaziantep',
    'Bakırcılar Çarşısı': 'Bakırcılar Çarşısı, Gaziantep',
    'Almacı Pazarı': 'Almacı Pazarı, Gaziantep',
    'Zincirli Bedesten': 'Zincirli Bedesten, Gaziantep',
    'Gaziantep Kalesi': 'Gaziantep Kalesi',
    'Emine Göğüş': 'Emine Göğüş Mutfak Müzesi, Gaziantep',
    'Panorama': 'Panorama 25 Aralık Müzesi, Gaziantep',
    'Ömeriye Camii': 'Ömeriye Camii, Gaziantep',
    'Kurtuluş Camii': 'Kurtuluş Camii, Gaziantep',
    'İmam Çağdaş': 'İmam Çağdaş, Gaziantep',
    'İslahiye': 'İslahiye, Gaziantep',
    'Yesemek': 'Yesemek Açık Hava Müzesi ve Heykel Atölyesi',
    'Adana': 'Adana',
    'Kazancılar': 'Kazancılar Çarşısı, Seyhan, Adana',
    'Taşköprü': 'Taşköprü, Adana',
    'Adana Müzesi': 'Adana Müzesi, Seyhan',
    'Adana Müze Kompleksi': 'Adana Müzesi, Seyhan',
    'Sabancı Merkez Camii': 'Sabancı Merkez Camii, Adana',
    'Yılankale': 'Yılankale, Ceyhan, Adana',
    'Kastabala': 'Kastabala Örenyeri, Osmaniye',
    'Karatepe': 'Karatepe-Aslantaş Açık Hava Müzesi, Osmaniye',
    'Antakya': 'Antakya, Hatay',
    'Hatay': 'Antakya, Hatay',
    'Necmi Asfuroğlu': 'Necmi Asfuroğlu Arkeoloji Müzesi, Antakya',
    'Habib-i Neccar': 'Habib-i Neccar Camii, Antakya',
    'St. Pierre': 'St. Pierre Kilisesi, Antakya',
    'Titus Tüneli': 'Titus Tüneli, Çevlik, Samandağ',
    'Çevlik': 'Çevlik, Samandağ, Hatay',
    'Samandağ': 'Samandağ, Hatay',
    'İskenderun': 'İskenderun, Hatay',
    'Payas': 'Sokullu Mehmet Paşa Külliyesi, Payas',
    'Kilis': 'Kilis',
    'Şanlıurfa': 'Şanlıurfa',
    'Urfa': 'Şanlıurfa',
    'Göbeklitepe': 'Göbeklitepe, Şanlıurfa',
    'Karahantepe': 'Karahantepe, Şanlıurfa',
    'Balıklıgöl': 'Balıklıgöl, Şanlıurfa',
    'Haleplibahçe': 'Haleplibahçe Mozaik Müzesi, Şanlıurfa',
    'Şanlıurfa Arkeoloji Müzesi': 'Şanlıurfa Arkeoloji Müzesi',
    'Gümrük Hanı': 'Gümrük Hanı, Şanlıurfa',
    'Harran': 'Harran, Şanlıurfa',
    'Viranşehir': 'Viranşehir, Şanlıurfa',
    'Mardin': 'Mardin',
    'Zinciriye Medresesi': 'Zinciriye Medresesi, Mardin',
    'Kırklar Kilisesi': 'Kırklar Kilisesi, Mardin',
    'Deyrulzafaran': 'Deyrulzafaran Manastırı, Mardin',
    'Kasımiye Medresesi': 'Kasımiye Medresesi, Mardin',
    'Midyat': 'Midyat, Mardin',
    'Mor Gabriel': 'Mor Gabriel Manastırı, Midyat',
    'Hasankeyf': 'Hasankeyf, Batman',
    'Zeynel Bey Türbesi': 'Zeynel Bey Türbesi, Hasankeyf',
    'Batman': 'Batman',
    'Diyarbakır': 'Diyarbakır',
    'Sur': 'Diyarbakır Surları',
    'Diyarbakır Ulu Camii': 'Diyarbakır Ulu Camii',
    'Hasan Paşa Hanı': 'Hasan Paşa Hanı, Diyarbakır',
    'Surp Giragos': 'Surp Giragos Ermeni Kilisesi, Diyarbakır',
    'On Gözlü Köprü': 'On Gözlü Köprü, Diyarbakır',
    'Kâhta': 'Kâhta, Adıyaman',
    'Nemrut': 'Nemrut Dağı, Adıyaman',
    'Nemrut Dağı': 'Nemrut Dağı, Adıyaman',
    'Cendere Köprüsü': 'Cendere Köprüsü, Kâhta',
    'Karakuş Tümülüsü': 'Karakuş Tümülüsü, Kâhta',
    'Arsameia': 'Arsameia, Eski Kâhta',
    'Yeni Kale': 'Yeni Kale, Kâhta',
    'Adıyaman': 'Adıyaman',
    'Perre': 'Perre Antik Kenti, Adıyaman',
    'Kahramanmaraş': 'Kahramanmaraş',
    'Maraş': 'Kahramanmaraş',
    'Kahramanmaraş Kalesi': 'Kahramanmaraş Kalesi',
    'Emek Pastanesi': 'Emek Pastanesi, Kahramanmaraş'
  },

  // — where we sleep ————————————————————————————————————————————
  // Only three nights were ever researched: the other four are Ozan Kağan's
  // house in İslahiye and the last night nobody sleeps anywhere. Prices are
  // lira read live on 18 Sep 2026 from obilet and enuygun, shown here in
  // euros at 55.9 ₺; `night` is the whole booking for that night, because the
  // party is four people on the 8th and three on the 9th and 10th.
  stays: {
    band: { lo: 50, hi: 260, stripe: [75, 200] },
    cities: [
      { key: 'mar', nights: 1, q: '',
        search: 'https://www.enuygun.com/otel/bolge/mardin/?checkInDate=08.12.2026&checkOutDate=09.12.2026&roomDetail=4%7C2&p=search&country=TR',
        pick: { id: 'ramada', name: 'Ramada Plaza by Wyndham Mardin',
          url: 'https://www.google.com/maps/search/?api=1&query=Ramada+Plaza+by+Wyndham+Mardin',
          area: 'Yenişehir · Mardin-Midyat yolu', km: 2.6, score: null, rev: null, loc: null,
          total: 186, tax: 0, night: 186, was: null, cancel: false, payLater: false },
        alts: [
          { id: 'yukselhan', name: 'Yükselhan Hotel, Viranşehir', url: 'https://www.google.com/maps/search/?api=1&query=Y%C3%BCkselhan+Hotel+Viran%C5%9Fehir', area: 'Viranşehir · D400 üstünde', km: 1.3, score: null, rev: null, loc: null, total: 129, tax: 0, night: 129, was: null, cancel: true, payLater: false },
          { id: 'carra', name: 'CARRA Konağı', url: 'https://www.google.com/maps/search/?api=1&query=Carra+Kona%C4%9F%C4%B1+Mardin', area: 'Eski Mardin · konak', km: 0.3, score: 9.0, rev: 560, loc: null, total: null, tax: 0, night: null, was: null, cancel: false, payLater: false },
          { id: 'maristan', name: 'Maristan Hotel', url: 'https://www.google.com/maps/search/?api=1&query=Maristan+Hotel+Mardin', area: 'Eski Mardin', km: 0.4, score: 9.1, rev: 168, loc: null, total: null, tax: 0, night: null, was: null, cancel: false, payLater: false },
          { id: 'minessa', name: 'Minessa Konağı', url: 'https://www.google.com/maps/search/?api=1&query=Minessa+Kona%C4%9F%C4%B1+Mardin', area: 'Eski Mardin · kendi otoparkı', km: 0.5, score: null, rev: null, loc: null, total: null, tax: 0, night: null, was: null, cancel: false, payLater: false },
          { id: 'tella', name: 'Tella Otel, Viranşehir', url: 'https://www.google.com/maps/search/?api=1&query=Tella+Otel+Viran%C5%9Fehir', area: 'Viranşehir merkez', km: 0.6, score: 8.2, rev: 529, loc: null, total: null, tax: 0, night: null, was: null, cancel: false, payLater: false }
        ] },
      { key: 'dib', nights: 1, q: '',
        search: 'https://www.enuygun.com/otel/yer/diyarbakir/?checkInDate=09.12.2026&checkOutDate=10.12.2026&roomDetail=3%7C1&p=search&country=TR',
        pick: { id: 'turistik', name: 'Turistik Palas Otel',
          url: 'https://www.google.com/maps/search/?api=1&query=Turistik+Palas+Otel+Diyarbak%C4%B1r',
          area: 'Sur · kapalı garaj + vale', km: 0.4, score: null, rev: null, loc: null,
          total: 244, tax: 0, night: 244, was: null, cancel: false, payLater: false },
        alts: [] },
      { key: 'adi', nights: 1, q: '',
        search: 'https://www.enuygun.com/otel/bolge/adiyaman/?checkInDate=10.12.2026&checkOutDate=11.12.2026&roomDetail=3%7C1&p=search&country=TR',
        pick: { id: 'adipark', name: 'Adıyaman Park Hotel',
          url: 'https://www.google.com/maps/search/?api=1&query=Ad%C4%B1yaman+Park+Hotel',
          area: 'Adıyaman merkez · üç kişilik oda', km: 0.8, score: 9.6, rev: 864, loc: null,
          total: 76, tax: 0, night: 76, was: null, cancel: false, payLater: false },
        alts: [
          { id: 'whitestar', name: 'White Star Hotel · 1 triple', url: 'https://www.google.com/maps/search/?api=1&query=White+Star+Hotel+Ad%C4%B1yaman', area: 'Adıyaman merkez · otopark', km: 1.0, score: null, rev: null, loc: null, total: 110, tax: 0, night: 110, was: null, cancel: false, payLater: false },
          { id: 'whitestar2', name: 'White Star Hotel · 2 oda', url: 'https://www.google.com/maps/search/?api=1&query=White+Star+Hotel+Ad%C4%B1yaman', area: 'Adıyaman merkez · otopark', km: 1.0, score: null, rev: null, loc: null, total: 147, tax: 0, night: 147, was: null, cancel: true, payLater: false },
          { id: 'kommagene', name: 'Kommagene Hotel, Kâhta', url: 'https://www.google.com/maps/search/?api=1&query=Kommagene+Hotel+K%C3%A2hta', area: 'Kâhta · 1 oda / 3 kişi', km: 34, score: 9.6, rev: 1285, loc: null, total: 72, tax: 0, night: 72, was: null, cancel: false, payLater: false },
          { id: 'dedeman', name: 'Park Dedeman Adıyaman · 1 triple', url: 'https://www.google.com/maps/search/?api=1&query=Park+Dedeman+Ad%C4%B1yaman', area: 'Adıyaman merkez · otopark', km: 1.4, score: null, rev: null, loc: null, total: 134, tax: 0, night: 134, was: null, cancel: false, payLater: false },
          { id: 'euphrat', name: 'Hotel Euphrat Nemrut, Kâhta', url: 'https://www.google.com/maps/search/?api=1&query=Hotel+Euphrat+Nemrut+K%C3%A2hta', area: 'Kâhta · ücretsiz iptal', km: 34, score: null, rev: null, loc: null, total: 114, tax: 0, night: 114, was: null, cancel: true, payLater: false },
          { id: 'rabat', name: 'Rabat Resort', url: 'https://www.google.com/maps/search/?api=1&query=Rabat+Resort+Ad%C4%B1yaman', area: 'Adıyaman kırsalı · düğün salonu', km: 9, score: 5.3, rev: null, loc: null, total: 95, tax: 0, night: 95, was: null, cancel: false, payLater: false }
        ] }
    ]
  },

  // — the map ———————————————————————————————————————————————————
  map: {
    route: 'Gaziantep → Şanlıurfa → Mardin → Diyarbakır → Adıyaman → Kahramanmaraş',
    // Dashed arcs are the four flights that bracket the week: two in to
    // Gaziantep, Eren out of Batman, and the Saturday pair out of Gaziantep.
    arcs: [
      [[40.8943, 29.3118], [37.0168, 37.4320], 1.8],
      [[37.9290, 41.1166], [40.8943, 29.3118], -2.2],
      [[37.0168, 37.4320], [36.8999, 30.7982], 1.4]
    ],
    // Solid sage is the car: the three days out of İslahiye, then the long
    // eastern run and the loop back through Kommagene and Maraş.
    lines: [
      [[37.0168, 37.4320], [37.0628, 37.3793], [37.1700, 36.7300], [37.0307, 36.6367]],
      [[37.0307, 36.6367], [37.1700, 36.7300], [37.0700, 36.2500], [36.9864, 35.3253], [37.0149, 35.7478], [37.0700, 36.2500], [37.0307, 36.6367]],
      [[37.0307, 36.6367], [36.6500, 36.3000], [36.2026, 36.1641], [36.1223, 35.9286], [36.2026, 36.1641], [36.5902, 36.1710], [36.6900, 36.2200], [37.0307, 36.6367]],
      [[37.0628, 37.3793], [37.0100, 37.7900], [37.0300, 37.9800], [37.1591, 38.7969], [37.2234, 38.9206], [37.1591, 38.7969], [37.2329, 39.7620], [37.3268, 40.7536]],
      [[37.3268, 40.7536], [37.3126, 40.7353], [37.4153, 41.3733], [37.7305, 41.4161], [37.9290, 41.1166], [37.9162, 40.2364]],
      [[37.9162, 40.2364], [37.7500, 39.3200], [37.7861, 38.6217], [37.9329, 38.6085], [37.7861, 38.6217], [37.7894, 38.3141], [37.7800, 37.6300], [37.4900, 37.3000], [37.5858, 36.9371], [37.3900, 36.8500], [37.0307, 36.6367], [37.0628, 37.3793]]
    ],
    // Six labels, not eight: at the zoom the whole route needs, İslahiye sits
    // on top of Gaziantep and Adıyaman on top of Kâhta's pins. They are both
    // still on the map as stops.
    cities: [
      { ll: [40.8943, 29.3118], label: 'İstanbul SAW', longKey: 'sawLong', dir: 'left' },
      { ll: [37.0628, 37.3793], label: 'Gaziantep', longKey: 'gztLong', dir: 'left', smallDir: 'left' },
      { ll: [37.1591, 38.7969], label: 'Şanlıurfa', longKey: 'urfLong', dir: 'left' },
      { ll: [37.3126, 40.7353], label: 'Mardin', longKey: 'marLong', dir: 'right' },
      { ll: [37.9162, 40.2364], label: 'Diyarbakır', longKey: 'dibLong', dir: 'right' },
      { ll: [36.8999, 30.7982], label: 'Antalya', longKey: 'aytLong', dir: 'left' }
    ],
    // [lat, lng, cat, spot key, day number, time, also-on-day]
    spots: [
      [37.0756, 37.3856, 'sights', 'zeugma', 1, '15:45'],
      [37.0623, 37.3864, 'sights', 'bakircilar', 1, '10:00'],
      [37.0665, 37.3832, 'sights', 'antepkale', 1, '11:30'],
      [37.0635, 37.3852, 'food', 'antepkebap', 1, '17:45'],
      [36.9840, 35.3329, 'sights', 'taskopru', 2, '09:30'],
      [36.9951, 35.3131, 'sights', 'adanamuze', 2, '10:50'],
      [36.9917, 35.3341, 'sights', 'sabanci', 2, '14:25'],
      [37.0149, 35.7478, 'sights', 'yilankale', 2, '15:40'],
      [36.9848, 35.3310, 'fiesta', 'ciger', 2, '08:15'],
      [36.2298, 36.1672, 'food', 'gastronomi', 3, '08:45'],
      [36.2074, 36.1638, 'sights', 'asfuroglu', 3, '09:50'],
      [36.2015, 36.1655, 'sights', 'habibneccar', 3, '11:20'],
      [36.1223, 35.9286, 'sights', 'titus', 3, '13:30'],
      [36.5902, 36.1710, 'sights', 'iskenderun', 3, '16:15'],
      [37.2234, 38.9206, 'sights', 'gobekli', 4, '11:20'],
      [37.1537, 38.7823, 'sights', 'urfamuze', 4, '14:25'],
      [37.1477, 38.7846, 'sights', 'balikligol', 4, '16:10'],
      [37.3268, 40.7536, 'stay', 'stayramada', 4, '20:15'],
      [37.3127, 40.7393, 'sights', 'eskimardin', 5, '08:00'],
      [37.2994, 40.7928, 'sights', 'deyrulzafaran', 5, '10:45'],
      [37.4177, 41.3766, 'sights', 'midyat', 5, '13:00'],
      [37.7106, 41.4089, 'sights', 'hasankeyf', 5, '15:25'],
      [37.9127, 40.2374, 'food', 'hasanpasa', 6, '07:45'],
      [37.9125, 40.2362, 'sights', 'surlar', 6, '08:45'],
      [37.9329, 38.6085, 'sights', 'cendere', 6, '15:40'],
      [37.8693, 38.5879, 'sights', 'karakus', 6, '16:20'],
      [37.7924, 38.3018, 'sights', 'perre', 7, '08:30'],
      [37.5872, 36.9254, 'sights', 'maraskale', 7, '13:00'],
      [37.5833, 36.9276, 'fiesta', 'dondurma', 7, '17:00'],
      [36.9048, 36.7426, 'sights', 'yesemek', 8, '09:45']
    ],
    views: {
      'v-all': { bounds: [[38.250, 35.150], [35.950, 41.650]], pad: 34, label: null },
      'v-antep': { bounds: [[36.050, 35.250], [37.300, 37.500]], pad: 40, label: 'Antep · Adana · Hatay' },
      'v-urfa': { bounds: [[37.100, 38.700], [37.400, 40.900]], pad: 40, label: 'Urfa · Mardin' },
      'v-dogu': { bounds: [[37.250, 40.150], [37.980, 41.500]], pad: 40, label: 'Midyat · Hasankeyf · Diyarbakır' },
      'v-komm': { bounds: [[37.350, 36.800], [38.000, 38.800]], pad: 40, label: 'Kommagene · Maraş' },
      // The three airports the week actually uses, which is a different
      // picture from the driving and deserves its own button.
      'v-ucus': { bounds: [[41.100, 28.900], [36.000, 41.700]], pad: 34, label: 'İstanbul · Antalya' }
    }
  },

  // — the words —————————————————————————————————————————————————
  i18n: {
    en: {
      htmlTitle: 'Güneydoğu · the Çelik plan',
      metaDesc: 'Eight days by car through southeastern Türkiye, 5-12 December: Antep, Adana, Antakya, Göbeklitepe, Mardin, Hasankeyf, Diyarbakır and the lower Kommagene.',
      dows: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      pill: '{dow} {dom}',

      static: {
        brand: 'Güneydoğu · the Çelik plan',
        navDates: '5-12 Dec 2026',
        tagDays: '8 days',
        tagSiblings: '4 travellers, rotating',
        tagSea: 'Light 07:30-17:10',
        h1: 'Gaziantep → Şanlıurfa → Mardin → Diyarbakır → Adıyaman',
        heroText: 'Eight days and about 2,490 kilometres of driving, with the car as the whole plan. Three days work out of Ozan Kağan\'s house in İslahiye — Antep\'s coppersmiths and Zeugma, Adana on the one morning of the week its liver-kebab street is at full tilt, then Antakya and a Roman tunnel cut through a cliff at Samandağ. On the Tuesday the party doubles at the airport, the car is collected, and the same day carries Göbeklitepe and both of Urfa\'s museums. Then Mardin, Midyat, Hasankeyf and Diyarbakır\'s walls. December decides two things for us: the light runs 07:30 to 17:10 and the ticket desks shut at 16:30, so there is exactly one sightseeing block a day; and Nemrut\'s summit is under snow and closed, so the Thursday is rebuilt around the lower Kommagene sites, which are free and open every day. Everything here was checked against the ministry\'s own system in September — in a region where half the internet still describes buildings that came down in 2023.',
        heroPlaceholder: 'Drop a photo of the four of you',
        travellerAName: 'Önder + Eren',
        travellerAInitial: 'Ö',
        travellerADesc: 'In from the 5th. They get the three İslahiye days to themselves — Antep, Adana, Antakya — and Eren flies home out of Batman on the Wednesday evening.',
        travellerBName: 'Berk + Üsame',
        travellerBInitial: 'B',
        travellerBDesc: 'In on the 8th, straight from the airport to Göbeklitepe. Berk leaves on the Friday, Üsame on the Saturday at 15:15 — which is the constraint the last day is built around.',
        home: 'İslahiye · Gaziantep',
        homeHref: 'https://www.google.com/maps/search/?api=1&query=%C4%B0slahiye%2C%20Gaziantep',
        homeKicker: 'The free beds',
        homeNote: 'Ozan Kağan\'s house — four of the eight nights, free',
        flightLabel: 'SAW → Gaziantep',
        bcnKicker: 'Days 1-3',
        bcnNote: 'Antep, Adana, Antakya — out and back from İslahiye',
        trainLabel: 'Hire car, ~2,490 km',
        vlcKicker: 'Days 4-8',
        vlcNote: 'Urfa, Mardin, Hasankeyf, Diyarbakır, Kommagene',
        city1: 'Gaziantep · İslahiye',
        city1Href: 'https://www.google.com/maps/search/?api=1&query=Gaziantep',
        city2: 'Mardin · Diyarbakır',
        city2Href: 'https://www.google.com/maps/search/?api=1&query=Mardin',
        mapIntro: 'Every stop, pinned — dashed lines are the four flights that bracket the week, solid sage the car. The three spokes on the left are the İslahiye days; the long eastern run and the loop back through Kommagene and Maraş are the second half. Hover a pin for its name, tap for the when.',
        vlogsKicker: 'What the research changed',
        vlogsText: 'Four things in this plan are not what was asked for, and each one has a reason you can check. Nemrut\'s summit is closed by snow from December to March — the 2026 season opened on 4 April, once three metres of it had been cleared — so Thursday goes to Cendere, Karakuş, Arsameia and Yeni Kale instead, all free and open daily. There is no evening flight from Kahramanmaraş to Sabiha Gökçen: the 20:50 goes to IST, so Berk comes on to Gaziantep with the others. The Monday as written — Kilis, Antakya and İskenderun — is 401 km and 6h58 of driving against 9h43 of light, so Kilis comes out and Samandağ goes in. And Turkish citizens can no longer buy single museum tickets at all: it is Müzekart or nothing, four of them, 200 ₺ each, bought before leaving. One more rule the whole plan is built on: a Tripadvisor ranking is not evidence a place is open. Rumkale is Gaziantep\'s number two attraction and has been shut since 2018.'
      },

      cats: {
        travel: 'On the road', sights: 'Sights', museum: 'Museum', boat: 'Boat trip',
        swim: 'Swim', food: 'Food & drink', event: 'Evening out', stay: 'Stay'
      },
      filters: {
        all: 'Everything', boat: 'Boat trips', swim: 'Swimming', sights: 'Sights',
        museum: 'Museums', food: 'Food', event: 'Evenings out'
      },

      days: [
        { city: 'Gaziantep', title: 'Antep in one day', sub: 'Saturday 5 Dec · beyran at nine, Zeugma before the desk shuts, İslahiye by dark' },
        { city: 'Adana', title: 'The Sunday liver breakfast', sub: 'Sunday 6 Dec · out at ten past six for the one morning a week that exists' },
        { city: 'Antakya', title: 'Antakya, Samandağ, İskenderun', sub: 'Monday 7 Dec · Kilis dropped, a Roman tunnel gained' },
        { city: 'Şanlıurfa', title: 'The party doubles, then Göbeklitepe', sub: 'Tuesday 8 Dec · airport at half eight, twelve thousand years old by half eleven' },
        { city: 'Mardin', title: 'Mardin → Midyat → Hasankeyf → Batman', sub: 'Wednesday 9 Dec · four stops, one plane to catch, and a 16:30 ticket desk' },
        { city: 'Diyarbakır', title: 'The walls, then lower Kommagene', sub: 'Thursday 10 Dec · the summit is shut, so the valley gets the afternoon' },
        { city: 'Kahramanmaraş', title: 'Adıyaman, then Maraş', sub: 'Friday 11 Dec · a newly reopened castle, and ice cream beaten by hand' },
        { city: 'Home', title: 'Yesemek, kebab, goodbye', sub: 'Saturday 12 Dec · three hundred basalt statues on a hillside, then three airports\' worth of goodbyes' }
      ],

      acts: {
        gd1b1: { title: 'Land at Gaziantep, 08:00', desc: 'Önder and Eren are on the ground at eight. The airport is 20 km from the centre — about 25 minutes on a clear morning.', tip: 'Fog is the real risk, not traffic. Gaziantep sits at 678 m on open plain and is textbook radiation-fog country; on 30 January 2026 a ten-car pile-up in fog on the TAG motorway killed two people. Landing at 08:00 is half an hour after a 07:29 sunrise — if it is foggy, count 50-60 minutes into town, not 25.' },
        gd1b2: { title: 'Beyran at Metanet', desc: 'Beyran is Antep\'s breakfast: lamb, rice and a great deal of garlic and pepper in a broth that has been going for twelve hours. Metanet Lokantası on Kozluca Caddesi, right beside the coppersmiths\' bazaar, is the name everyone gives. About 370 ₺ a head.', tip: 'This is the first thing you do, not the next thing. Beyran is served until lunchtime and then it is gone — it is a breakfast dish and the pots are emptied. 370 ₺ is the May 2026 figure; it was 300 ₺ in December 2025, which tells you what to expect by this December.' },
        gd1b3: { title: 'Bakırcılar + Almacı Pazarı', desc: 'The coppersmiths\' bazaar and the spice-and-preserve market sit 54 metres apart, one block. Copper being hammered on one side, pekmez, şire and pepper paste on the other.', tip: 'Go between nine and twelve — that is when the hammering happens; after five the workshops thin out. And December is Almacı Pazarı\'s best month: the grape molasses, the pepper paste and the winter preserves are all in. It scores higher with visitors (4.5) than the castle does, and it shuts at 18:00.' },
        gd1b4: { title: 'Zincirli Bedesten + the castle from outside', desc: 'The Zincirli Bedesten reopened on 10 September 2025 with 80 shops in it. Then walk the castle — from outside.', tip: 'Gaziantep Kalesi has been closed since the earthquake. The ministry\'s closed-units register puts it plainly: "Gaziantep Kalesi | Restorasyon | 6 February 2023 | until works are complete". Restoration was announced as finished in September 2025 and again in December 2025 and it still has not opened; four opening dates were missed in 2024-25. The 1,200 m circuit around the walls is free and open, and that is the visit.' },
        gd1b5: { title: 'Emine Göğüş + the Hamam Museum', desc: 'Two small museums at numbers 16 and 20 of the same street: one on Antep\'s kitchen, one on its bath-house culture. One stop, an hour.', tip: 'These belong to the metropolitan municipality, not the ministry, so Müzekart does not apply and the lira price does — 15 ₺ each, cash. Keep small notes for exactly this kind of stop.' },
        gd1b6: { title: 'Kurtuluş and Ömeriye mosques', desc: 'Two restorations finished either side of the earthquake: Kurtuluş Camii reopened 8 May 2025, Ömeriye Camii on 8 August 2026.', tip: 'Ömeriye\'s restoration turned up seventeen French bullets from the 1920-21 siege of Antep, and they are now on display in the mosque.' },
        gd1b7: { title: 'Panorama 25 Aralık Museum', desc: 'The municipality\'s panorama museum of the siege, on Derekenarı Caddesi — not the one inside the castle, which is shut with the rest of it. 60 ₺, cash.', tip: 'Müzekart is not accepted here. A traveller who filmed it in December 2025: "I have never felt this far inside history in any museum; I nearly cried."' },
        gd1b8: { title: 'Zeugma Mosaic Museum', desc: 'The reason the day is shaped this way. The world\'s largest mosaic museum, 4.1 km from the centre, holding the Gypsy Girl and the floors lifted out of Zeugma before the Birecik dam covered it. Ninety minutes to two hours; an hour is a sprint.', tip: 'The ticket desk closes at 16:30 and Saturday is its busiest day — if the morning has slipped, go at the 08:30 opening instead and push beyran later. Full tariff is €12 and Müzekart covers it. If there is time left, the Gaziantep Archaeology Museum reopened completely rebuilt on 15 August 2026 and is 1.3 km away (€4, closed Mondays — fine on a Saturday).' },
        gd1b9: { title: 'Antep kebab', desc: 'Dinner is the thing the city is known for: Kebapçı Halil Usta for küşleme, or İmam Çağdaş for ali nazik. Around 700-900 ₺ a head.', tip: 'Baklava, if you are buying: real butter baklava runs 2,000-2,500 ₺ a kilo, said on camera by a maker. "In some places you will see baklava at 800 lira, at 600 lira." Anything under 1,000 ₺ a kilo was not made with butter. Koçak has one branch and converts people who do not like sweets; Güllüoğlu was damaged in the earthquake and quickly restored.' },
        gd1b10: { title: 'Drive to İslahiye', desc: '88 km on the O-52, 65-80 minutes, toll 36-45 ₺ for the car.', tip: 'Check the road in the morning. On 22-23 January 2026 the Gaziantep-Nurdağı motorway closed in a blizzard and about 700 people were stuck in coaches overnight. The O-52 climbs from 840 m to about 1,100 m on the shoulder of Sof Dağı and drops 550 m in ten kilometres; ice forms on that descent, and it is tunnelled.' },
        gd1s1: { title: 'İslahiye · Ozan Kağan\'s house', desc: 'Four of the eight nights are here and none of them cost anything, which is why this plan only ever researched three hotels.', tip: 'One alternative for tonight, if nobody is tired: Zeugma runs a night opening 19:00-21:00 every day, +200 ₺ on top of Müzekart. With the sun down at 17:13 it is arguably the best thing available after dark — but it puts you in İslahiye at about 23:00 on an arrival day. Önder and Eren\'s call.' },

        gd2b1: { title: 'Out of İslahiye at 06:10', desc: 'Before sunrise, down the D-825 through Nurdağı to the O-52. About two hours; toll 73 ₺ for the car.', tip: 'Leaving this early costs nothing from the programme — the museum does not open until nine anyway — and it puts you in the middle of something that only happens on a Sunday.' },
        gd2b2: { title: 'Sunday liver breakfast, Kazancılar', desc: 'A hundred-year-old Adana tradition: a 200-metre lane of liver grillers behind the Kazancılar bazaar. The skewers are threaded between midnight and three, service starts at five, and people queue from four — some from other cities, some having waited since the night before. Four hundred kilos of liver on a single Sunday morning. Şalgam, not tea, alongside.', tip: 'The liver runs out between eight and ten. That is not a figure of speech. Kel Mahmut opens at five and is finished by then; the comfortable civilian window is nine to eleven. Ask for the şalgam acılı — that is the real thing; az acılı if you would rather not.' },
        gd2b3: { title: 'Ulu Camii → Büyük Saat → Taşköprü', desc: 'Three stops inside a fifteen-minute walk, one parking stop. The Roman bridge over the Seyhan has been fully pedestrian since 2007.', tip: 'Adana\'s Ulu Camii is the one thing on this day whose post-earthquake condition could not be verified — no 2025 or 2026 source says anything. It is 300 m from Taşköprü, so you will see for yourselves. Note the persistent hawkers on the bridge.' },
        gd2b4: { title: 'Adana Museum Complex', desc: 'The old 1906 Milli Mensucat textile factory, now 60,924 m² and eleven sections — the biggest museum in Türkiye and the Middle East. You are here for two of the eleven: archaeology and mosaics, about two hours. Müzekart covers it; the tariff is €5.', tip: 'Type "Acıbadem Hastanesi" into the navigation, it finds the entrance better than the museum\'s own name. Closed Mondays, so Sunday is clean — 09:00-19:00. And the Noah\'s Ark mosaic from Misis is in here: the Misis Mosaic Museum has been closed since 2020 and its finds were moved, so there is no reason to stop on the road for it.' },
        gd2b5: { title: 'Adana kebab', desc: 'Kaya Kebap (4.8 from 265 — the city\'s number one) or İştah Kebap (4.5 from 179). Reckon 700-1,000 ₺ a head with mezes, which is December 2025 press data for a proper sit-down.', tip: 'Skip Yüzevler. It is 137th of 946 restaurants in the city at 3.6, not in Tripadvisor\'s Adana top thirty, and the 2024-25 reviews complain about the price and the drift towards tourists — one local: "I am from Adana and I am paying for salad for the first time in my life." Öz Asmaaltı is not in the top thirty either. Both are the "famous name" category. Street wrap, by contrast, is 350-420 ₺.' },
        gd2b6: { title: 'Sabancı Merkez Camii + Merkez Park', desc: 'Twenty thousand capacity, a 32 m dome on nine "elephant feet", six minarets, and Tripadvisor\'s number one thing in Adana (4.7 from 554). Free covered parking underneath.', tip: 'Time it around the afternoon prayer at 15:08 — go in before 14:50 or after 15:45. Good windows: 09:30-12:15, 13:20-14:50, 15:45-17:10.' },
        gd2b7: { title: 'Yılankale — the boardwalk only', desc: 'A 13th-century Armenian castle on a cone of rock beside the D-400. The wooden walkways from the car park to the outer gate are new; above them it is unmaintained.', tip: 'Two hard facts. The barrier drops at 16:00 in winter (a February 2026 visitor; 18:00 in summer, open from 09:00) — leave Adana after 15:25 and you will find it shut. And above the boardwalk it is polished rock, an unprotected drop, rubbish and scrub (January 2026). In December do the boardwalk version only: 35-40 minutes.' },
        gd2b8: { title: 'Back to İslahiye', desc: 'About 110 minutes; sunset is 17:22, so the last 75 minutes are in the dark. The day totals ~346 km, 4h45 of driving and 118-146 ₺ of tolls.', tip: 'Kastabala, free and open daily, is the best-value thing you are passing (+20 km from Osmaniye). Karatepe-Aslantaş is the one that does not fit: 68 km and 95 minutes of driving round trip plus an hour inside, out of a day that already has 4h15 of driving in it. It deserves its own half-day from Osmaniye.' },

        gd3b1: { title: 'İslahiye → Antakya', desc: '106 km, about 100 minutes. This is the shape the day had to be rebuilt into.', tip: 'As asked — Kilis, then Antakya, then İskenderun — the day is 401 km and 6 hours 58 minutes of winter driving against 9 hours 43 of daylight. That leaves 2h45 for three cities, 55 minutes each including parking, and Antakya alone wants three to four hours. Kilis costs +124 km and +2h36 on its own, and on a Monday nothing ticketed there is open: the Kilis Museum was closed by ministerial order on 02.07.2026 and the Alaeddin Yavaşça house museum shuts Mondays.' },
        gd3b2: { title: 'Breakfast at the Gastronomy Bazaar', desc: 'Antakya\'s eating has moved. The Gastronomi Çarşısı in Odabaşı has 18 restaurants in the old Antakya style, with the Arasta bazaar\'s 67 shops and a 135-space car park next door. About 400 ₺.', tip: 'Do not put Uzun Çarşı in the plan. It is still an active building site — a traveller who went in during March 2026 was stopped from filming ("they said it is forbidden") and the estimate on the ground is "another two or three years". The Gastronomy Bazaar is the answer to both the parking problem and the eating problem in one place.' },
        gd3b3: { title: 'Necmi Asfuroğlu Archaeology Museum', desc: 'With the Hatay Archaeology Museum shut, this is Antakya\'s archaeology museum. It is underneath the Museum Hotel, in situ, with its own separate entrance, and it holds the largest single-piece floor mosaic in the world at 1,050 m², plus the Pegasus mosaic. Open daily 08:30-17:00, desk at 16:30. €8, Müzekart covers it.', tip: 'The museum it replaces is the sharpest warning in this whole plan: Hatay Arkeoloji Müzesi is Antakya\'s number one on Tripadvisor with 4.7 from 1,019 reviews, and it has been closed since 6 February 2023. The target has already slipped from end-2025 to end-2026.' },
        gd3b4: { title: 'Habib-i Neccar Mosque', desc: 'Reopened for worship on 27 December 2025, 1,055 days after the earthquake, with its original fabric preserved. A working mosque, 4.5 from 316.', tip: 'It is a five-minute walk from the museum and it is free.' },
        gd3b5: { title: 'St. Pierre Church (if it is open)', desc: 'The cave church cut into Mount Staurin above the city, about 2 km up. €8, Müzekart.', tip: 'The sources contradict each other and the contradiction leans open: muze.gov.tr says "Müzekart valid. Open", DÖSİM says closed. The site\'s own page wins under our rule, and there is supporting evidence — a well-attended Peter and Paul service was held there on 29 June 2025. One phone call settles it: 0326 225 10 60.' },
        gd3b6: { title: 'Çevlik — the Titus Tunnel', desc: 'A water tunnel the Romans cut through solid rock at Samandağ, with the Beşikli cave tombs about 100 m from its mouth. €3, Müzekart. Seventy-five minutes.', tip: 'Wear something with grip. A visitor, plainly: "if you are going to walk into the tunnel I recommend wearing something non-slip. The wet stones are very slippery. You may risk falling." It is a wet rock-cut channel and the risk is real. On hours: muze.gov.tr shows 08:00-19:00, which is the summer figure — Hatay\'s own provincial site publishes the season, "2 October-14 April (winter): 08:30-17:00". Take the winter one. This was also the stop least affected by the earthquake in the whole province.' },
        gd3b7: { title: 'İskenderun seafront', desc: 'The pleasant surprise of the day. The earthquake dropped this shoreline by 80 cm and it was rebuilt in ten months; it is now İskenderun\'s number one on Tripadvisor (4.4 from 86), with walking and cycling paths and green space. Boat trips restarted around 12 September 2026 after three years.', tip: 'Do not plan the churches. St George\'s Greek Orthodox (441 years old) was still under restoration as of 13 August 2026 with a year-end target, Aya Nikola likewise, and the Annunciation Cathedral almost completely collapsed in February 2023 with no reopening news in 2026.' },
        gd3b8: { title: 'Künefe and hummus', desc: 'İskenderun\'s künefe, and hummus — which here is a breakfast dish, served warm, often with egg. About 350 ₺.', tip: 'From a local, on künefe: the real one is the tray künefe at the 1942 place opposite the municipality. "There is one on Doktorlar Caddesi too, that is a franchise... and there is one in the shopping centre, those künefes come round, they are frozen, they are not original." Round and identical means frozen. Hummus: Humusçu Vahit Usta on Fener Caddesi is the classic; a hummus plate at Oktay Usta was 170 ₺ in February 2026.' },
        gd3b9: { title: 'Back to İslahiye over Belen', desc: '109 km, about 102 minutes, over the Belen pass. The day totals 329 km and 5h41 of driving.', tip: 'The Belen tunnel is not open yet — the 8.5 km bore was still under construction as of 21 April 2026 — so traffic uses the pass. The pattern in its incident history is not snow: it is fog, rockfall and very heavy lorry traffic on a mountain climb, with overturned trucks roughly monthly, and a rockfall closed the Belen-Antakya road in both directions around May 2026. Count the Antakya-İskenderun leg at 65 minutes rather than 52, and avoid driving it in the dark where you can.' },

        gd4b1: { title: 'Berk and Üsame land; the car is collected', desc: 'Önder and Eren have the hire car and are at the door. Which flight the other two are on changes the shape of this day by up to two hours: a 06:50 landing puts you at the hotel at 17:40, an 08:25 landing at 19:15, a 09:00 landing at 19:50.', tip: 'Get the hire terms right when booking, not at the desk. The route is ~2,490 km and every common Turkish daily cap fails it — even 300 km/day leaves you 90 km short over eight days. What to have written into the contract: "500 km a day, 4,000 km total". Overage is 3.90-4.90 ₺ a kilometre. And winter tyres are a paid extra, not standard: "Winter tires shall be provided as an additional product and service."' },
        gd4b2: { title: 'Gaziantep → Şanlıurfa', desc: '157 km on the O-52 motorway, about two hours, toll 102 ₺ for the car.', tip: 'Do Göbeklitepe first and the city afterwards. The turning is on the ring road, so you get there and back without ever entering Şanlıurfa — the approach leg does not get paid for twice, and the light is better earlier.' },
        gd4b3: { title: 'Göbeklitepe', desc: 'Open. Every day, no closed day — winter hours (24 October-1 April) 08:30-17:00, desk at 16:30. Free parking at the visitor centre with a shuttle up to the excavation. €20, and Müzekart covers it, including the separately ticketed €3 experience centre.', tip: 'Do the experience centre first, then go up. And dress for it: the site is on an exposed ridge with no shelter of any kind, Urfa in December runs 4-13 °C with about 19% of days wet and a 12 km/h wind. A coat and a windproof layer are not optional. Two things could not be verified: whether the shuttle runs in winter and what it costs — ask at the desk — and the access road is under works with a poor surface, so take it slowly.' },
        gd4b4: { title: 'Lunch in Urfa', desc: 'Liver is a five-in-the-morning breakfast here, not a lunch — at midday ask for kebab instead. Zırh kebabı, the mild one İstanbul calls "Urfa kebap", is the local speciality. About 300-400 ₺.', tip: 'Şehr-i Urfa (4.7 from 100), Hanehan (4.8 from 70, good for a group of four) or Astarte (4.9 from 48, 500 m from Balıklıgöl).' },
        gd4b5: { title: 'Urfa Archaeology + Haleplibahçe Mosaic Museum', desc: 'Two museums on one ticket, the buildings 150-200 m apart: the Urfa Man statue from Balıklıgöl and the Amazon mosaics. One visitor called it "possibly the best archaeology museum I have been to in my life". Open daily. €10 combined, Müzekart.', tip: 'This one nearly got cut by a data error and it is worth knowing why. DÖSİM\'s national tariff has a row reading "ŞANLIURFA E MOZAİK MÜZESİ — CLOSED" — note the stray "E" in the name. It is a malformed legacy record, there is no tariff row at all for the archaeology museum, and both museums\' own ministry pages say "Durum: open to visitors". Both are open.' },
        gd4b6: { title: 'Balıklıgöl, Ayn Zeliha and the Dergâh', desc: 'The sacred carp pools and the Mevlid-i Halil complex. Free, and late afternoon is the best hour for it.', tip: 'Walk the whole garden, not just the pool. Dress code applies inside the Dergâh and it fills up at prayer times. This part of the day works fine after dark — better, even. A traveller on an Urfa evening: "everywhere was smoke, the smell of kebab, as if I had fallen into a kebab."' },
        gd4b7: { title: 'Menengiç coffee at the Gümrük Hanı', desc: 'The 16th-century customs han, open 08:00-20:00, free to walk into, and the place to sit with a menengiç. About 100 ₺.', tip: 'Not in Urfa: reyhan şerbeti, which is a Mardin and Diyarbakır thing, and keme (desert truffle), whose season ends in late May.' },
        gd4b8: { title: 'The bazaar — Sipahi Pazarı, Bedesten', desc: 'Fully open on a Tuesday, unlike the Sunday problem in Adana.', tip: 'If the day has run well and the group is up for it, Cevahir Han does a sıra gecesi folded into normal evening service — Vali Fuat Cad. No:5, 0414 215 93 77. Sit at 19:00, finish at 21:00. Whether they do it on a Tuesday could not be verified; that is a phone call.' },
        gd4b9: { title: 'Drive on to Mardin', desc: 'This is the one recommendation in the plan that changes a night you specified. Viranşehir is 94 km and about 70 minutes; Mardin is about 45 minutes further in the dark.', tip: 'What the extra hour buys: no 72-minute transfer in the morning, Hasankeyf in full daylight, Deyrulzafaran fits, 1h53 of slack before Eren\'s plane instead of 30 minutes, and you wake up over the Mesopotamian plain. It costs 3,209 ₺ more (10,409 ₺ against 7,200 ₺). Viranşehir genuinely works — but it has exactly one usable hotel. Staying in Şanlıurfa is the only option that does not work at all: the plane is missed.' },
        gd4s1: { title: 'Mardin · Ramada Plaza', desc: '10,409 ₺ for the night for four. The only one of the shortlist with a real car park — and in old Mardin that is the deciding feature, not a nicety.', tip: 'Parking is the city\'s known problem: 1. Cadde takes cars, the lanes off it are for people and donkeys. Two separate rounds of research failed to establish where you actually leave a car in the old town, which is exactly why a hotel with its own is worth paying for. Confirm by phone — in this region a screenshot is not a booking.' },

        gd5b1: { title: 'Old Mardin on foot', desc: 'Ulu Camii, Şehidiye Medresesi, Zinciriye Medresesi and Kırklar Kilisesi — all four inside 550 metres. Ulu Camii 10-15 minutes, Şehidiye 10-15, Kırklar 20, Zinciriye 30-40. Mostly free.', tip: 'Leave the car in the free car parks below and climb. The Mardin Museum (€7) closes on Mondays and Sundays, so a Wednesday is clean, with the desk at 17:10; the Sakıp Sabancı City Museum closes Mondays but is private, so Müzekart does not work there and its 2026 price is unknown. Kasımiye Medresesi is free and open daily but about 5 km below the town — a drive, not a walk.' },
        gd5b2: { title: 'Deyrulzafaran Monastery', desc: 'The Syriac Orthodox monastery 5 km east, 09:00-17:00 daily, guided only: a 15-20 minute tour and then free time. Free shawls and free parking at the gate. 100 ₺ — Müzekart does not cover it.', tip: 'It costs about 36 minutes of driving and it is nearly on the way. This is the stop that only exists because you slept in Mardin: starting from Viranşehir it does not fit.' },
        gd5b3: { title: 'Drive to Midyat', desc: '67 km, 58 minutes.', tip: 'Distances east of here are from OSRM against real road geometry rather than the old tables — see the Hasankeyf leg for why that matters.' },
        gd5b4: { title: 'Midyat', desc: 'The Devlet Konuk Evi (the mansion from the television series), the Kültür Evi, Estel and the silver-filigree bazaar. 50-100 ₺ for entries.', tip: 'Official hours, from the municipality\'s own page: the Devlet Konuk Evi 08:00-20:00 on weekdays; the Kültür Evi, the City Museum in the Estel Han, the Midyat Evi and the tourism office 08:00-17:00. Open every day including Wednesday. Midyat is cheaper than Mardin, and the proper place for telkâri is the jewellers\' and silversmiths\' bazaar in Estel. A quick lunch here rather than a sit-down: Durak Pide Lahmacun or Kumrucu Özgür. Mor Gabriel, 20 km east, does not fit this day.' },
        gd5b5: { title: 'Drive to Hasankeyf', desc: '41 km, 41 minutes.', tip: 'A distance warning worth carrying: KGM\'s "Hasankeyf-Batman Airport 39 km" is wrong. The Ilısu reservoir drowned the old alignment and the road now goes round by the "old D955" — it is 57 km and 58 minutes. Every pre-2020 Hasankeyf distance is systematically short.' },
        gd5b6: { title: 'Hasankeyf', desc: 'Not a photo stop. The old town went under in 2020, but the castle side never flooded and reopened in December 2021; the Archaeopark and Şaab Valley followed in August 2025 and ten caves in December 2025, with a hundred more planned. Half a million visitors in the first nine months of 2025. €5, Müzekart. The ticket desk closes at 16:30 and that, not the plane, is the binding constraint on this day.', tip: 'In the new Hasankeyf culture park, all on one walk: the Zeynel Bey Türbesi of 1473 — 1,100 tonnes moved two kilometres in eight hours on 150 wheels, in one piece, the largest cultural asset ever moved whole — the Artuklu Hamamı (1,300 tonnes, also in one piece), the minaret of the El-Rızk mosque of 1408 with its double spiral stair, the Süleyman Han mosque and the İmam Abdullah zaviye. The vloggers\' claim that the road was newly asphalted is wrong: as of 1 April 2026 the 1.5 km between the museum and the harbour is still cobbles and potholes, which is why the coach tours dropped it — and why arriving in a car is the advantage. No boat trips. Closed Mondays; filming inside the museum is forbidden. One call answers the two open questions on 0488 502 49 30: does the €5 ticket cover the castle, and can you drive up.' },
        gd5b7: { title: 'Batman Airport — drop Eren', desc: '57 km, 58 minutes. Eren is on PC 2371 at 20:35, which is 35 minutes later than the "around eight" in the plan — free slack.', tip: 'Small airport, two hours is generous. Car-hire desks and gate closing times could not be researched: Pegasus\'s pages are JavaScript-rendered and every URL tried returned 404. Do not skip Batman city for a museum — Batman Museum is closed, and the town is a planned oil city without a historic bazaar.' },
        gd5b8: { title: 'On to Diyarbakır', desc: '98 km in the dark, about 1h19. The day totals 362 km and 5h08 of driving.', tip: 'Malabadi Köprüsü is not on this route — it is 31 km north of Batman towards Silvan, in Diyarbakır province. Take it off the list.' },
        gd5s1: { title: 'Diyarbakır · Turistik Palas', desc: '13,649 ₺ for three. Rebuilt in 2025, with a covered garage and valet parking.', tip: 'In Diyarbakır everything central is walkable — the one exception is the On Gözlü Köprü, ten minutes by car — so what matters about a hotel here is not its location but being able to leave the car safely.' },

        gd6b1: { title: 'Breakfast at the Hasan Paşa Hanı', desc: 'The 16th-century caravanserai opposite the Ulu Camii, and the city\'s breakfast institution. About 600 ₺ for a spread that feeds two.', tip: 'How the han\'s cafés are actually operating after the earthquake could not be verified and there is no 2025-26 price. Kahvaltıcı Edip is the fallback.' },
        gd6b2: { title: 'The walls: Dağkapı to Mardinkapı', desc: 'Dağkapı → Ulu Camii → the Four-Legged Minaret → Surp Giragos → Mardinkapı and the Keçi Burcu. Free, about two and a half hours.', tip: 'Honest warning: which parts of this walk are open could not be verified. The destruction in Sur in 2015-16 (Alipaşa, Lalebey, Savaş, Cevatpaşa, Fatihpaşa, Hasırlı) plus 2023 earthquake damage has left much of the walled city behind expropriation fencing and hoardings, and no dated source says which lanes are walkable. Treat the route as reasonable but unconfirmed and flex on the ground. Surp Giragos reopened after restoration in October 2022 but its current visiting hours are unconfirmed — Armenian churches in Türkiye are usually open only for services or by appointment. Mar Petyun Chaldean Church is 20 ₺.' },
        gd6b3: { title: 'Diyarbakır Archaeology Museum', desc: 'In the İçkale, if there is time. €3, Müzekart, closed Mondays so Thursday is fine.', tip: 'The ministry\'s own note: "the thematic exhibition hall is temporarily closed to visitors". Cahit Sıtkı Tarancı\'s house is a contradiction — the ministry page says open, DÖSİM says closed. 0412 224 67 40 answers both that and which route through Sur is walkable.' },
        gd6b4: { title: 'Liver, at midday', desc: 'Liver is a religion here. The local order of merit: Ciğerci Remzi first, Ciğerci Neşet second (4.9 on Google, tiny, 300+ reviews), Ciğerci Xale Meheme third. A four-skewer portion was 420 ₺ in June 2026.', tip: 'If you would rather eat properly: kaburga dolması, meftune and gırık at the women\'s cooperative on Yenikapı Sokak (Evsel Yöresel Lezzetler), about 800 ₺ for three portions. Cold baklava was invented here — the Çamlıca branch of Hacı Levent makes it and the other branch does not, 1,400 ₺ a kilo, though two slices at 240 ₺ was called expensive on camera.' },
        gd6b5: { title: 'Diyarbakır → Kâhta', desc: '163 km, 2h16. Not 230 km — that figure is wrong; this one is KGM\'s official table.', tip: 'Nemrut\'s summit is closed and this is the best-evidenced fact in the plan. The 2026 season opened on 7 April, after the road was cleared of up to three metres of snow on 4 April and with the statues still half-buried; the news agency İhlas: "Nemrut, whose road closes for 4-5 months every winter, has closed its tourism season"; the ministry\'s own live text says the site\'s open/closed status varies in December, January, February and March and that you must call the museum directorate before visiting; AA reported tourists turned back 3 km short of the summit in fog and blizzard. Both slopes are shut, Kâhta\'s and Malatya\'s. Two traps for whoever checks again: muze.gov.tr shows "Durum: OPEN, 09:00-18:00", which is an administrative flag and not a snow report; and there are two Nemruts — searching the name mostly returns the Nemrut crater lake at Tatvan in Bitlis, a different mountain with its own genuine closure stories. Note also that time was never the problem: leaving Diyarbakır at 12:00 would have reached the summit at 16:30. Snow was the problem, and so was coming back down 33 km of mountain road in the dark from 2,000 m.' },
        gd6b6: { title: 'Cendere Bridge', desc: 'A Roman bridge about 20 km from Kâhta, built by the Sixteenth Legion for Septimius Severus. Free, open, roadside, thirty minutes.', tip: 'It is pedestrian now — a new bridge was built alongside it. Photogenic in the low light, which is what you will have.' },
        gd6b7: { title: 'Karakuş Tumulus', desc: 'The Commagene royal women\'s burial mound, with its columns and its eagle. Free, no attendant, 25 minutes.', tip: 'It is a 750 m walk, about eight minutes, from the car park.' },
        gd6b8: { title: 'Down to Adıyaman', desc: '34 km, 37 minutes.', tip: 'Fill the tank before dark. Petrol stations in Kâhta shut in the evening — "they had closed up and gone because it had got dark".' },
        gd6s1: { title: 'Adıyaman · Adıyaman Park Hotel', desc: 'The cheapest night of the trip: 4,249 ₺ for one triple room with breakfast. Google 4.8 from 864 reviews, the freshest around 4 September 2026.', tip: 'A triple beats two rooms by a wide margin here — 4,249 ₺ against White Star\'s 8,234 ₺ for two. If separate rooms matter, White Star at 8,234 ₺ is the right pick: breakfast, parking and free cancellation. Avoid Rabat Resort whatever the price looks like: 5.3/10 on enuygun, "zero cleanliness, not even air conditioning" in September 2026, no hot water and sockets pulled out of the wall in April 2026, out in the countryside and working as a wedding venue. Booking.com\'s "8.7 from 6 reviews" for the pick is a reopening artefact — do not trust a high score resting on few reviews.' },

        gd7b1: { title: 'Perre Antik Kenti', desc: 'One of the five cities of Commagene, 5 km north of the centre — the rock tombs and the fountain. Open daily, 08:00-17:30. €3, Müzekart. Fifty minutes.', tip: '5.8 million lira was allocated to excavation and conservation here in 2025. Take your time: the Adıyaman Museum, which is where the Commagene finds would otherwise be, is closed.' },
        gd7b2: { title: 'Musalla Mosque', desc: 'Reopened after restoration. Euronews Türkçe, 4 September 2026: the central Musalla Camii, Besni\'s Kurşunlu Camii and the Abuzer Gaffari mosque and tomb all returned to service — dome, minaret, lead cladding.', tip: 'Adıyaman is about two hours, not a morning, and the plan says so on purpose. The centre was one of the worst-hit places in the country and is still largely a building site. Sites are often unfenced with exposed rebar on the ground — watch your feet.' },
        gd7b3: { title: 'Çiğköfte, in the street', desc: 'Rolled into lavash and eaten walking, 50-100 ₺. The one thing a visiting traveller scored 10/10. Çiğköfteci İbo, Atatürk Bulvarı, Şahinbey Çarşısı 28.', tip: 'Other names, all with 2025 prices that will be well above this by now: Meşhur Kebab Salonu Hasan Usta (Gölbaşı Cd. 1), Adıyaman Sofrası for the local kavurma (Gölbaşı Cd. 58/A), Güloğlu Pastanesi (Gölbaşı Cd. 104).' },
        gd7b4: { title: 'Adıyaman → Kahramanmaraş', desc: '162 km on the D-360 through Gölbaşı and Türkoğlu, about 2h10.', tip: 'The problem with this day is the opposite of what you would expect. Working backwards from TK 2207 at 20:50 you must leave central Maraş at 19:35 — and leaving Adıyaman at 08:30 puts you in Maraş by half twelve. That is seven hours in Maraş, which is more than a city three years out of an earthquake can carry. Do not compress the morning; spread it. Gölbaşı, 63 km along and on the way, is a sensible stop.' },
        gd7b5: { title: 'Kahramanmaraş Castle', desc: 'Reopened on 16 September 2026 — two days before this research was done. The collapsed southwestern walls were rebuilt in the original technique, the ground stabilised, the damaged visitor centre replaced with a new one, the paths relaid, and there is a café inside. This is now the strongest thing in the city.', tip: 'No price was published for it. The city\'s other anchor is gone: the Germanicia mosaic site is "temporarily closed to visitors" according to two independent official sources — turkishmuseums.com shows it open and is stale here.' },
        gd7b6: { title: 'Kahramanmaraş Museum', desc: 'Open, every day, 08:00-17:00, desk at 16:30, on Azerbaycan Bulvarı 35. €3, Müzekart. The Maraş stelae and the Domuztepe finds.', tip: 'It is the only state museum open in the province that was the epicentre — and it is a good one.' },
        gd7b7: { title: 'The covered bazaar, Semerciler, Bakırcılar', desc: 'The historic bazaar quarter.', tip: 'There is positive news about it reopening but how much of it is actually trading could not be verified. Careful with searches, too: most "coppersmiths\' bazaar reopened" results are about Malatya, not Maraş. The jewellers close on Sundays, which does not affect a Friday. What to buy, in Semerciler: tarhana crisps — yoghurt, cracked wheat, thyme and almond, dried in the sun on strings — frik, Maraş cheese, pomegranate syrup, chilli.' },
        gd7b8: { title: 'Maraş ice cream at Emek Pastanesi', desc: 'Three generations, a hundred-year-old recipe, beaten on the premises. September 2026 prices, the freshest data in the whole research: a scoop 30 ₺, liquorice sherbet 30 ₺, çörek 20 ₺, Şam tatlısı 40 ₺ — one traveller ate all of it for 200 ₺ and had 60 ₺ change.', tip: 'Maraş is the cheapest city on this route and it is not close. The same traveller: "This is Kahramanmaraş. Everything is cheap... a wonderful city where everything really is sold at what it is worth." Which ice-cream makers are actually working could not be verified beyond this one — Emek is September 2026 sourced, so it is solid. Others named: Hacı Mehmet Can, Yaşar Usta. For meat, Hacı Milcan; for lahmacun, İsmet Usta at the Yazı entrance — "if you are going to eat lahmacun that is the only address".' },
        gd7b9: { title: 'Dinner', desc: 'Koç Kebap for an Adana wrap, or whatever the bazaar offers. 250-350 ₺.', tip: 'Dress warm — Maraş is high and cold. "Maraş is not that hot after all, it is cold here."' },
        gd7b10: { title: 'Berk leaves', desc: 'The decision that shapes this evening, and it needs making now rather than on the day.', tip: 'There is no evening flight from Kahramanmaraş to Sabiha Gökçen. What exists is TK 2207, KCM 20:50 → İstanbul IST 22:35, seven days a week, Friday confirmed — same hour, different airport. The only KCM→SAW service is Pegasus PC 2437, about four times a month, at 07:20 in the morning. The recommendation is to carry Berk on to Gaziantep instead: GZT→SAW runs about 25 times a week (16:10, 17:50, 20:05, 20:20, 20:30, 22:10, 22:25, 22:45, 23:00 on Pegasus; 21:25, 21:35, 21:40, 22:20 on AJet), Maraş to Antep is 78 km and about an hour, and Önder and Üsame are going that way regardless. If Maraş is chosen instead: the airport is 5 km out, 15 minutes, 60 minutes for check-in — so leave the centre at 19:35.' },
        gd7b11: { title: 'On to İslahiye', desc: '69 km on the O-52, about an hour, toll around 45 ₺.', tip: 'Last night in Ozan Kağan\'s house.' },

        gd8b1: { title: 'İslahiye → Yesemek', desc: '23-25 km but about 45 minutes: it averages 32 km/h on a winding village road.', tip: 'Google Maps and the road signs disagree on the final approach — one visitor was sent down a dead end. Follow the signs. Winter road conditions could not be verified and it snows there (25 January 2026), so check the morning road bulletin.' },
        gd8b2: { title: 'Yesemek open-air museum', desc: 'Open, 08:00-17:00, every day, and free — with no local-versus-foreign distinction. The ministry\'s own words: the largest quarry and sculpture workshop in the Near East, on UNESCO\'s tentative list. About 300 basalt statues spread over a hillside among pomegranate and fig trees, beside the Tahtaköprü reservoir wildlife area. 0342 875 10 55.', tip: 'Go towards midday rather than late afternoon. December gives about three and a half hours of sun a day and dark basalt reliefs need raking side light to read at all.' },
        gd8b3: { title: 'Back to İslahiye', desc: '45 minutes.', tip: 'Do not put Zincirli Höyük (Sam\'al) in the plan. It does not appear anywhere in the ministry\'s list of Gaziantep sites — the six on record are Zeugma Mosaic, Gaziantep Kalesi, Rumkale, Yesemek, Gaziantep Archaeology and the Zeugma site — which strongly suggests an active dig with no visitor arrangement. İslahiye Kalesi: status unknown.' },
        gd8b4: { title: 'Farewell kebab in İslahiye', desc: 'The lunch the trip was asked to end with. 400-600 ₺.', tip: 'No name is recommended here because none could be researched — ask Ozan Kağan, this is exactly what a local knows and the internet does not. Worth remembering: İslahiye and Nurdağı were among the worst-hit districts of Gaziantep in 2023.' },
        gd8b5: { title: 'İslahiye → Gaziantep Airport', desc: '105 km, 1h20, toll 36-45 ₺. Leave at 12:50 — this is the hard edge of the day.', tip: 'Working backwards from Üsame\'s flight: XQ 7647 GZT→AYT departs 15:15, so be at the airport at 14:15, so leave İslahiye at 12:50, so lunch is 11:45-12:45 and Yesemek is 09:45-11:15. It works, but there is no slack in it. SunExpress is the only operator on that route and the Saturday service is confirmed.' },
        gd8b6: { title: 'Airport: return the car, and goodbye', desc: 'Üsame to Antalya at 15:15, Önder to Sabiha Gökçen with plenty of choice from 16:10 onwards.', tip: 'Return the car at 10:00 rather than 12:00 if the hire can be re-cut that way — Turkish hire bills in 24-hour blocks, so three hours adds a whole day, about 2,960 ₺. It does not disturb anything: the schedule already has you at the airport at 14:15. If time can be found, XQ 7647 also flew at 21:22 on a Tuesday — worth checking in November whether the winter timetable has a late Saturday wave, because that would loosen the whole day.' }
      },

      bookings: {
        k1: 'Decide Berk\'s Friday-11 flight first — it shapes the whole of that evening. There is no evening Kahramanmaraş → Sabiha Gökçen service. TK 2207 leaves KCM at 20:50 for İstanbul IST (not SAW), seven days a week. The only KCM→SAW flight is Pegasus PC 2437, roughly four times a month, at 07:20. Recommended: carry Berk on to Gaziantep, 78 km and an hour, where GZT→SAW runs about 25 times a week from 16:10 to 23:00 — and Önder and Üsame are driving that way anyway.',
        k2: 'Book the car, and get "500 km a day, 4,000 km total" written into the contract. The route is ~2,490 km, and every common Turkish daily cap fails it: 150/day is 1,288 km short, 250/day is 488 short, even 300/day is 90 km short over eight days. Overage is charged per kilometre — 3.90 ₺/km economy, 4.90 ₺/km comfort — and at this distance that is a four-figure surprise. Note the 4,000 km is also a monthly hard ceiling in Garenta\'s economy and comfort classes.',
        k3: 'Winter tyres are a paid extra, not standard — put them on the reservation with a price, not on somebody\'s word at the desk. Garenta\'s own terms: "Winter tires shall be provided as an additional product and service and come with an associated cost… subject to regional variations and office stock limitations." Two things make this real rather than a formality: Gaziantep sits on the warm side of the industry\'s fitting line, and stock runs out with the first snow warnings — which is exactly December. The law (KTK 65/A) exempts private and hire cars, and the window is stated as 1 December-1 April in the regulation but 15 November-15 April in 2026 news reports; both readings contain 10-12 December. Chains are not a substitute. Say on the phone: "5-12 Aralık için kış lastiği takılı araç istiyorum, ücreti nedir, rezervasyona işleyebilir misiniz?"',
        k4: 'Book the car back at 10:00, not 12:00 — it saves about 2,960 ₺ for nothing. Turkish hire bills in 24-hour blocks, so a 09:00 pickup returned at 12:00 adds a whole extra day. Moving the return to 10:00 takes the 8 December hire from five billed days to four (~11,840 ₺). It disturbs nothing: Saturday\'s schedule already requires being at the airport at 14:15. Prices, two lengths, both live 18 Sep: 5 Dec pickup, 8 billed days ≈ 23,700 ₺ (broker, Opel Mokka, 18,125 ₺); 8 Dec pickup, 5 billed days ≈ 14,800 ₺ (broker 11,517 ₺). The Mokka figures are live quotes for your exact dates; the Garenta figures are estimated from a published "from 2,960 ₺/day" rate. Also confirm: HGS balance topped up, deposit, second-driver fee, fuel policy.',
        k5: 'Decide the night of Tuesday 8 December — Viranşehir or Mardin — and then book it. Mardin is recommended: Ramada Plaza, 10,409 ₺, the only shortlisted hotel with a real car park, which in old Mardin decides everything. It costs 3,209 ₺ more than Viranşehir and about 45 minutes of extra night driving, and it buys back the whole of Wednesday. Viranşehir works and has exactly one usable hotel: Yükselhan, 7,200 ₺ for two rooms with breakfast and parking, confirmed at the same figure by two platforms independently. Tella Otel is real and trading but has no online inventory for these dates — phone only, 0414 471 4444.',
        k6: 'Buy four Müzekart+ before leaving, 200 ₺ each, 800 ₺ the lot, through the Museums of Türkiye app. This is not a saving, it is the only way in: the ministry\'s own e-ticket engine says "Turkish citizens may visit museums and archaeological sites only with a MüzeKart". It pays for itself in two days — Göbeklitepe alone is €20 at the counter — and it covers Zeugma, both Urfa museums, Adana, Hasankeyf, Perre, Maraş, Antakya and Çevlik. It does not cover: Panorama 25 Aralık (60 ₺, cash), Emine Göğüş and the Hamam Museum (15 ₺ each, municipal), Deyrulzafaran (100 ₺), Mor Gabriel (200 ₺) or the Sakıp Sabancı City Museum in Mardin.',
        k7: 'Book Diyarbakır and Adıyaman. Diyarbakır: Turistik Palas, 13,649 ₺ for three, rebuilt 2025, covered garage and valet. Adıyaman: Adıyaman Park, 4,249 ₺ for one triple with breakfast, Google 4.8 from 864. Adıyaman\'s stock is thin, so do not leave it. And confirm every one of these by phone: this research found five hotels selling on OTAs that do not exist — the Zeus in Kâhta was demolished around 2019 and has shops on the site, Ve Hotels Adıyaman is closed and off its own chain\'s site, Beyazsaray is now a wedding hall, the Nemrut Kervansaray last advertised a season in 2014, and the Antiochos\' own reviews still say it is mid-renovation. In this region a live OTA listing is not evidence that a hotel exists.',
        k8: 'Late November, make the confirmation calls — nine numbers, each answering something this plan could not settle. 0416 216 29 29 Adıyaman Museum Directorate: the Nemrut road (the ministry explicitly instructs you to ask here in winter), plus Arsameia, Yeni Kale and Perre. 0414 313 15 88 Şanlıurfa Museum: does the Göbeklitepe winter shuttle run and what does it cost; is Harran village (as opposed to the closed site) visitable; Karahantepe. 0488 502 49 30 Hasankeyf: does the €5 ticket cover the castle, can you drive up. 0326 225 10 60 Hatay: is St. Pierre open. 0342 325 27 27 Zeugma: really open every day, and does the night opening run in December. 0412 224 67 40 Diyarbakır: the Tarancı house, and which route through Sur is walkable. 0482 212 16 64 Mardin Museum. 0328 825 06 74 Karatepe: winter hours. 0414 215 93 77 Cevahir Han, Urfa: is there a sıra gecesi on a Tuesday.',
        k9: 'On each morning, two checks before the engine starts. KGM\'s road bulletin at kgm.gov.tr — especially 5 December (Antep→İslahiye, the O-52 blizzard risk), 7 December (the Belen pass), 10 December (ice on the Diyarbakır-Siverek plateau) and 12 December (the Yesemek village road). And the meteorology app for buzlanma and sis warnings in Diyarbakır, Adıyaman and Kahramanmaraş. Harran and the Mesopotamian plains fog heavily in winter and it is worst at dawn, which hits the early starts on the 8th, 9th and 10th directly — fog was also why tourists were turned back on Nemrut.',
        k10: 'In the bag: a coat and a windproof layer (Göbeklitepe\'s ridge has no shelter at all, and Maraş is high and cold); non-slip shoes, which is a safety item and not a comfort one — the Titus Tunnel is wet rock-cut channel and a visitor warns plainly about falling, and Yılankale above the boardwalk is polished rock beside an unprotected drop; cash, for the 60 ₺ Panorama that will not take Müzekart, the 100 ₺ at Deyrulzafaran, the 15 ₺ municipal museums and every bazaar; the four Müzekarts loaded on phones; and a power bank. Budget about 1,200-1,500 ₺ a head a day for food as a midpoint — the Adana and Antep days go over it and the Maraş and Urfa days come in under.'
      },

      map: {
        htmlTitle: 'Güneydoğu — the route',
        panelTitle: 'The route',
        panelDates: '5-12 December',
        viewAll: 'Full route',
        legendLabel: 'Legend ▾',
        flight: 'Flights',
        train: 'The car, ~2,490 km',
        catSights: 'Sights & museums',
        catFood: 'Food & drink',
        catFiesta: 'The set pieces',
        catStay: 'Where we sleep',
        sawLong: 'İstanbul Sabiha Gökçen — in on the 5th and 8th, out on the 9th, 11th and 12th',
        gztLong: 'Gaziantep · the way in and the way out',
        urfLong: 'Şanlıurfa · Göbeklitepe and two museums',
        marLong: 'Mardin · night three',
        dibLong: 'Diyarbakır · night four',
        aytLong: 'Antalya — Üsame, 12 December 15:15',
        lock: 'Tap to explore the map',
        openInMaps: 'Open in Google Maps',
        spots: {
          zeugma: 'Zeugma Mosaic Museum — desk shuts 16:30',
          bakircilar: 'Bakırcılar + Almacı Pazarı',
          antepkale: 'Gaziantep Kalesi — closed, walk the walls',
          antepkebap: 'Antep kebab and baklava',
          ciger: 'Kazancılar — the Sunday liver breakfast',
          taskopru: 'Taşköprü and the old centre',
          adanamuze: 'Adana Museum Complex',
          sabanci: 'Sabancı Merkez Camii',
          yilankale: 'Yılankale — barrier down at 16:00',
          gastronomi: 'Antakya Gastronomy Bazaar',
          asfuroglu: 'Necmi Asfuroğlu Archaeology Museum',
          habibneccar: 'Habib-i Neccar Camii — reopened Dec 2025',
          titus: 'Titus Tunnel, Çevlik — wet rock, grip needed',
          iskenderun: 'İskenderun seafront — rebuilt in ten months',
          gobekli: 'Göbeklitepe — open, every day',
          urfamuze: 'Urfa Archaeology + Haleplibahçe',
          balikligol: 'Balıklıgöl and the Dergâh',
          stayramada: 'Mardin · Ramada Plaza — the one with parking',
          eskimardin: 'Old Mardin — four stops in 550 m',
          deyrulzafaran: 'Deyrulzafaran Monastery — 100 ₺, no Müzekart',
          midyat: 'Midyat — the guest house and the silver bazaar',
          hasankeyf: 'Hasankeyf — the castle side never flooded',
          hasanpasa: 'Hasan Paşa Hanı breakfast',
          surlar: 'Diyarbakır walls — route unconfirmed',
          cendere: 'Cendere Bridge — Roman, free',
          karakus: 'Karakuş Tumulus — 750 m walk',
          perre: 'Perre Antik Kenti',
          maraskale: 'Kahramanmaraş Castle — reopened 16 Sep 2026',
          dondurma: 'Emek Pastanesi — ice cream beaten by hand',
          yesemek: 'Yesemek — 300 basalt statues, free'
        }
      },

      stays: {
        htmlTitle: 'Güneydoğu · where we sleep',
        metaDesc: 'Three nights researched out of eight — Mardin, Diyarbakır, Adıyaman — priced live on Turkish OTAs, with the five hotels that are sold online and do not exist.',
        kicker: 'The accommodation file',
        title: 'Where we sleep',
        intro: 'Only three nights were ever researched. Four of the eight are free — Ozan Kağan\'s house in İslahiye — and on the last nobody sleeps anywhere. Prices were read live on 18 September 2026 from obilet and enuygun, which in this region carry noticeably better inventory than Booking or Etstur, especially for triple rooms; they are shown here in euros at 55.9 ₺ to the euro, with the lira figure in every note because that is what will be handed over. Ratings are out of ten: where the only source was Google, its five-point score has been doubled and the raw figure is in the note. The button opens a dated search for that city and party; the hotel names open the place itself, because for these three no deep link could be verified — and in this region a screenshot is not a booking. Phone and confirm.',
        backToPlan: '← Back to the plan',
        onMap: 'The three nights are pinned on the route map ↗',
        updated: 'Prices read live 18 Sep 2026 for December dates — Turkish inflation moves them fast; add to these figures rather than trusting them flat.',
        bandNote: 'Each rail plots what that night costs in total — every room, not per person — because the party is four on the 8th and three on the 9th and 10th. The shaded stripe runs €75 to €200, which is what these three towns actually charge for a party this size.',
        scaleLo: '€75',
        scaleHi: '€200',
        noPrice: 'no live price',
        perNight: '€{n} for the night',
        totalN: '€{n} · {nights} night',
        plusTax: '+€{n} tax',
        taxIn: 'tax in',
        was: 'was €{n}',
        reviews: '{n} reviews',
        locChip: 'location {n}',
        freeCancel: 'free cancellation',
        payLater: 'pay at the hotel',
        overBand: 'over the band',
        centerKm: '{km} km from the centre',
        bookBtn: 'Open the dated search ↗',
        whyTitle: 'Why this one',
        marTitle: 'Tuesday 8 December · four people',
        marSub: 'The plan recommends Mardin over the Viranşehir in the brief. It costs 3,209 ₺ more and about 45 minutes of night driving, and it buys back the whole of Wednesday: no 72-minute morning transfer, Hasankeyf in daylight, Deyrulzafaran possible, and 1h53 of slack before Eren\'s plane instead of half an hour. Staying in Şanlıurfa is the only option that fails outright — the plane is missed.',
        dibTitle: 'Wednesday 9 December · three people',
        dibSub: 'After Batman airport, 98 km in the dark. Everything central in Diyarbakır is walkable — the one exception is the On Gözlü Köprü — so what a hotel here has to offer is somewhere safe to leave the car, not a location.',
        adiTitle: 'Thursday 10 December · three people',
        adiSub: 'The cheapest night of the trip, and the one where a single triple room beats two doubles by a factor of two. Kâhta is a real alternative — Booking returns nothing there and Etstur one result, but obilet\'s dated search shows genuine inventory.',
        whyRamada: [
          'The only hotel on the shortlist with a real car park — free, drive to the door, EV charging. Old Mardin\'s known problem is exactly this: 1. Cadde takes cars and the lanes off it are for people and donkeys, and two rounds of research never established where you otherwise leave one.',
          '10,409 ₺ for four, against 7,200 ₺ for two rooms in Viranşehir. The 3,209 ₺ difference buys Wednesday back whole, which is the best-value decision in the plan.',
          'You wake up over the Mesopotamian plain and start the day already in the city you are there to see, rather than 72 minutes short of it.'
        ],
        whyTuristik: [
          'A covered garage and valet parking, in a city where the car is the thing you worry about and nothing else needs one.',
          'Rebuilt in 2025, and inside Sur — the walls walk, the Hasan Paşa Hanı breakfast and the liver at midday are all on foot from the door.',
          '13,649 ₺ for three is the dearest night of the week, and it is the one night where there is no cheaper option that also solves the parking.'
        ],
        whyAdipark: [
          '4,249 ₺ for one triple with breakfast — half what two rooms cost anywhere else in town, and the cheapest night of the trip by a distance.',
          'Google 4.8 from 864 reviews, the most recent around 4 September 2026, confirmed from two independent directions. Booking\'s "8.7 from 6 reviews" is a reopening artefact and was not used.',
          'Adıyaman rather than Kâhta because it is cheaper, better rated and on the right side of town for Friday\'s run to Kahramanmaraş.'
        ],
        beds: {},
        notes: {
          yukselhan: '7,200 ₺ for two rooms — 3,600 ₺ a room, 1.3 km from the centre, breakfast, free cancellation and parking, on the D400. obilet and Etstur give the same figure independently. It is a three-star roadside stop and its breakfast is well spoken of, and it is the only hotel in Viranşehir: asking obilet for two rooms dropped it from the list entirely and returned 34 "results", the nearest 69.7 km away in Siverek and the rest 84-87 km away in Şanlıurfa. There is not a single property within 15 km.',
          carra: '9.0 from 560 — a konak in the old town and very well rated, but no price could be obtained for these dates. Worth a phone call if the Ramada is full.',
          maristan: '9.1 from 168, old town. Again, no live price for these dates.',
          minessa: 'Its own car park is confirmed on video, which in old Mardin is the feature that matters. No price for these dates.',
          tella: 'Google 4.1 from 529, so real and trading — but it has no online inventory for these dates at all. Phone only: 0414 471 4444.',
          whitestar: '6,171 ₺ for one triple with breakfast and parking.',
          whitestar2: '8,234 ₺ for two rooms with breakfast, parking and free cancellation — the right pick if separate rooms matter, and still under what Park Dedeman wants for the same.',
          kommagene: '4,000 ₺ for one room for three with breakfast. Google 4.8 from 1,285, freshest 16 September 2026 — and, the best evidence in the file that this region works in winter, verified stays from January 2025. Kâhta is not the empty town it first appeared to be. Note that Karadut village is now pointless: its guesthouses exist for the 04:00 sunrise run, and with the summit shut that reason is gone.',
          dedeman: '7,500 ₺ for one triple with breakfast and parking; 11,250 ₺ for two rooms, room only.',
          euphrat: '6,395 ₺ on enuygun, 7,773 ₺ on obilet, free cancellation. Its review flow thins out between December and February, which is a flag rather than a verdict. +90 533 612 4402.',
          rabat: 'Listed here only so nobody books it on price. 5.3/10 on enuygun; September 2026: "zero cleanliness, not even air conditioning"; April 2026: no hot water, sockets pulled out of the wall. It is out in the countryside and works as a wedding venue.'
        },
        totalKicker: 'Three nights, three towns',
        totalLine: '28,307 ₺ for the three booked nights — about €506 — and the other four nights cost nothing at all.',
        totalNote: 'Against a group total of about 67,738 ₺ for everything shared: the car at 23,700 ₺ for the eight-day hire (18,125 ₺ through a broker), fuel at about 15,341 ₺ for 2,490 km, 390 ₺ of tolls and these three hotels. Per person, flights excluded and İslahiye free: Önder about 32,000 ₺ for eight days, Üsame about 25,500 ₺ for five, Eren about 23,500 ₺ for five, Berk about 21,500 ₺ for four. Türkiye has no tourist tax but does have a 2% accommodation tax, normally already in the price.',
        method: 'How this list was made: obilet and enuygun searched live on 18 September 2026 for the exact dates and party sizes, cross-checked against Etstur, Booking and Google. Every hotel here was verified from two directions — a live dated price and a review from the same month — because the first pass turned up five hotels that are sold online and do not exist: the Zeus in Kâhta, demolished around 2019 with shops built on the site; Ve Hotels Adıyaman, closed and removed from its own chain\'s website; the Beyazsaray, now a wedding hall; the Nemrut Kervansaray, whose last advertised season was 2014 and which has no Google Maps record at all; and the Antiochos, whose own reviews still say the breakfast, pool, hamam and spa do not exist. Direct booking by phone or WhatsApp is often cheaper than any platform in provincial Türkiye — call.'
      }
    },

    // ————————————————————————————————————————————————————————— Türkçe —
    tr: {
      htmlTitle: 'Güneydoğu · Çelik planı',
      metaDesc: 'Arabayla sekiz gün, 5-12 Aralık: Antep, Adana, Antakya, Göbeklitepe, Mardin, Hasankeyf, Diyarbakır ve aşağı Kommagene.',
      dows: ['Cmt', 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
      pill: '{dow} {dom}',

      static: {
        brand: 'Güneydoğu · Çelik planı',
        navDates: '5-12 Aralık 2026',
        tagDays: '8 gün',
        tagSiblings: '4 kişi, değişken kadro',
        tagSea: 'Işık 07:30-17:10',
        h1: 'Gaziantep → Şanlıurfa → Mardin → Diyarbakır → Adıyaman',
        heroText: 'Sekiz gün, yaklaşık 2.490 kilometre direksiyon: planın kendisi araba. İlk üç gün İslahiye\'den, Ozan Kağan\'ın evinden gidip geliniyor — Antep\'in bakırcıları ve Zeugma, Adana\'nın ciğerci sokağının yılda tek doğru sabahı, sonra Antakya ve Samandağ\'da kayaya oyulmuş bir Roma tüneli. Salı günü kadro havalimanında ikiye katlanıyor, araç alınıyor ve aynı gün hem Göbeklitepe\'yi hem Urfa\'nın iki müzesini taşıyor. Ardından Mardin, Midyat, Hasankeyf ve Diyarbakır surları. Aralık iki şeye karar veriyor: ışık 07:30-17:10 arası ve müze gişeleri 16:30\'da kapanıyor, yani günde tam olarak bir gezi bloğu var; ve Nemrut zirvesi karla kapalı, o yüzden perşembe aşağı Kommagene\'ye göre yeniden kuruldu — hepsi ücretsiz, hepsi her gün açık. Buradaki her durum bilgisi eylülde Bakanlığın kendi sisteminden kontrol edildi; internetin yarısının hâlâ 2023\'te yıkılmış binaları anlattığı bir bölgede bunun başka yolu yok.',
        heroPlaceholder: 'Dördünüzün fotoğrafını buraya bırak',
        travellerAName: 'Önder + Eren',
        travellerAInitial: 'Ö',
        travellerADesc: '5\'inde geliyorlar. İslahiye\'den yapılan üç gün — Antep, Adana, Antakya — tamamen onların; Eren çarşamba akşamı Batman\'dan dönüyor.',
        travellerBName: 'Berk + Üsame',
        travellerBInitial: 'B',
        travellerBDesc: '8\'inde iniyorlar, havalimanından doğruca Göbeklitepe\'ye. Berk cuma, Üsame cumartesi 15:15\'te dönüyor — son günün bütün kurgusu o uçağa bakıyor.',
        home: 'İslahiye · Gaziantep',
        homeHref: 'https://www.google.com/maps/search/?api=1&query=%C4%B0slahiye%2C%20Gaziantep',
        homeKicker: 'Ücretsiz yataklar',
        homeNote: 'Ozan Kağan\'ın evi — sekiz gecenin dördü, ücretsiz',
        flightLabel: 'SAW → Gaziantep',
        bcnKicker: '1-3. günler',
        bcnNote: 'Antep, Adana, Antakya — İslahiye\'den gidiş-dönüş',
        trainLabel: 'Kiralık araba, ~2.490 km',
        vlcKicker: '4-8. günler',
        vlcNote: 'Urfa, Mardin, Hasankeyf, Diyarbakır, Kommagene',
        city1: 'Gaziantep · İslahiye',
        city1Href: 'https://www.google.com/maps/search/?api=1&query=Gaziantep',
        city2: 'Mardin · Diyarbakır',
        city2Href: 'https://www.google.com/maps/search/?api=1&query=Mardin',
        mapIntro: 'Bütün duraklar haritada — kesikli çizgiler haftayı çerçeveleyen dört uçuş, düz yeşil çizgiler araba. Soldaki üç kol İslahiye günleri; uzun doğu koşusu ve Kommagene-Maraş üzerinden dönüş ise ikinci yarı. İsmi için üstüne gel, saati için dokun.',
        vlogsKicker: 'Araştırma neyi değiştirdi',
        vlogsText: 'Bu planda dört şey istendiği gibi değil ve her birinin kontrol edilebilir bir gerekçesi var. Nemrut zirvesi aralık-mart arası karla kapalı — 2026 sezonu, üç metreye varan kar temizlendikten sonra 4 Nisan\'da açıldı — o yüzden perşembe Cendere, Karakuş, Arsameia ve Yeni Kale\'ye gidiyor; dördü de ücretsiz ve her gün açık. Kahramanmaraş\'tan Sabiha Gökçen\'e akşam uçuşu yok: 20:50 uçağı İstanbul\'a (IST) gidiyor, o yüzden Berk diğerleriyle Antep\'e geliyor. Pazartesi istendiği haliyle — Kilis, Antakya, İskenderun — 401 km ve 6 saat 58 dakika sürüş demek, oysa günde 9 saat 43 dakika ışık var; Kilis çıkıyor, Samandağ giriyor. Ve T.C. vatandaşları devlet müzelerine artık tek tek bilet alamıyor: yola çıkmadan dört adet Müzekart+ (200₺) alınacak. Bütün planın üzerine kurulduğu bir kural daha: Tripadvisor sıralaması bir yerin açık olduğunun kanıtı değildir. Rumkale, Gaziantep\'in 2 numaralı gezilecek yeri — ve 2018\'den beri kapalı.'
      },

      cats: {
        travel: 'Yol', sights: 'Gezi', museum: 'Müze', boat: 'Tekne',
        swim: 'Yüzme', food: 'Yeme içme', event: 'Akşam', stay: 'Konaklama'
      },
      filters: {
        all: 'Hepsi', boat: 'Tekne', swim: 'Yüzme', sights: 'Gezi',
        museum: 'Müzeler', food: 'Yemek', event: 'Akşam'
      },

      days: [
        { city: 'Gaziantep', title: 'Bir günde Antep', sub: 'Cumartesi 5 Ara · dokuzda beyran, gişe kapanmadan Zeugma, karanlıkta İslahiye' },
        { city: 'Adana', title: 'Pazar sabahı ciğer kahvaltısı', sub: 'Pazar 6 Ara · 06:10\'da çıkış — haftada bir var olan o sabah için' },
        { city: 'Antakya', title: 'Antakya, Samandağ, İskenderun', sub: 'Pazartesi 7 Ara · Kilis çıktı, bir Roma tüneli girdi' },
        { city: 'Şanlıurfa', title: 'Kadro ikiye katlanıyor, sonra Göbeklitepe', sub: 'Salı 8 Ara · sekiz buçukta havalimanı, on bir buçukta on iki bin yıl' },
        { city: 'Mardin', title: 'Mardin → Midyat → Hasankeyf → Batman', sub: 'Çarşamba 9 Ara · dört durak, yetişilecek bir uçak ve 16:30 gişesi' },
        { city: 'Diyarbakır', title: 'Surlar, sonra aşağı Kommagene', sub: 'Perşembe 10 Ara · zirve kapalı, öğleden sonra vadinin' },
        { city: 'Kahramanmaraş', title: 'Adıyaman, ardından Maraş', sub: 'Cuma 11 Ara · yeni açılan bir kale ve elde dövülen dondurma' },
        { city: 'Dönüş', title: 'Yesemek, kebap, veda', sub: 'Cumartesi 12 Ara · yamaca yayılmış üç yüz bazalt heykel, sonra üç ayrı veda' }
      ],

      acts: {
        gd1b1: { title: 'Gaziantep\'e iniş, 08:00', desc: 'Önder ve Eren sekizde yerde. Havalimanı merkeze 20 km — açık bir sabahta 25 dakika.', tip: 'Asıl risk trafik değil, sis. Gaziantep 678 metrede, açık ovada; ders kitabı radyasyon sisi sahası. 30 Ocak 2026\'da TAG otoyolunda siste 10 araçlık zincirleme kazada iki kişi öldü. 08:00 inişi 07:29 gün doğumundan sadece yarım saat sonra — sisli inerseniz merkeze 25 değil 50-60 dakika sayın.' },
        gd1b2: { title: 'Metanet\'te beyran', desc: 'Beyran Antep\'in kahvaltısı: kuzu, pirinç, bol sarımsak ve biber, on iki saat kaynamış bir suyun içinde. Kozluca Caddesi\'ndeki Metanet Lokantası, Bakırcılar\'ın hemen yanı, herkesin verdiği isim. Kişi başı ~370₺.', tip: 'Bu ilk iş, sonraki iş değil. Beyran en geç öğlene kadar servis ediliyor, sonra bitiyor — kahvaltı yemeği, tencereler boşalıyor. 370₺ Mayıs 2026 rakamı; Aralık 2025\'te 300₺\'ydi, bu aralığa ne olacağını da söylüyor.' },
        gd1b3: { title: 'Bakırcılar + Almacı Pazarı', desc: 'Bakırcılar Çarşısı ile şire-salça-pekmez pazarı 54 metre arayla, tek blok. Bir yanda çekiç sesi, öbür yanda kışlık.', tip: 'Dokuzla on iki arası gidin — çekiç o saatte çalışıyor, 17:00\'den sonra atölyeler seyreliyor. Ve aralık Almacı Pazarı\'nın en iyi ayı: şire, salça, pekmez hepsi yerinde. Ziyaretçi puanı (4,5) kalenin üstünde, 18:00\'de kapanıyor.' },
        gd1b4: { title: 'Zincirli Bedesten + kaleye dışarıdan', desc: 'Zincirli Bedesten 10 Eylül 2025\'te 80 dükkânla yeniden açıldı. Sonra kale — dışarıdan.', tip: 'Gaziantep Kalesi depremden beri kapalı. Bakanlığın kapalı birimler sicilinde birebir şöyle: "Gaziantep Kalesi | Restorasyon | 6 Şubat 2023 | Çalışmalar Tamamlanana Kadar". Restorasyon 10 Eylül 2025\'te ve tekrar 3 Aralık 2025\'te "tamamlandı" diye duyuruldu, kale hâlâ açılmadı; 2024-25\'te dört açılış tarihi kaçtı. Sur çevresindeki 1.200 metre serbest ve yürünüyor — ziyaret o.' },
        gd1b5: { title: 'Emine Göğüş + Hamam Müzesi', desc: 'Aynı sokağın 16 ve 20 numaralarında iki küçük müze: biri Antep mutfağı, öbürü hamam kültürü. Tek durak, bir saat.', tip: 'Bunlar Büyükşehir\'in, Bakanlığın değil — yani Müzekart geçmiyor, lira fiyatı geçerli: 15\'er ₺, nakit. Tam da bu tür duraklar için ufak para bulundurun.' },
        gd1b6: { title: 'Kurtuluş ve Ömeriye camileri', desc: 'Depremin iki yanında biten iki restorasyon: Kurtuluş Camii 8 Mayıs 2025\'te, Ömeriye Camii 8 Ağustos 2026\'da yeniden açıldı.', tip: 'Ömeriye\'nin restorasyonunda 1920-21 Antep kuşatmasından 17 Fransız kurşunu çıkmış; şimdi caminin içinde sergileniyor.' },
        gd1b7: { title: 'Panorama 25 Aralık Müzesi', desc: 'Büyükşehir\'in kuşatma panoraması, Derekenarı Caddesi\'nde — kalenin içindeki değil, o da kaleyle birlikte kapalı. 60₺, nakit.', tip: 'Burada Müzekart geçmiyor. Aralık 2025\'te burayı çeken bir gezgin: "Hiçbir müzede kendimi tarihin bu kadar içinde hissetmemiştim, az kalsın ağlıyordum."' },
        gd1b8: { title: 'Zeugma Mozaik Müzesi', desc: 'Günün bu şekli almasının sebebi. Dünyanın en büyük mozaik müzesi, merkeze 4,1 km; Çingene Kızı ve Birecik barajı suları altında bırakmadan önce Zeugma\'dan sökülen tabanlar burada. 90-120 dakika; 60 dakika koşturmaca olur.', tip: 'Gişe 16:30\'da kapanıyor ve cumartesi en kalabalık günü — sabah kaydıysa 08:30 açılışına gidin, beyranı sonraya bırakın. Tam tarife €12, Müzekart kapsıyor. Vakit kalırsa Gaziantep Arkeoloji Müzesi 15 Ağustos 2026\'da baştan düzenlenmiş olarak açıldı, 1,3 km ötede (€4, pazartesi kapalı — cumartesi sorun yok).' },
        gd1b9: { title: 'Antep kebabı', desc: 'Akşam yemeği şehrin bilinen işi: küşleme için Kebapçı Halil Usta, ali nazik için İmam Çağdaş. Kişi başı 700-900₺.', tip: 'Baklava alacaksanız: gerçek tereyağıyla baklava kilosu 2.000-2.500₺ — bunu kamera karşısında bir imalatçı söylüyor. "Bazı yerlerde 800 liraya da baklava görürsünüz, 600 liraya da." Kilosu 1.000₺\'nin altındaki baklava tereyağıyla yapılmamıştır. Koçak\'ın tek şubesi var ve tatlı sevmeyene iki porsiyon yediriyor; Güllüoğlu depremde hasar gördü, hızla restore edildi.' },
        gd1b10: { title: 'İslahiye\'ye yol', desc: 'O-52 üzerinden 88 km, 65-80 dakika, araç başına 36-45₺ geçiş.', tip: 'Sabah yola bakın. 22-23 Ocak 2026\'da Gaziantep-Nurdağı otoyolu tipide kapandı ve ~700 kişi otobüslerde mahsur kaldı. O-52, Sof Dağı omzunda 840 metreden ~1.100 metreye çıkıp 10 kilometrede 550 metre iniyor; buz o inişte tutuyor, üstelik tünelli.' },
        gd1s1: { title: 'İslahiye · Ozan Kağan\'ın evi', desc: 'Sekiz gecenin dördü burada ve hiçbiri para etmiyor — bu planın sadece üç otel araştırmasının sebebi bu.', tip: 'Bu akşam için bir alternatif, kimse yorgun değilse: Zeugma her gün 19:00-21:00 gece açık, Müzekart sahibi +200₺ ödüyor. Güneş 17:13\'te battığına göre karanlıkta yapılacak en iyi şey bu olabilir — ama iniş gününde sizi İslahiye\'ye 23:00 gibi koyar. Kararı Önder ve Eren versin.' },

        gd2b1: { title: '06:10\'da İslahiye\'den çıkış', desc: 'Gün doğmadan, D-825 ile Nurdağı üzerinden O-52\'ye. Yaklaşık iki saat; araç başına 73₺ geçiş.', tip: 'Bu kadar erken çıkmak programdan hiçbir şey çalmıyor — müze zaten dokuzda açılıyor — ama sizi sadece pazar günü var olan bir şeyin tam ortasına koyuyor.' },
        gd2b2: { title: 'Kazancılar\'da pazar ciğeri', desc: 'Yüz yıllık Adana geleneği: Kazancılar Çarşısı\'nın arkasında 200 metrelik ciğerciler sokağı. Ciğer gece yarısıyla 03:00 arasında şişleniyor, servis 05:00\'te başlıyor, insanlar 04:00\'ten kuyruğa giriyor — kimi başka şehirden geliyor, kimi geceden bekliyor. Tek bir pazar sabahı 400 kilo ciğer. Yanında çay değil şalgam.', tip: 'Ciğer 08:00-10:00 arası tükeniyor. Bu bir mecaz değil. Kel Mahmut 05:00\'te açıyor ve o saatlerde bitiriyor; rahat sivil pencere 09:00-11:00. Şalgamı acılı isteyin — gerçeği o; sevmiyorsanız az acılı.' },
        gd2b3: { title: 'Ulu Camii → Büyük Saat → Taşköprü', desc: 'On beş dakikalık bir yürüyüşün içinde üç durak, tek park. Seyhan üstündeki Roma köprüsü 2007\'den beri tamamen yaya.', tip: 'Adana Ulu Camii bu günde deprem sonrası durumu doğrulanamayan tek şey — 2025 veya 2026 tarihli hiçbir kaynak bir şey söylemiyor. Taşköprü\'ye 300 metre, yerinde göreceksiniz. Köprüde ısrarcı satıcılar var.' },
        gd2b4: { title: 'Adana Müze Kompleksi', desc: '1906 Milli Mensucat Fabrikası\'nda, 60.924 m² ve on bir bölüm — Türkiye\'nin ve Ortadoğu\'nun en büyük müzesi. Siz on bir bölümün ikisi için buradasınız: Arkeoloji ve Mozaik, yaklaşık iki saat. Müzekart kapsıyor, tarife €5.', tip: 'Navigasyona "Acıbadem Hastanesi" yazın, girişi müzenin kendi adından daha iyi buluyor. Pazartesi kapalı, yani pazar temiz — 09:00-19:00. Ve Misis\'in Nuh\'un Gemisi mozaiği burada: Misis Mozaik Müzesi 2020\'den beri kapalı ve eserler buraya taşındı, yani yolda durmanıza gerek yok.' },
        gd2b5: { title: 'Adana kebabı', desc: 'Kaya Kebap (4,8 / 265 — şehrin 1 numarası) veya İştah Kebap (4,5 / 179). Mezelerle düzgün bir oturuş kişi başı 700-1.000₺; bu Aralık 2025 basın verisi.', tip: 'Yüzevler\'e gitmeyin. 946 restoran içinde 137. sırada, 3,6 puan, Tripadvisor\'ın Adana ilk 30\'unda yok; 2024-25 yorumları fiyattan ve turiste kaymaktan şikâyetçi — bir Adanalı: "Adanalıyım, ilk defa salataya para ödüyorum." Öz Asmaaltı da ilk 30\'da değil. İkisi de "meşhur isim" kategorisi. Sokak dürümü ise 350-420₺.' },
        gd2b6: { title: 'Sabancı Merkez Camii + Merkez Park', desc: '20.000 kişilik, dokuz "fil ayağı" üstünde 32 metrelik kubbe, altı minare — ve Tripadvisor\'da Adana\'nın 1 numarası (4,7 / 554). Altında ücretsiz kapalı otopark var.', tip: 'İkindiye göre ayarlayın: 15:08. Ya 14:50\'den önce girin ya 15:45\'ten sonra. İyi pencereler: 09:30-12:15, 13:20-14:50, 15:45-17:10.' },
        gd2b7: { title: 'Yılankale — sadece ahşap platform', desc: 'D-400 kenarında, koni bir kayanın tepesinde 13. yüzyıl Ermeni kalesi. Otoparktan dış kapıya kadar ahşap yürüyüş yolları yeni; onun üstü bakımsız.', tip: 'İki sert gerçek. Bariyer kışın 16:00\'da iniyor (Şubat 2026 yorumu; yazın 18:00, sabah 09:00 açılıyor) — Adana\'dan 15:25\'ten sonra çıkarsanız kapalı bulursunuz. Ve platformun üstü cilalanmış kaya, korumasız uçurum, çöp ve çalı (Ocak 2026). Aralıkta sadece platform versiyonunu yapın: 35-40 dakika.' },
        gd2b8: { title: 'İslahiye\'ye dönüş', desc: 'Yaklaşık 110 dakika; batış 17:22, yani son 75 dakika karanlıkta. Gün toplamı ~346 km, 4s45 sürüş, 118-146₺ geçiş.', tip: 'Yol üstünde geçtiğiniz en iyi değer Kastabala: ücretsiz, her gün açık, Osmaniye\'den +20 km. Sığmayan ise Karatepe-Aslantaş: gidiş-dönüş 68 km ve 95 dakika sürüş, üstüne yerinde bir saat — zaten 4s15 araba kullanılan bir günden. Karatepe Osmaniye\'den ayrı bir yarım günü hak ediyor.' },

        gd3b1: { title: 'İslahiye → Antakya', desc: '106 km, yaklaşık 100 dakika. Günün yeniden kurulmak zorunda kaldığı şekil bu.', tip: 'İstendiği haliyle — Kilis, sonra Antakya, sonra İskenderun — gün 401 km ve 6 saat 58 dakika kış sürüşü demek; oysa 9 saat 43 dakika ışık var. Geriye üç şehre 2s45 kalıyor, yani park dahil şehir başına 55 dakika, ve tek başına Antakya 3-4 saat istiyor. Kilis\'in tek başına maliyeti +124 km ve +2s36, üstelik pazartesi orada biletli hiçbir şey açık değil: Kilis Müzesi 02.07.2026 makam oluruyla kapatıldı, Alaeddin Yavaşça Müze Evi de pazartesi kapalı.' },
        gd3b2: { title: 'Gastronomi Çarşısı\'nda kahvaltı', desc: 'Antakya\'nın yemeği taşındı. Odabaşı\'ndaki Gastronomi Çarşısı\'nda eski Antakya üslubunda 18 restoran var; bitişiğindeki Arasta Çarşısı\'nda 67 dükkân ve 135 araçlık otopark. ~400₺.', tip: 'Uzun Çarşı\'yı programa koymayın. Hâlâ aktif şantiye — Mart 2026\'da oraya giren bir gezgin film çekmekten men edilmiş ("yasak dediler") ve sahadaki tahmin "2-3 yıl daha". Gastronomi Çarşısı hem park hem yemek sorununu tek yerde çözüyor.' },
        gd3b3: { title: 'Necmi Asfuroğlu Arkeoloji Müzesi', desc: 'Hatay Arkeoloji kapalıyken Antakya\'nın arkeoloji müzesi bu. Museum Hotel\'in altında, yerinde korunuyor, ayrı girişi var; içinde dünyanın en büyük tek parça taban mozaiği (1.050 m²) ve Pegasus mozaiği. Her gün 08:30-17:00, gişe 16:30. €8, Müzekart kapsıyor.', tip: 'Yerini aldığı müze bu plandaki en keskin uyarı: Hatay Arkeoloji Müzesi, Tripadvisor\'da Antakya\'nın 1 numarası, 4,7 puan, 1.019 yorum — ve 6 Şubat 2023\'ten beri kapalı. Hedef 2025 sonundan 2026 sonuna kaymış durumda.' },
        gd3b4: { title: 'Habib-i Neccar Camii', desc: '27 Aralık 2025\'te, depremden 1.055 gün sonra, özgünlüğü korunarak yeniden ibadete açıldı. Çalışan cami, 4,5 / 316.', tip: 'Müzeye beş dakika yürüme mesafesinde ve ücretsiz.' },
        gd3b5: { title: 'St. Pierre Kilisesi (açıksa)', desc: 'Şehrin üstünde, Stauris dağında kayaya oyulmuş kilise, ~2 km yukarıda. €8, Müzekart.', tip: 'Kaynaklar çelişiyor ve çelişki açık tarafına yakın: muze.gov.tr "Müzekart Geçerlidir. Açık" diyor, DÖSİM "KAPALI" diyor. Kural gereği sitenin kendi sayfası kazanıyor ve destekleyici kanıt var — 29 Haziran 2025\'te orada geniş katılımlı bir Petrus-Pavlus ayini yapılmış. Tek telefon çözüyor: 0326 225 10 60.' },
        gd3b6: { title: 'Çevlik — Titus Tüneli', desc: 'Samandağ\'da Roma\'nın kayaya oydurduğu su tüneli; Beşikli Mağara tünel ağzına ~100 metre. €3, Müzekart. 75 dakika.', tip: 'Kaymayan bir şey giyin. Bir ziyaretçi birebir şöyle diyor: "Tünelin içine doğru yürüyecekseniz kaymayan bir şey giymenizi öneririm. Islak taşlar çok kayıyor. Düşme tehlikesi yaşayabilirsiniz." Islak oyma kanal, risk gerçek. Saat konusunda: muze.gov.tr 08:00-19:00 gösteriyor, o yaz değeri — Hatay Valiliği mevsimi açıkça yayınlıyor: "02 Ekim-14 Nisan (Kış Dönemi): 08:30-17:00". Kışı alın. Ayrıca burası bütün ilde depremden en az etkilenen durak.' },
        gd3b7: { title: 'İskenderun sahili', desc: 'Günün hoş sürprizi. Deprem sahili 80 santim çökertmişti, 10 ayda yeniden yapıldı; şimdi Tripadvisor\'da İskenderun\'un 1 numarası (4,4 / 86) — yürüyüş ve bisiklet yolları, yeşil alan. ~12 Eylül 2026\'dan beri üç yıl aradan sonra tekne turları da tekrar başladı.', tip: 'Kiliseleri programa koymayın. Aziz George Rum Ortodoks (441 yıllık) 13 Ağustos 2026 itibarıyla hâlâ restorasyonda, hedef yıl sonu; Aya Nikola da öyle; Müjde Katedrali Şubat 2023\'te neredeyse tamamen çöktü ve 2026\'da açılış haberi yok.' },
        gd3b8: { title: 'Künefe ve humus', desc: 'İskenderun künefesi ve humus — ki burada humus bir kahvaltı yemeği, sıcak servis ediliyor, çoğu zaman yumurtayla. ~350₺.', tip: 'Künefe konusunda bir İskenderunlu\'dan: gerçeği belediyenin karşısındaki 1942\'den kalma yerin tepsi künefesi. "Doktorlar Caddesi\'nde de bir tane var, o franchise… AVM\'de de var, oradaki künefeler yuvarlak geliyor, donmuş oluyor, orijinal değil." Yuvarlak ve tek tip künefe = dondurulmuş. Humus için Fener Caddesi\'ndeki Humusçu Vahit Usta klasik; Oktay Usta\'da humus tabağı Şubat 2026\'da 170₺.' },
        gd3b9: { title: 'Belen üzerinden İslahiye\'ye', desc: '109 km, ~102 dakika, Belen Geçidi\'nden. Gün toplamı 329 km ve 5s41 sürüş.', tip: 'Belen Tüneli henüz açılmadı — 8,5 kilometrelik tünel 21 Nisan 2026 itibarıyla inşaat halindeydi — yani trafik geçidi kullanıyor. Kaza geçmişindeki örüntü kar değil: sis, kaya düşmesi ve dağ yokuşunda çok yoğun TIR trafiği; devrilmeler kabaca aylık ve ~Mayıs 2026\'da bir kaya düşmesi Belen-Antakya yolunu çift yönlü kapattı. Antakya-İskenderun ayağını 52 değil 65 dakika sayın ve mümkünse karanlıkta sürmeyin.' },

        gd4b1: { title: 'Berk ve Üsame iniyor, araç alınıyor', desc: 'Önder ve Eren aracı almış, kapıda. Hangi uçağa binildiği bu günün şeklini iki saate kadar değiştiriyor: 06:50 inişiyle otele 17:40\'ta, 08:25 inişiyle 19:15\'te, 09:00 inişiyle 19:50\'de varılıyor.', tip: 'Kiralama şartlarını gişede değil, rezervasyonda halledin. Rota ~2.490 km ve Türkiye\'de yaygın günlük km tavanlarının hepsi patlıyor — 300 km/gün bile sekiz günde 90 km açık veriyor. Sözleşmeye şu yazdırılacak: "500 km/gün, toplam 4.000 km." Aşım kilometre başına 3,90-4,90₺. Ve kış lastiği standart değil, ücretli ek ürün: "Winter tires shall be provided as an additional product and service."' },
        gd4b2: { title: 'Gaziantep → Şanlıurfa', desc: 'O-52 otoyoluyla 157 km, yaklaşık iki saat, araç başına 102₺ geçiş.', tip: 'Göbeklitepe\'yi önce yapın, şehri sonra. Sapak çevre yolunun üstünde, yani Şanlıurfa\'ya hiç girmeden gidilip dönülüyor — erişim ayağı ikiye katlanmıyor ve ışık daha iyi oluyor.' },
        gd4b3: { title: 'Göbeklitepe', desc: 'Açık. Her gün açık, kapalı günü yok — kış dönemi (24 Ekim-1 Nisan) 08:30-17:00, gişe 16:30. Ziyaretçi merkezinde ücretsiz otopark, oradan kazı alanına ring servisi. €20, Müzekart kapsıyor; ayrı biletli Canlandırma Merkezi (€3) de dahil.', tip: 'Önce canlandırma merkezini yapın, sonra yukarı çıkın. Ve giyinerek gidin: alan açık bir sırt üzerinde ve hiç siperlik yok; aralıkta Urfa 4-13 °C, günlerin ~%19\'u yağışlı, rüzgâr ~12 km/s. Mont ve rüzgârlık tercih değil. İki şey doğrulanamadı: ring servisinin kışın çalışıp çalışmadığı ve ücreti — gişede sorun — ve erişim yolunda çalışma var, yüzey bozuk, yavaş gidin.' },
        gd4b4: { title: 'Urfa\'da öğle yemeği', desc: 'Ciğer burada 05:00 kahvaltısı, öğle yemeği değil — öğlen gidiyorsanız kebap isteyin. Zırh kebabı, İstanbul\'un "Urfa kebap" dediği acısız olan, buranın işi. ~300-400₺.', tip: 'Şehr-i Urfa (4,7 / 100), Hanehan (4,8 / 70, dört kişiye uygun) veya Astarte (4,9 / 48, Balıklıgöl\'e 500 m).' },
        gd4b5: { title: 'Urfa Arkeoloji + Haleplibahçe Mozaik Müzesi', desc: 'Tek biletle iki müze, binalar 150-200 metre arayla: Balıklıgöl\'den çıkan Urfa Adamı ve Amazon mozaikleri. Bir gezgin "belki de hayatımda gezdiğim en iyi arkeoloji müzesi" diyor. Her gün açık. Kombine €10, Müzekart.', tip: 'Bu müze bir veri hatası yüzünden az kalsın programdan düşüyordu, sebebini bilmekte fayda var: DÖSİM tarifesinde "ŞANLIURFA E MOZAİK MÜZESİ — KAPALI" diye bir satır var — adındaki fazladan "E"ye dikkat. Bozuk bir eski kayıt; Arkeoloji Müzesi için tarifede hiç satır yok, ve iki müzenin de kendi Bakanlık sayfası "Durum: Ziyarete açıktır" diyor. İkisi de açık.' },
        gd4b6: { title: 'Balıklıgöl, Ayn Zeliha, Dergâh', desc: 'Kutsal balık havuzları ve Mevlid-i Halil külliyesi. Ücretsiz ve geç öğleden sonra en iyi saati.', tip: 'Sadece havuzu değil, bahçenin tamamını yürüyün. Dergâh\'ta kıyafet kuralı geçerli ve namaz saatlerinde kalabalık oluyor. Günün bu kısmı karanlıkta da gayet iyi çalışıyor — hatta daha iyi. Bir gezgin Urfa akşamını şöyle anlatıyor: "Akşam her yer dumandı, kebap kokusu — sanki kebabın içine düştüm."' },
        gd4b7: { title: 'Gümrük Hanı\'nda menengiç kahvesi', desc: '16. yüzyıl gümrük hanı; 08:00-20:00 açık, girişi ücretsiz ve menengiç için oturulacak yer. ~100₺.', tip: 'Urfa\'da olmayanlar: reyhan şerbeti (o Mardin-Diyarbakır işi) ve keme, yani domalan — mevsimi mayıs sonunda bitiyor.' },
        gd4b8: { title: 'Çarşı — Sipahi Pazarı, Bedesten', desc: 'Salı günü tamamen açık; Adana\'daki pazar sorunu burada yok.', tip: 'Gün iyi gittiyse ve grup istiyorsa Cevahir Han sıra gecesini normal akşam servisinin içine katlanmış halde yapıyor — Vali Fuat Cad. No:5, 0414 215 93 77. 19:00\'da oturup 21:00\'de kalkmak lazım. Salı günü yapılıp yapılmadığı doğrulanamadı; bu bir telefon meselesi.' },
        gd4b9: { title: 'Mardin\'e devam', desc: 'Planda sizin belirlediğiniz bir geceyi değiştiren tek öneri bu. Viranşehir 94 km ve ~70 dakika; Mardin karanlıkta ~45 dakika daha.', tip: 'O fazladan saatin karşılığı: sabah 72 dakikalık transfer yok, Hasankeyf tam gün ışığında, Deyrulzafaran sığıyor, Eren\'in uçağından önce 30 dakika değil 1s53 pay var, ve Mezopotamya ovasına karşı uyanıyorsunuz. Maliyeti 3.209₺ (10.409₺\'ye karşı 7.200₺). Viranşehir gerçekten çalışıyor — ama tek bir kullanılabilir oteli var. Şanlıurfa\'da kalmak ise tek çalışmayan seçenek: uçak kaçıyor.' },
        gd4s1: { title: 'Mardin · Ramada Plaza', desc: 'Dört kişi, bir gece 10.409₺. Listedeki tek gerçek otoparklı otel — ve Eski Mardin\'de bu bir konfor değil, belirleyici özellik.', tip: 'Park şehrin bilinen derdi: 1. Cadde arabayla geçiliyor, ara sokaklar yaya ve eşek yolu. İki ayrı araştırma turuna rağmen eski şehirde arabanın nereye bırakılacağı net olarak çözülemedi — otelin kendi otoparkının parasını ödemeye değmesinin sebebi tam olarak bu. Telefonla teyit edin; bu bölgede ekran görüntüsü rezervasyon değildir.' },

        gd5b1: { title: 'Eski Mardin, yürüyerek', desc: 'Ulu Camii, Şehidiye Medresesi, Zinciriye Medresesi ve Kırklar Kilisesi — dördü de 550 metre içinde. Ulu Camii 10-15 dakika, Şehidiye 10-15, Kırklar 20, Zinciriye 30-40. Çoğu ücretsiz.', tip: 'Arabayı aşağıdaki ücretsiz otoparklara bırakıp yukarı çıkın. Mardin Müzesi (€7) hem pazar hem pazartesi kapalı, yani çarşamba temiz; gişe 17:10. Sakıp Sabancı Kent Müzesi pazartesi kapalı ama özel — Müzekart geçmiyor ve 2026 fiyatı bilinmiyor. Kasımiye Medresesi ücretsiz ve her gün açık, ama şehrin ~5 km aşağısında: yürüyüş değil, araba işi.' },
        gd5b2: { title: 'Deyrulzafaran Manastırı', desc: '5 km doğuda, Süryani Ortodoks manastırı. 09:00-17:00, her gün, sadece rehberli: 15-20 dakikalık tur, sonra serbest zaman. Kapıda ücretsiz şal ve ücretsiz otopark. 100₺ — Müzekart geçmiyor.', tip: 'Sürüş maliyeti ~36 dakika ve neredeyse yol üstünde. Bu durak sadece Mardin\'de yatıldığı için var: Viranşehir\'den başlanırsa sığmıyor.' },
        gd5b3: { title: 'Midyat\'a yol', desc: '67 km, 58 dakika.', tip: 'Buradan doğuya mesafeler eski cetvellerden değil, gerçek yol geometrisiyle OSRM\'den alındı — neden önemli olduğunu Hasankeyf ayağı anlatıyor.' },
        gd5b4: { title: 'Midyat', desc: 'Devlet Konuk Evi (dizideki konak), Kültür Evi, Estel ve telkâri çarşısı. Girişler 50-100₺.', tip: 'Resmî saatler, belediyenin kendi sayfasından: Devlet Konuk Evi hafta içi 08:00-20:00; Kültür Evi, Kent Müzesi (Estel Hanı), Midyat Evi ve Turizm Bürosu 08:00-17:00. Çarşamba dahil her gün açık. Midyat Mardin\'den ucuz, ve telkâri için doğru yer Estel\'deki Kuyumcular ve Gümüşçüler Çarşısı. Oturarak değil, hızlı bir öğle: Durak Pide Lahmacun veya Kumrucu Özgür. 20 km doğudaki Mor Gabriel bu güne sığmıyor.' },
        gd5b5: { title: 'Hasankeyf\'e yol', desc: '41 km, 41 dakika.', tip: 'Taşınmaya değer bir mesafe uyarısı: KGM\'nin "Hasankeyf-Batman Havalimanı 39 km" değeri yanlış. Ilısu barajı eski güzergâhı sular altında bıraktı, yol artık "Eski D955" üzerinden dolaşıyor — 57 km ve 58 dakika. 2020 öncesi bütün Hasankeyf mesafeleri sistematik olarak kısa.' },
        gd5b6: { title: 'Hasankeyf', desc: 'Fotoğraf molası değil. Eski şehir 2020\'de sular altında kaldı ama kale tarafı hiç su almadı ve Aralık 2021\'de yeniden açıldı; Arkeopark ve Şaab Vadisi Ağustos 2025\'te, on mağara Aralık 2025\'te açıldı, yüz tanesi daha planlanıyor. 2025\'in dokuz ayında 500.000 ziyaretçi. €5, Müzekart. Gişe 16:30\'da kapanıyor ve bu günün bağlayıcı kısıtı uçak değil, o gişe.', tip: 'Yeni Hasankeyf Kültür Parkı\'nda, hepsi tek yürüyüşte: 1473 tarihli Zeynel Bey Türbesi — 1.100 ton, 2 kilometre, 8 saatte, 150 tekerlekli taşıyıcıyla ve tek parça halinde taşındı; dünyada tek parça taşınmış en büyük kültür varlığı — Artuklu Hamamı (1.300 ton, yine tek parça), 1408 tarihli El-Rızk Camii minaresi (çift sarmal merdiven: çıkan inenle karşılaşmıyor), Süleyman Han Camii ve İmam Abdullah Zaviyesi. Vlogların "yeni asfalt döşendi" iddiası yanlış: 1 Nisan 2026 itibarıyla müze-liman arası 1,5 km hâlâ parke ve çukurlu — tur şirketleri bu yüzden programdan çıkardı, ve arabayla gelmenin avantajı tam burada. Tekne turu yok. Pazartesi kapalı; müzede film çekmek yasak. İki açık soruyu tek telefon çözüyor, 0488 502 49 30: €5\'lik bilet kaleyi kapsıyor mu, ve yukarı arabayla çıkılıyor mu.' },
        gd5b7: { title: 'Batman Havalimanı — Eren\'i bırak', desc: '57 km, 58 dakika. Eren PC 2371 ile 20:35\'te kalkıyor; plandaki "akşam sekiz gibi"den 35 dakika sonra — bedava pay.', tip: 'Küçük havalimanı, iki saat bol. Araç iade masaları ve kapı kapanış saatleri araştırılamadı: Pegasus\'un sayfaları JS ile geliyor ve denenen her URL 404 verdi. Müze için Batman merkeze sapmayın — Batman Müzesi kapalı, ve şehir tarihi çarşısı olmayan, planlı bir petrol şehri.' },
        gd5b8: { title: 'Diyarbakır\'a devam', desc: 'Karanlıkta 98 km, ~1s19. Gün toplamı 362 km ve 5s08 sürüş.', tip: 'Malabadi Köprüsü bu rotada değil — Batman\'ın 31 km kuzeyinde, Silvan yönünde, Diyarbakır ilinde. Listeden çıkarın.' },
        gd5s1: { title: 'Diyarbakır · Turistik Palas', desc: 'Üç kişi 13.649₺. 2025\'te yeniden yapılmış; kapalı garaj ve vale var.', tip: 'Diyarbakır\'da merkezdeki her şey yürünüyor — tek istisna On Gözlü Köprü — o yüzden burada otelden beklenen şey konum değil, arabayı güvenle bırakabilmek.' },

        gd6b1: { title: 'Hasan Paşa Hanı\'nda kahvaltı', desc: 'Ulu Camii\'nin karşısındaki 16. yüzyıl kervansarayı; şehrin kahvaltı kurumu. Bir kişilik ~600₺ ve iki kişiye yetiyor.', tip: 'Han\'ın kafelerinin deprem sonrası fiilen nasıl işlediği doğrulanamadı ve 2025-26 fiyatı yok. Alternatif: Kahvaltıcı Edip.' },
        gd6b2: { title: 'Surlar: Dağkapı\'dan Mardinkapı\'ya', desc: 'Dağkapı → Ulu Camii → Dört Ayaklı Minare → Surp Giragos → Mardinkapı ve Keçi Burcu. Ücretsiz, ~2s30.', tip: 'Dürüst uyarı: bu yürüyüşün hangi kısımlarının açık olduğu doğrulanamadı. 2015-16 Sur olaylarındaki yıkım (Alipaşa, Lalebey, Savaş, Cevatpaşa, Fatihpaşa, Hasırlı) artı 2023 deprem hasarı, sur içinin büyük bölümünü çitli kamulaştırma/şantiye alanı yapmış durumda ve hangi sokakların yürünebildiğine dair tarihli kaynak yok. Rotayı makul ama teyitsiz kabul edin, yerinde esneyin. Surp Giragos Ekim 2022\'de restorasyon sonrası açıldı ama güncel ziyaret saatleri teyitsiz — Türkiye\'deki Ermeni kiliseleri genelde ayin saatlerinde veya randevuyla açık. Mar Petyun Keldani Kilisesi 20₺.' },
        gd6b3: { title: 'Diyarbakır Arkeoloji Müzesi', desc: 'İçkale\'de, vakit kalırsa. €3, Müzekart; pazartesi kapalı, perşembe temiz.', tip: 'Bakanlığın kendi notu: "TEMATİK TEŞHİR SALONU GEÇİCİ SÜRE İLE ZİYARETE KAPATILMIŞTIR." Cahit Sıtkı Tarancı Evi ise çelişkili: Bakanlık sayfası "AÇIK", DÖSİM "KAPALI" diyor. 0412 224 67 40 hem onu hem sur içinde hangi güzergâhın yürünebildiğini cevaplıyor.' },
        gd6b4: { title: 'Öğlen ciğer', desc: 'Ciğer burada bir din. Yerel sıralama: Ciğerci Remzi #1, Ciğerci Neşet #2 (Google 4,9, minik, 300+ yorum), Ciğerci Xale Meheme #3. Dört şişlik porsiyon Haziran 2026\'da 420₺.', tip: 'Oturarak yemek isterseniz: Yenikapı Sokak\'taki kadın kooperatifinde (Evsel Yöresel Lezzetler) kaburga dolması, meftune ve gırık — üç porsiyon ~800₺. Soğuk baklava burada icat edildi; Hacı Levent\'in Çamlıca şubesi yapıyor, diğeri yapmıyor — kilosu 1.400₺, gerçi iki dilim 240₺ ve kamera karşısında "pahalı" denmiş.' },
        gd6b5: { title: 'Diyarbakır → Kâhta', desc: '163 km, 2s16. 230 km değil — o rakam yanlış; bu KGM\'nin resmî cetveli.', tip: 'Nemrut zirvesi kapalı ve bu, plandaki en iyi kanıtlanmış gerçek. 2026 sezonu 7 Nisan\'da açıldı; yol 4 Nisan\'da üç metreye varan kardan temizlendi ve heykeller hâlâ yarı yarıya kar altındaydı. İhlas Haber Ajansı: "Her yıl kış mevsiminde yolu 4-5 ay kapanan Nemrut Dağı turizm sezonunu kapattı." Bakanlığın canlı metni, birebir: ören yerinin "kış şartlarına bağlı olarak Aralık, Ocak, Şubat, Mart aylarında açık kapalılık durumları değişeceğinden" gitmeden önce Müze Müdürlüğü\'nden bilgi alınması gerekiyor. AA, turistlerin sis ve tipide zirveye 3 km kala geri çevrildiğini yazdı. İki yamaç da kapalı: hem Kâhta hem Malatya tarafı. Tekrar kontrol edecek olan için iki tuzak: muze.gov.tr "Durum: AÇIK, 09:00-18:00" gösteriyor — bu idari bir bayrak, canlı kar raporu değil; ve "Nemrut" iki ayrı yer, arama çoğunlukla Bitlis/Tatvan\'daki Nemrut Krater Gölü\'nü getiriyor. Şunu da not edin: sorun hiçbir zaman saat değildi — Diyarbakır\'dan 12:00\'de çıkan zirveye 16:30\'da varırdı. Sorun kardı, ve karanlıkta 2.000 metreden 33 km dağ yolu inmekti.' },
        gd6b6: { title: 'Cendere Köprüsü', desc: 'Kâhta\'ya ~20 km; Septimius Severus için 16. Lejyon\'un yaptığı Roma köprüsü. Ücretsiz, açık, yol kenarı, 30 dakika.', tip: 'Artık yaya — yanına yeni köprü yapılmış. Alacakaranlıkta fotojenik, ki elinizdeki ışık da o olacak.' },
        gd6b7: { title: 'Karakuş Tümülüsü', desc: 'Kommagene hanedanının kadınlarının tümülüsü; sütunlar ve kartal. Ücretsiz, görevlisiz, 25 dakika.', tip: 'Otoparktan 750 metre, yaklaşık sekiz dakika yürüyüş.' },
        gd6b8: { title: 'Adıyaman\'a iniş', desc: '34 km, 37 dakika.', tip: 'Karanlıktan önce depoyu doldurun. Kâhta\'da benzin istasyonları akşam kapanıyor — "adamlar akşam olmuş diye kapatmış gitmişler."' },
        gd6s1: { title: 'Adıyaman · Adıyaman Park Hotel', desc: 'Gezinin en ucuz gecesi: bir triple oda, kahvaltı dahil, 4.249₺. Google 4,8 — 864 yorum, en tazesi ~4 Eylül 2026.', tip: 'Burada üç kişilik tek oda iki odayı açık ara yeniyor — 4.249₺\'ye karşı White Star\'ın iki odalı 8.234₺\'si. Ayrı oda isteniyorsa doğru seçim White Star 8.234₺: kahvaltı, otopark ve ücretsiz iptal. Rabat Resort\'tan fiyatı ne kadar cazip görünürse görünsün kaçının: enuygun puanı 5,3/10; Eylül 2026 "temizlik sıfır, klima dahi yok"; Nisan 2026\'da sıcak su yok ve prizler duvardan sökülmüş; üstelik kırsalda ve düğün salonu olarak çalışıyor. Booking\'deki "8,7 / 6 yorum" ise yeniden açılış artefaktı — az yorumlu yüksek puana güvenmeyin.' },

        gd7b1: { title: 'Perre Antik Kenti', desc: 'Kommagene\'nin beş şehrinden biri, merkeze 5 km kuzeyde — kaya mezarları ve çeşme. Her gün açık, 08:00-17:30. €3, Müzekart. 50 dakika.', tip: '2025\'te buraya 5,8 milyon ₺ kazı ve koruma ödeneği ayrılmış. Acele etmeyin: Kommagene eserlerinin olacağı Adıyaman Müzesi kapalı.' },
        gd7b2: { title: 'Musalla Camii', desc: 'Restorasyon sonrası yeniden açıldı. Euronews Türkçe, 4 Eylül 2026: merkez Musalla Camii, Besni Kurşunlu Camii ve Abuzer Gaffari Mescidi ve Türbesi yeniden hizmete girdi — kubbe, minare, kurşun kaplama.', tip: 'Adıyaman bir sabah değil, ~2 saat; plan bunu bilerek söylüyor. Şehir merkezi ülkenin en ağır yıkılan yerlerinden ve hâlâ büyük ölçüde şantiye. Şantiyeler çoğu yerde çitsiz, yerde açıkta demir var — ayağınıza dikkat.' },
        gd7b3: { title: 'Sokakta çiğköfte', desc: 'Lavaşa sarılıp yürüyerek yeniliyor, 50-100₺. Bir gezginin 10/10 verdiği tek şey. Çiğköfteci İbo, Atatürk Bulvarı, Şahinbey Çarşısı 28.', tip: 'Diğer isimler — hepsinin fiyatı 2025 tarihli, yani bugün çok daha yüksek: Meşhur Kebab Salonu Hasan Usta (Gölbaşı Cd. 1), Adıyaman kavurması için Adıyaman Sofrası (Gölbaşı Cd. 58/A), Güloğlu Pastanesi (Gölbaşı Cd. 104).' },
        gd7b4: { title: 'Adıyaman → Kahramanmaraş', desc: 'D-360 ile Gölbaşı ve Türkoğlu üzerinden 162 km, ~2s10.', tip: 'Bu günün sorunu korkulanın tam tersi. TK 2207\'den (20:50) geriye doğru hesaplayınca Maraş merkezden 19:35\'te çıkmak gerekiyor — ve Adıyaman\'dan 08:30\'da çıkan Maraş\'a 12:30 gibi varıyor. Bu, Maraş\'ta yedi saat demek; depremden üç yıl sonra bir şehrin kaldırabileceğinden fazla. Sabahı sıkıştırmayın, yayın. Yol üstündeki Gölbaşı (Adıyaman\'a 63 km) mola için mantıklı.' },
        gd7b5: { title: 'Kahramanmaraş Kalesi', desc: '16 Eylül 2026\'da yeniden açıldı — bu araştırmadan iki gün önce. Çöken güneybatı surları özgün tekniğiyle yeniden örülmüş, zemin güçlendirilmiş, hasarlı ziyaretçi merkezinin yerine yenisi yapılmış, yürüyüş yolları düzenlenmiş; içinde kafe var. Şehrin artık en güçlü durağı burası.', tip: 'Ücreti yayımlanmadı. Şehrin diğer çapası ise gitti: Germanicia Mozaikli Alan "geçici olarak ziyarete kapalı" — iki bağımsız resmî kaynak aynı fikirde. turkishmuseums.com açık gösteriyor ama o kaynak burada bayat.' },
        gd7b6: { title: 'Kahramanmaraş Müzesi', desc: 'Açık, her gün, 08:00-17:00, gişe 16:30, Azerbaycan Bulvarı 35. €3, Müzekart. Maraş stelleri ve Domuztepe buluntuları.', tip: 'Deprem üssü olan ilde açık olan tek devlet müzesi — ve iyi bir müze.' },
        gd7b7: { title: 'Kapalı Çarşı, Semerciler, Bakırcılar', desc: 'Tarihî çarşı bölgesi.', tip: 'Yeniden açıldığına dair olumlu haberler var ama ne kadarının fiilen çalıştığı doğrulanamadı. Aramada dikkat: "bakırcılar çarşısı yeniden açıldı" sonuçlarının çoğu Maraş\'la değil Malatya\'yla ilgili. Kuyumcular pazar kapalı, cuma sorun değil. Semerciler Çarşısı\'ndan alınacaklar: tarhana cipsi (yoğurt, dövme, kekik ve badem; salkımda güneşte kurutuluyor), frik, Maraş peyniri, narçiçeği, acı biber.' },
        gd7b8: { title: 'Emek Pastanesi\'nde Maraş dondurması', desc: 'Üç kuşak, ~100 yıllık tarif, yerinde dövülüyor. Eylül 2026 fiyatları — bu araştırmadaki en taze veri: bir top dondurma 30₺, meyan şerbeti 30₺, çörek 20₺, Şam tatlısı 40₺. Bir gezgin bunların hepsini 200₺\'ye yiyip 60₺ artırmış.', tip: 'Maraş bu rotanın en ucuz şehri ve farkı da az değil. Aynı gezgin: "Burası Kahramanmaraş. Her şeyi ucuz… gerçekten her şeyin hak ettiği fiyata satıldığı müthiş bir şehir." Dövme dondurmacılardan hangilerinin fiilen çalıştığı doğrulanamadı, Emek hariç — o Eylül 2026 kaynaklı, sağlam. Diğer isimler: Hacı Mehmet Can, Yaşar Usta. Et için Hacı Milcan; lahmacun için Yazı girişindeki İsmet Usta — bir Maraşlı: "Lahmacun yiyecekseniz tek adres orası."' },
        gd7b9: { title: 'Akşam yemeği', desc: 'Adana dürüm için Koç Kebap, ya da çarşıda ne çıkarsa. 250-350₺.', tip: 'Kalın giyinin — Maraş yüksek ve soğuk. "Maraş o kadar da sıcak değilmiş, burası soğuk."' },
        gd7b10: { title: 'Berk ayrılıyor', desc: 'Bu akşamın şeklini belirleyen karar, ve gününde değil şimdi verilmesi gerekiyor.', tip: 'Kahramanmaraş\'tan Sabiha Gökçen\'e akşam uçuşu yok. Olan şey TK 2207: KCM 20:50 → İstanbul IST 22:35, haftanın yedi günü, cuma teyitli — saat aynı, havalimanı farklı. KCM→SAW diye tek şey Pegasus PC 2437, ayda ~4 sefer, sabah 07:20. Öneri: Berk\'i Antep\'e getirin. GZT→SAW haftada ~25 sefer (Pegasus 16:10, 17:50, 20:05, 20:20, 20:30, 22:10, 22:25, 22:45, 23:00; AJet 21:25, 21:35, 21:40, 22:20), Maraş-Antep 78 km ve ~1 saat, ve Önder\'le Üsame zaten o yöne gidiyor. Maraş seçilirse: havalimanı merkeze 5 km, 15 dakika sürüş, 60 dakika check-in — yani merkezden 19:35\'te çıkış.' },
        gd7b11: { title: 'İslahiye\'ye yol', desc: 'O-52 ile 69 km, ~1 saat, geçiş ~45₺.', tip: 'Ozan Kağan\'ın evinde son gece.' },

        gd8b1: { title: 'İslahiye → Yesemek', desc: '23-25 km ama ~45 dakika: virajlı köy yolunda ortalama 32 km/s.', tip: 'Son yaklaşmada Google Maps ile yol tabelaları çelişiyor — bir gezgin çıkmaz sokağa yönlendirilmiş. Tabelaları takip edin. Aralıkta yol durumu doğrulanamadı ve orada kar yağıyor (25.01.2026), o yüzden sabah yol durumuna bakın.' },
        gd8b2: { title: 'Yesemek Açık Hava Müzesi', desc: 'Açık, 08:00-17:00, her gün — ve ücretsiz, yerli-yabancı ayrımı olmadan. Bakanlığın kendi metni: Yakın Doğu\'nun en büyük taş ocağı ve heykel atölyesi, UNESCO Dünya Mirası Geçici Listesi\'nde. Nar ve incir ağaçlarının arasında bir yamaca yayılmış ~300 bazalt heykel; yanında Tahtaköprü baraj göleti yaban hayatı alanı. 0342 875 10 55.', tip: 'Öğleye doğru gidin, geç öğleden sonraya değil. Aralıkta günde ~3,5 saat güneş var ve koyu bazalt kabartmalar okunabilmek için yan ışık istiyor.' },
        gd8b3: { title: 'İslahiye\'ye dönüş', desc: '45 dakika.', tip: 'Zincirli Höyük\'ü (Sam\'al) programa koymayın. Bakanlığın Gaziantep listesinde hiç yok — ildeki altı kayıt Zeugma Mozaik, Gaziantep Kalesi, Rumkale, Yesemek, Gaziantep Arkeoloji ve Zeugma Örenyeri — bu da onun ziyaretçi düzeni olmayan aktif bir kazı olduğunu kuvvetle gösteriyor. İslahiye Kalesi: durumu bilinmiyor.' },
        gd8b4: { title: 'İslahiye\'de veda kebabı', desc: 'Gezinin bitmesi istenen öğle yemeği. 400-600₺.', tip: 'Burada isim önerilmiyor çünkü araştırılamadı — Ozan Kağan\'a sorun; bu tam da yerlinin bildiği, internetin bilmediği şey. Hatırlatma: İslahiye ve Nurdağı, Gaziantep\'in 2023\'te en ağır vurulan ilçelerindendi.' },
        gd8b5: { title: 'İslahiye → Gaziantep Havalimanı', desc: '105 km, 1s20, geçiş 36-45₺. 12:50\'de çıkın — günün sert kenarı bu.', tip: 'Üsame\'nin uçağından geriye doğru: XQ 7647 GZT→AYT 15:15\'te kalkıyor, yani 14:15\'te havalimanında, yani İslahiye\'den 12:50\'de çıkış, yani öğle yemeği 11:45-12:45 ve Yesemek 09:45-11:15. Çalışıyor ama payı yok. O hatta tek operatör SunExpress ve cumartesi seferi teyitli.' },
        gd8b6: { title: 'Havalimanı: aracı iade et, veda', desc: 'Üsame 15:15\'te Antalya\'ya, Önder 16:10\'dan itibaren bol seçenekle Sabiha Gökçen\'e.', tip: 'Kiralama yeniden kurgulanabiliyorsa aracı 12:00\'de değil 10:00\'da iade edin — Türkiye\'de kiralama 24 saatlik bloklar hâlinde faturalanıyor, üç saat tam bir gün ekliyor: ~2.960₺. Programı da bozmuyor, zaten 14:15\'te havalimanında olmak gerekiyor. Vakit yaratılabilirse: XQ 7647 salı günü 21:22\'de de uçmuş — kış tarifesinde cumartesi geç dalga var mı, kasımda bakmaya değer; varsa bütün gün rahatlar.' }
      },

      bookings: {
        k1: 'Önce Berk\'in 11 Aralık uçuşuna karar verin — bütün cuma akşamının şeklini o belirliyor. Kahramanmaraş\'tan Sabiha Gökçen\'e akşam uçuşu yok. TK 2207 KCM\'den 20:50\'de kalkıyor ama İstanbul\'a (IST), Sabiha Gökçen\'e değil; haftanın yedi günü var. KCM→SAW diye tek şey Pegasus PC 2437, ayda ~4 sefer, sabah 07:20. Öneri: Berk\'i Antep\'e getirin — 78 km, ~1 saat; GZT→SAW haftada ~25 sefer, 16:10\'dan 23:00\'a kadar — ve Önder\'le Üsame zaten o yöne gidiyor.',
        k2: 'Aracı ayırtın ve sözleşmeye "500 km/gün, toplam 4.000 km" yazdırın. Rota ~2.490 km ve Türkiye\'de yaygın günlük tavanların hepsi patlıyor: 150 km/gün 1.288 km, 250 km/gün 488 km açık veriyor, 300 km/gün bile sekiz günde 90 km açık. Aşım kilometre başına alınıyor — Ekonomi 3,90₺/km, Konfor 4,90₺/km — ve bu mesafede dört haneli bir sürprize dönüşüyor. Not: Garenta\'nın Ekonomi/Konfor sınıfında 4.000 km aynı zamanda aylık sert tavan.',
        k3: 'Kış lastiği standart değil, ücretli ek ürün — gişede sözlü söze değil, ücretiyle birlikte rezervasyona işletin. Garenta\'nın kendi şartları: "Winter tires shall be provided as an additional product and service and come with an associated cost… subject to regional variations and office stock limitations." Bunu formalite olmaktan çıkaran iki şey var: Gaziantep sektörün lastik takma sınırının sıcak tarafında, ve stok ilk kar uyarılarıyla tükeniyor — ki aralık tam o pencere. Hukuken hususi ve kiralık binekler muaf (KTK 65/A); pencere tebliğde 1 Aralık-1 Nisan, 2026 haberlerinde 15 Kasım-15 Nisan olarak geçiyor — iki okumada da 10-12 Aralık içeride. Zincir kış lastiğinin yerine geçmiyor. Telefonda söylenecek cümle: "5-12 Aralık için kış lastiği takılı araç istiyorum, ücreti nedir, rezervasyona işleyebilir misiniz?"',
        k4: 'Aracı 12:00\'de değil 10:00\'da iade edecek şekilde ayırtın — bedavaya ~2.960₺. Türkiye\'de kiralama 24 saatlik bloklar hâlinde faturalanıyor, yani 09:00 alıp 12:00 bırakmak üç saat için tam bir gün ekliyor. İadeyi 10:00\'a çekmek 8 Aralık kiralamasını 5 faturalanan günden 4\'e düşürüyor (~11.840₺). Hiçbir şeyi bozmuyor: cumartesi programı zaten 14:15\'te havalimanında olmayı gerektiriyor. İki süre, iki fiyat, ikisi de 18 Eylül canlı: 5 Aralık alım, 8 faturalanan gün ≈ 23.700₺ (broker, Opel Mokka, 18.125₺); 8 Aralık alım, 5 faturalanan gün ≈ 14.800₺ (broker 11.517₺). Mokka rakamları tam sizin tarihleriniz için canlı teklif; Garenta rakamları yayımlanmış "günlük 2.960₺\'den başlayan" fiyattan türetilmiş tahmin. Ayrıca teyit edin: HGS bakiyesi dolu mu, depozito, ikinci sürücü ücreti, yakıt politikası.',
        k5: '8 Aralık gecesine karar verip — Viranşehir mi Mardin mi — sonra ayırtın. Mardin öneriliyor: Ramada Plaza, 10.409₺, listedeki tek gerçek otoparklı otel; Eski Mardin\'de bu tek başına belirleyici. Viranşehir\'den 3.209₺ pahalı ve ~45 dakika fazla gece sürüşü demek, karşılığında çarşambanın tamamını geri alıyorsunuz. Viranşehir çalışıyor ve tam olarak bir kullanılabilir oteli var: Yükselhan, 2 oda 7.200₺, kahvaltı ve otopark dahil — iki platform bağımsız olarak aynı rakamı veriyor. Tella Otel gerçek ve çalışıyor ama bu tarihlerde online envanteri yok: sadece telefon, 0414 471 4444.',
        k6: 'Yola çıkmadan dört adet Müzekart+ alın — tanesi 200₺, toplam 800₺, Museums of Türkiye uygulamasından. Bu bir tasarruf değil, tek giriş yolu: Bakanlığın e-bilet motorunda birebir "T.C. vatandaşları müze ve örenyerlerini yalnızca MüzeKart ile ziyaret edebilirler" yazıyor. İki günde kendini ödüyor — tek başına Göbeklitepe gişede €20 — ve Zeugma, Urfa\'nın iki müzesi, Adana, Hasankeyf, Perre, Maraş, Antakya ve Çevlik\'i kapsıyor. Kapsamayanlar: Panorama 25 Aralık (60₺, nakit), Emine Göğüş ve Hamam Müzesi (15\'er ₺, belediye), Deyrulzafaran (100₺), Mor Gabriel (200₺) ve Mardin\'deki Sakıp Sabancı Kent Müzesi.',
        k7: 'Diyarbakır ve Adıyaman otellerini ayırtın. Diyarbakır: Turistik Palas, üç kişi 13.649₺, 2025\'te yeniden yapılmış, kapalı garaj ve vale. Adıyaman: Adıyaman Park, bir triple oda kahvaltı dahil 4.249₺, Google 4,8 / 864. Adıyaman\'da stok dar, bırakmayın. Ve hepsini telefonla teyit edin: bu araştırma, OTA\'larda satışta görünen ama fiilen var olmayan beş otel buldu — Kâhta\'daki Zeus ~2019\'da yıkılmış ve yerine dükkânlar yapılmış, Ve Hotels Adıyaman kapalı ve zincirin kendi sitesinden çıkarılmış, Beyazsaray artık düğün salonu, Nemrut Kervansaray\'ın son ilan ettiği sezon 2014 ve Google Maps kaydı bile yok, Antiochos\'un kendi yorumları hâlâ tadilatta diyor. Bu bölgede bir otelin OTA\'da görünmesi var olduğunun kanıtı değil.',
        k8: 'Kasım sonunda teyit turunu yapın — dokuz numara, her biri bu planın çözemediği bir şeyi cevaplıyor. 0416 216 29 29 Adıyaman Müze Müdürlüğü: Nemrut yolu (Bakanlık kışın buraya sormayı açıkça emrediyor), ayrıca Arsameia, Yeni Kale ve Perre. 0414 313 15 88 Şanlıurfa Müzesi: Göbeklitepe kış ring servisi çalışıyor mu ve ücretli mi; kapalı örenyerinden ayrı olarak Harran köyü ziyarete açık mı; Karahantepe. 0488 502 49 30 Hasankeyf: €5\'lik bilet kaleyi kapsıyor mu, yukarı arabayla çıkılıyor mu. 0326 225 10 60 Hatay: St. Pierre açık mı. 0342 325 27 27 Zeugma: gerçekten her gün açık mı, gece müzeciliği aralıkta sürüyor mu. 0412 224 67 40 Diyarbakır: Tarancı Evi, ve sur içinde hangi güzergâh yürünebiliyor. 0482 212 16 64 Mardin Müzesi. 0328 825 06 74 Karatepe: kış saati. 0414 215 93 77 Cevahir Han, Urfa: salı akşamı sıra gecesi var mı.',
        k9: 'Her sabah, motoru çalıştırmadan iki kontrol. kgm.gov.tr\'de KGM Yol Durum Bülteni — özellikle 5 Aralık (Antep→İslahiye, O-52 tipi riski), 7 Aralık (Belen Geçidi), 10 Aralık (Diyarbakır-Siverek platosunda buzlanma) ve 12 Aralık (Yesemek köy yolu). Ve meteoroloji uygulamasında Diyarbakır, Adıyaman ve Kahramanmaraş için buzlanma ve sis uyarıları. Harran ve Mezopotamya ovaları kışın çok yoğun sis yapıyor ve en kötüsü şafakta — bu doğrudan 8, 9 ve 10 Aralık\'ın erken çıkışlarını vuruyor; Nemrut\'ta turistlerin geri çevrilme sebebi de sisti.',
        k10: 'Çantaya: mont ve rüzgârlık (Göbeklitepe\'nin sırtında hiç siperlik yok, Maraş yüksek ve soğuk); kaymayan ayakkabı — bu bir konfor değil güvenlik maddesi: Titus Tüneli ıslak oyma taş ve bir ziyaretçi düşme tehlikesinden açıkça bahsediyor, Yılankale\'de platformun üstü cilalı kaya ve korumasız uçurum; nakit — Müzekart kabul etmeyen 60₺\'lik Panorama, Deyrulzafaran\'ın 100₺\'si, 15₺\'lik belediye müzeleri ve bütün çarşılar için; dört Müzekart telefonlarda hazır; ve powerbank. Yemek için kişi başı günde 1.200-1.500₺ gerçekçi bir orta nokta — Adana ve Antep günleri üstüne çıkar, Maraş ve Urfa günleri altında kalır.'
      },

      map: {
        htmlTitle: 'Güneydoğu — rota',
        panelTitle: 'Rota',
        panelDates: '5-12 Aralık',
        viewAll: 'Tüm rota',
        legendLabel: 'Gösterge ▾',
        flight: 'Uçuşlar',
        train: 'Araba, ~2.490 km',
        catSights: 'Gezi ve müzeler',
        catFood: 'Yeme içme',
        catFiesta: 'Günün asıl olayı',
        catStay: 'Konakladığımız yer',
        sawLong: 'İstanbul Sabiha Gökçen — 5 ve 8\'inde geliş, 9, 11 ve 12\'sinde dönüş',
        gztLong: 'Gaziantep · giriş ve çıkış kapısı',
        urfLong: 'Şanlıurfa · Göbeklitepe ve iki müze',
        marLong: 'Mardin · üçüncü gece',
        dibLong: 'Diyarbakır · dördüncü gece',
        aytLong: 'Antalya — Üsame, 12 Aralık 15:15',
        lock: 'Haritayı açmak için dokun',
        openInMaps: 'Google Haritalar\'da aç',
        spots: {
          zeugma: 'Zeugma Mozaik Müzesi — gişe 16:30',
          bakircilar: 'Bakırcılar + Almacı Pazarı',
          antepkale: 'Gaziantep Kalesi — kapalı, surlar yürünüyor',
          antepkebap: 'Antep kebabı ve baklava',
          ciger: 'Kazancılar — pazar sabahı ciğer kahvaltısı',
          taskopru: 'Taşköprü ve eski merkez',
          adanamuze: 'Adana Müze Kompleksi',
          sabanci: 'Sabancı Merkez Camii',
          yilankale: 'Yılankale — bariyer 16:00\'da iniyor',
          gastronomi: 'Antakya Gastronomi Çarşısı',
          asfuroglu: 'Necmi Asfuroğlu Arkeoloji Müzesi',
          habibneccar: 'Habib-i Neccar Camii — Ara 2025\'te açıldı',
          titus: 'Titus Tüneli, Çevlik — ıslak taş, kaymayan ayakkabı',
          iskenderun: 'İskenderun sahili — 10 ayda yeniden yapıldı',
          gobekli: 'Göbeklitepe — açık, her gün',
          urfamuze: 'Urfa Arkeoloji + Haleplibahçe',
          balikligol: 'Balıklıgöl ve Dergâh',
          stayramada: 'Mardin · Ramada Plaza — otoparklı olan',
          eskimardin: 'Eski Mardin — 550 metrede dört durak',
          deyrulzafaran: 'Deyrulzafaran Manastırı — 100₺, Müzekart geçmez',
          midyat: 'Midyat — konuk evi ve telkâri çarşısı',
          hasankeyf: 'Hasankeyf — kale tarafı hiç su almadı',
          hasanpasa: 'Hasan Paşa Hanı kahvaltısı',
          surlar: 'Diyarbakır surları — güzergâh teyitsiz',
          cendere: 'Cendere Köprüsü — Roma, ücretsiz',
          karakus: 'Karakuş Tümülüsü — 750 m yürüyüş',
          perre: 'Perre Antik Kenti',
          maraskale: 'Kahramanmaraş Kalesi — 16 Eyl 2026\'da açıldı',
          dondurma: 'Emek Pastanesi — elde dövme dondurma',
          yesemek: 'Yesemek — 300 bazalt heykel, ücretsiz'
        }
      },

      stays: {
        htmlTitle: 'Güneydoğu · nerede kalıyoruz',
        metaDesc: 'Sekiz gecenin üçü araştırıldı — Mardin, Diyarbakır, Adıyaman — Türk OTA\'larında canlı fiyatlarla, ve internette satılıp da var olmayan beş otelle birlikte.',
        kicker: 'Konaklama dosyası',
        title: 'Nerede kalıyoruz',
        intro: 'Sadece üç gece araştırıldı. Sekiz gecenin dördü ücretsiz — İslahiye\'de Ozan Kağan\'ın evi — ve sonuncusunda kimse kalmıyor. Fiyatlar 18 Eylül 2026\'da obilet ve enuygun\'dan canlı okundu; bu bölgede ikisi de Booking ve Etstur\'dan belirgin şekilde daha iyi envanter gösteriyor, özellikle üç kişilik odalarda. Burada euro olarak veriliyorlar (1 € = 55,9₺) ama her notta lira rakamı da var, çünkü kasadan çıkacak olan o. Puanlar 10 üzerinden: tek kaynağın Google olduğu yerlerde 5\'lik puan ikiyle çarpıldı ve ham hâli notta yazılı. Düğme o şehir ve kadro için tarihli bir arama açıyor; otel isimleri ise yerin kendisini açıyor, çünkü bu üçü için doğrulanabilir bir rezervasyon linki bulunamadı — ve bu bölgede ekran görüntüsü rezervasyon değildir. Arayın ve teyit edin.',
        backToPlan: '← Plana dön',
        onMap: 'Üç gece rota haritasında işaretli ↗',
        updated: 'Fiyatlar aralık tarihleri için 18 Eylül 2026\'da canlı okundu — Türkiye\'de enflasyon hızlı; bu rakamlara güvenmek yerine üstüne koyun.',
        bandNote: 'Her ray o gecenin toplam bedelini gösteriyor — bütün odalar, kişi başı değil — çünkü kadro 8\'inde dört, 9 ve 10\'unda üç kişi. Taralı şerit €75-€200 arası: bu üç kasabanın bu büyüklükte bir kadro için gerçekten istediği aralık.',
        scaleLo: '€75',
        scaleHi: '€200',
        noPrice: 'bu tarihlerde fiyat yok',
        perNight: 'gecelik €{n}',
        totalN: '€{n} · {nights} gece',
        plusTax: '+€{n} vergi',
        taxIn: 'vergi dahil',
        was: 'eski fiyat €{n}',
        reviews: '{n} yorum',
        locChip: 'konum {n}',
        freeCancel: 'ücretsiz iptal',
        payLater: 'otelde öde',
        overBand: 'bandın üstünde',
        centerKm: 'merkeze {km} km',
        bookBtn: 'Tarihli aramayı aç ↗',
        whyTitle: 'Neden bu',
        marTitle: 'Salı 8 Aralık · 4 kişi',
        marSub: 'Plan, sizin belirlediğiniz Viranşehir yerine Mardin\'i öneriyor. 3.209₺ ve ~45 dakika gece sürüşü daha pahalı, karşılığında çarşambanın tamamını geri alıyor: sabah 72 dakikalık transfer yok, Hasankeyf gün ışığında, Deyrulzafaran mümkün, ve Eren\'in uçağından önce yarım saat değil 1s53 pay var. Şanlıurfa\'da kalmak ise tek baştan çalışmayan seçenek — uçak kaçıyor.',
        dibTitle: 'Çarşamba 9 Aralık · 3 kişi',
        dibSub: 'Batman Havalimanı\'ndan sonra karanlıkta 98 km. Diyarbakır\'da merkezdeki her şey yürünüyor — tek istisna On Gözlü Köprü — o yüzden buradaki otelden beklenen şey konum değil, arabayı güvenle bırakacak bir yer.',
        adiTitle: 'Perşembe 10 Aralık · 3 kişi',
        adiSub: 'Gezinin en ucuz gecesi, ve tek bir üç kişilik odanın iki odayı iki kat farkla yendiği gece. Kâhta gerçek bir alternatif: Booking orada hiçbir şey, Etstur tek sonuç veriyor ama obilet\'in tarihli aramasında gerçek envanter var.',
        whyRamada: [
          'Listedeki tek gerçek otoparklı otel — ücretsiz, kapıya kadar araba, EV şarj. Eski Mardin\'in bilinen derdi tam olarak bu: 1. Cadde arabayla geçiliyor, ara sokaklar yaya ve eşek yolu, ve iki ayrı araştırma turu arabanın nereye bırakılacağını çözemedi.',
          'Dört kişi 10.409₺; Viranşehir\'de iki oda 7.200₺. Aradaki 3.209₺ çarşambanın tamamını geri satın alıyor — plandaki en iyi getirili karar bu.',
          'Mezopotamya ovasına karşı uyanıp günü görmeye geldiğiniz şehirde başlıyorsunuz; ona 72 dakika uzakta değil.'
        ],
        whyTuristik: [
          'Kapalı garaj ve vale — arabanın dert olduğu, başka hiçbir şeyin araba istemediği bir şehirde.',
          '2025\'te yeniden yapılmış ve sur içinde: sur yürüyüşü, Hasan Paşa Hanı kahvaltısı ve öğlen ciğeri kapıdan yürüme mesafesinde.',
          'Üç kişi 13.649₺ ile haftanın en pahalı gecesi — ve park sorununu da çözen daha ucuz bir seçeneğin bulunmadığı tek gece.'
        ],
        whyAdipark: [
          'Bir triple oda, kahvaltı dahil 4.249₺ — şehirde iki odanın tutacağının yarısı, ve gezinin en ucuz gecesi, hem de açık farkla.',
          'Google 4,8 — 864 yorum, en tazesi ~4 Eylül 2026, iki bağımsız yönden doğrulandı. Booking\'deki "8,7 / 6 yorum" yeniden açılış artefaktı ve kullanılmadı.',
          'Kâhta değil Adıyaman, çünkü daha ucuz, daha iyi puanlı ve cuma günkü Kahramanmaraş koşusu için şehrin doğru tarafında.'
        ],
        beds: {},
        notes: {
          yukselhan: 'İki oda 7.200₺ — oda başı 3.600₺, merkeze 1,3 km, kahvaltı, ücretsiz iptal ve otopark dahil, D400 üstünde. obilet ve Etstur aynı rakamı bağımsız olarak veriyor. Üç yıldızlı bir yol kenarı durağı ve kahvaltısı övülüyor — ve Viranşehir\'deki tek otel: obilet\'ten iki oda istendiğinde onu listeden tamamen düşürüp 34 "sonuç" döndürdü, en yakını 69,7 km uzakta Siverek\'te, geri kalanı 84-87 km uzakta Şanlıurfa\'da. 15 km içinde tek bir tesis yok.',
          carra: '9,0 / 560 — eski şehirde bir konak ve çok iyi puanlı, ama bu tarihler için fiyat alınamadı. Ramada doluysa aramaya değer.',
          maristan: '9,1 / 168, eski şehirde. Yine bu tarihler için canlı fiyat yok.',
          minessa: 'Kendi otoparkı olduğu vlogda teyitli — Eski Mardin\'de önemli olan özellik bu. Bu tarihler için fiyat yok.',
          tella: 'Google 4,1 / 529, yani gerçek ve çalışıyor — ama bu tarihlerde hiç online envanteri yok. Sadece telefon: 0414 471 4444.',
          whitestar: 'Bir triple oda, kahvaltı ve otopark dahil 6.171₺.',
          whitestar2: 'İki oda, kahvaltı, otopark ve ücretsiz iptal dahil 8.234₺ — ayrı oda isteniyorsa doğru seçim, ve Park Dedeman\'ın aynısı için istediğinin altında.',
          kommagene: 'Bir oda / üç kişi, kahvaltı dahil 4.000₺. Google 4,8 / 1.285, en tazesi 16 Eylül 2026 — ve dosyadaki en iyi kanıt: Ocak 2025\'te doğrulanmış konaklamalar var, yani burası kışın gerçekten çalışıyor. Kâhta ilk sanıldığı gibi boş bir kasaba değil. Not: Karadut köyü artık anlamsız — oradaki pansiyonlar 04:00 gün doğumu çıkışı için var, zirve kapalı olduğuna göre o gerekçe ortadan kalktı.',
          dedeman: 'Bir triple, kahvaltı ve otopark dahil 7.500₺; iki oda, sadece oda, 11.250₺.',
          euphrat: 'enuygun\'da 6.395₺, obilet\'te 7.773₺, ücretsiz iptal. Yorum akışı aralık-şubat arasında sönüyor; bu bir hüküm değil ama bir işaret. +90 533 612 4402.',
          rabat: 'Buraya sırf kimse fiyatına bakıp rezervasyon yapmasın diye kondu. enuygun puanı 5,3/10; Eylül 2026: "temizlik sıfır, klima dahi yok"; Nisan 2026: sıcak su yok, prizler duvardan sökülmüş. Üstelik kırsalda ve düğün salonu olarak çalışıyor.'
        },
        totalKicker: 'Üç gece, üç şehir',
        totalLine: 'Ayırtılan üç gece toplam 28.307₺ — yaklaşık €506 — ve diğer dört gece hiç para etmiyor.',
        totalNote: 'Ortak masrafların tamamı ~67.738₺: sekiz günlük araç 23.700₺ (broker üzerinden 18.125₺), 2.490 km için ~15.341₺ yakıt, 390₺ geçiş ve bu üç otel. Kişi başı, uçak hariç ve İslahiye ücretsizken: Önder sekiz gün için ~32.000₺, Üsame beş gün için ~25.500₺, Eren beş gün için ~23.500₺, Berk dört gün için ~21.500₺. Türkiye\'de turist vergisi yok ama %2 konaklama vergisi var ve genelde fiyata dahil.',
        method: 'Bu liste nasıl yapıldı: obilet ve enuygun 18 Eylül 2026\'da tam tarihler ve kadro büyüklükleriyle canlı arandı, Etstur, Booking ve Google ile çapraz kontrol edildi. Buradaki her otel iki yönden doğrulandı — canlı tarihli fiyat artı aynı aya ait bir yorum — çünkü ilk tur, internette satışta görünüp fiilen var olmayan beş otel buldu: Kâhta\'daki Zeus, ~2019\'da yıkılmış ve yerine dükkânlar yapılmış; Ve Hotels Adıyaman, kapalı ve zincirin kendi sitesinden çıkarılmış; Beyazsaray, artık düğün salonu; Nemrut Kervansaray, son ilan ettiği sezon 2014 ve Google Maps kaydı bile yok; ve Antiochos, kendi yorumları hâlâ "kahvaltı, havuz, hamam, spa gibi hizmetleri mevcut değil" diyor. Türkiye\'de taşra otellerinde doğrudan telefon veya WhatsApp rezervasyonu çoğu zaman her platformdan ucuz — arayın.'
      }
    }
  }
};
