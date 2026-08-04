/* España · the Çelik plan: where we sleep — the skeleton.
   Names, numbers and links from the Booking.com search (run live 2 Aug 2026,
   2 adults, 1 room, score 8+, £60-150/night, GBP). Every user-facing word
   lives in i18n.js under stays.*; stays.html adds the colours and renders it,
   chat.js reads it so the assistant knows where we're sleeping.

   Nightly figures fold all taxes in; `total` + `tax` mirror what Booking
   itself quoted for the exact dates (some quotes arrive tax-inclusive).
   km = distance from the city centre, score/rev = Booking's rating and how
   many reviews it rests on, loc = its location sub-score where one was
   shown, was = the struck-through price, cancel/payLater = free cancellation
   and pay-at-the-property. `pick` is the one we booked. */
window.STAYS = {
  cities: [
    { key: 'bcn', nights: 3,
      q: '?checkin=2026-08-08&checkout=2026-08-11&group_adults=2&no_rooms=1&selected_currency=GBP',
      pick: { id: 'taber', name: 'HCC Taber', url: 'https://www.booking.com/hotel/es/taber.html',
        area: 'Eixample · Carrer d’Aragó 256', km: 0.7, score: 8.7, rev: 1578, loc: 9.6,
        total: 439, tax: 39, night: 159, was: null, cancel: false, payLater: false },
      alts: [
        { id: 'bcn40', name: 'Acta BCN 40', url: 'https://www.booking.com/hotel/es/40.html', area: 'Ciutat Vella', km: 0.6, score: 8.6, rev: 2900, loc: null, total: 325, tax: 33, night: 119, was: null, cancel: false, payLater: false },
        { id: 'nhsants', name: 'NH Sants Barcelona', url: 'https://www.booking.com/hotel/es/nh-sants-barcelona.html', area: 'Sants · Les Corts', km: 2.7, score: 8.6, rev: 2511, loc: null, total: 352, tax: 47, night: 133, was: 455, cancel: false, payLater: false },
        { id: 'city47', name: 'Acta CITY47', url: 'https://www.booking.com/hotel/es/citypark.html', area: 'Sants-Montjuïc', km: 2.4, score: 8.4, rev: 5051, loc: null, total: 394, tax: 47, night: 147, was: 625, cancel: true, payLater: true },
        { id: 'monumental', name: 'Eurostars Monumental', url: 'https://www.booking.com/hotel/es/eurostars-monumental.html', area: 'Eixample', km: 1.7, score: 8.6, rev: 1719, loc: 9.4, total: 423, tax: 47, night: 157, was: 705, cancel: false, payLater: false },
        { id: 'dante', name: 'Best Western Premier Hotel Dante', url: 'https://www.booking.com/hotel/es/bestwesterndantebarcelona.html', area: 'Eixample', km: 1.2, score: 8.9, rev: 1688, loc: null, total: 433, tax: 47, night: 160, was: 509, cancel: false, payLater: false },
        { id: 'granvia', name: 'Catalonia Gran Via BCN', url: 'https://www.booking.com/hotel/es/catalonia-gran-via-bcn.html', area: 'Eixample', km: 0.9, score: 9.0, rev: 2287, loc: 9.3, total: 496, tax: 47, night: 181, was: null, cancel: true, payLater: true }
      ] },
    { key: 'vlc', nights: 3,
      q: '?checkin=2026-08-11&checkout=2026-08-14&group_adults=2&no_rooms=1&selected_currency=GBP',
      pick: { id: 'easy', name: 'easyHotel València Ciutat Vella', url: 'https://www.booking.com/hotel/es/easyhotel-valencia.html',
        area: 'Extramurs · Plaça Rojas Clemente 7-8', km: 0.8, score: 8.2, rev: 527, loc: null,
        total: 345, tax: 0, night: 115, was: null, cancel: false, payLater: false },
      alts: [
        { id: 'domino', name: 'Hotel Original Domino House', url: 'https://www.booking.com/hotel/es/original-domino-house.html', area: 'Camins al Grau', km: 1.9, score: 8.7, rev: 1127, loc: null, total: 395, tax: 0, night: 132, was: 439, cancel: false, payLater: false },
        { id: 'blanq', name: 'Blanq Marina Suites', url: 'https://www.booking.com/hotel/es/blanq-marina.html', area: 'Camins al Grau · marina', km: 3.3, score: 9.0, rev: 2803, loc: null, total: 406, tax: 0, night: 135, was: 451, cancel: false, payLater: false },
        { id: 'littlevillage', name: 'The Little Village Apartments', url: 'https://www.booking.com/hotel/es/the-little-village-apartments.html', area: 'Campanar', km: 2.5, score: 9.0, rev: 2033, loc: null, total: 408, tax: 0, night: 136, was: 453, cancel: true, payLater: false },
        { id: 'mythic', name: 'Mythic Valencia', url: 'https://www.booking.com/hotel/es/mythic-boutique.html', area: 'La Saïdia', km: 1.5, score: 8.8, rev: 802, loc: null, total: 423, tax: 0, night: 141, was: 470, cancel: true, payLater: false },
        { id: 'nhcenter', name: 'NH Valencia Center', url: 'https://www.booking.com/hotel/es/nhcenter.html', area: 'Campanar', km: 1.5, score: 8.6, rev: 3415, loc: null, total: 435, tax: 0, night: 145, was: 531, cancel: false, payLater: false },
        { id: 'clarita', name: 'Casa Clarita', url: 'https://www.booking.com/hotel/es/casa-clarita-by-sh-hoteles.html', area: 'Ciutat Vella', km: 0.5, score: 9.0, rev: 1003, loc: 9.9, total: 477, tax: 0, night: 159, was: null, cancel: true, payLater: true }
      ] }
  ]
};

// España is the built-in shortlist; another trip brings its own (trip-<id>.js).
if (window.TRIP && window.TRIP.data && window.TRIP.data.stays) window.STAYS = window.TRIP.data.stays;
