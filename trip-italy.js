/* Sicilia · the Çelik plan — the second trip, whole.
 *
 * España is baked into app.js / i18n.js / trip-map.html; this trip instead
 * registers itself here and those three files read it when it is the one
 * chosen (see trips.js). Same shapes throughout: the skeleton is ids, times,
 * categories and per-person euros, the words live once per language, and the
 * map keeps only geometry.
 *
 * Prices: the flights and both hotels were checked live on 4 Aug 2026 —
 * those say so. Tickets, trains and lidos come from official operator pages
 * and the mined vlogs and articles, and move with the season.
 *
 * Loaded after trips.js and before i18n.js, so the words are in place before
 * anything decides which language to serve.
 */
window.TRIPS = window.TRIPS || {};
window.TRIPS.italy = {

  // — the skeleton ——————————————————————————————————————————————
  // Day one as [year, month index, day]: chat.js dates the week from it.
  start: [2026, 7, 22],
  days: [
    { dom: '22', dot: 'var(--color-accent)', acts: [
      { id: 'i1b1', t: '13:00', cat: 'travel', eur: 110 },
      { id: 'i1b2', t: '22:15', cat: 'travel', eur: 2.7 },
      { id: 'i1s1', t: '23:05', cat: 'stay', eur: null },
      { id: 'i1b3', t: '23:30', cat: 'food', eur: 12 }
    ] },
    { dom: '23', dot: 'var(--color-accent)', acts: [
      { id: 'i2b1', t: '09:30', cat: 'boat', eur: 75 },
      { id: 'i2b2', t: '19:00', cat: 'travel', eur: 15 },
      { id: 'i2b3', t: '19:30', cat: 'sights', eur: 0 },
      { id: 'i2b4', t: '20:30', cat: 'food', eur: 6 },
      { id: 'i2b5', t: '21:30', cat: 'food', eur: 25 }
    ] },
    { dom: '24', dot: 'var(--color-accent)', acts: [
      { id: 'i3b1', t: '08:00', cat: 'travel', eur: 11 },
      { id: 'i3s1', t: '10:15', cat: 'stay', eur: null },
      { id: 'i3b2', t: '11:00', cat: 'museum', eur: 19 },
      { id: 'i3b3', t: '13:00', cat: 'food', eur: 12 },
      { id: 'i3b4', t: '17:30', cat: 'museum', eur: 10 },
      { id: 'i3b5', t: '19:30', cat: 'sights', eur: 0 },
      { id: 'i3b6', t: '21:00', cat: 'food', eur: 28 }
    ] },
    { dom: '25', dot: 'var(--color-accent)', acts: [
      { id: 'i4b1', t: '08:30', cat: 'travel', eur: 1.4 },
      { id: 'i4b2', t: '09:15', cat: 'swim', eur: 18 },
      { id: 'i4b3', t: '13:00', cat: 'food', eur: 8 },
      { id: 'i4b4', t: '16:00', cat: 'swim', eur: 2 },
      { id: 'i4b5', t: '21:00', cat: 'food', eur: 22 }
    ] },
    { dom: '26', dot: 'linear-gradient(135deg, var(--color-accent) 50%, var(--color-accent-2) 50%)', acts: [
      { id: 'i5b1', t: '08:30', cat: 'travel', eur: 25 },
      { id: 'i5s1', t: '14:30', cat: 'stay', eur: null },
      { id: 'i5b2', t: '15:30', cat: 'swim', eur: 0 },
      { id: 'i5b3', t: '19:30', cat: 'food', eur: 25 },
      { id: 'i5b4', t: '21:00', cat: 'event', eur: 3 }
    ] },
    { dom: '27', dot: 'var(--color-accent-2)', acts: [
      { id: 'i6b2', t: '08:30', cat: 'travel', eur: 3 },
      { id: 'i6b3', t: '09:00', cat: 'sights', eur: 14 },
      { id: 'i6b4', t: '10:30', cat: 'food', eur: 8 },
      { id: 'i6b5', t: '12:00', cat: 'sights', eur: 0 },
      { id: 'i6b6', t: '13:00', cat: 'swim', eur: 30 },
      { id: 'i6b7', t: '17:00', cat: 'boat', eur: 25 },
      { id: 'i6b8', t: '20:30', cat: 'food', eur: 25 }
    ] },
    { dom: '28', dot: 'var(--color-accent-2)', acts: [
      { id: 'i7b1', t: '07:30', cat: 'sights', eur: 120 },
      { id: 'i7b2', t: '16:30', cat: 'swim', eur: 0 },
      { id: 'i7b3', t: '20:00', cat: 'food', eur: 30 }
    ] },
    { dom: '29', dot: 'var(--color-neutral-500)', acts: [
      { id: 'i8b1', t: '08:45', cat: 'travel', eur: 5 },
      { id: 'i8b2', t: '09:45', cat: 'travel', eur: 4 },
      { id: 'i8b3', t: '13:20', cat: 'travel', eur: 240 }
    ] }
  ],

  bookings: ['j1', 'j2', 'j3', 'j4', 'j5', 'j6', 'j7', 'j8', 'j9', 'j10', 'j11', 'j12', 'j13', 'j14', 'j15'],

  maps: {
    i1b1: 'London Stansted Airport',
    i1b2: 'Trapani Birgi Airport',
    i1s1: 'Trapani old town',
    i1b3: 'Corso Vittorio Emanuele, Trapani',
    i2b1: 'Molo Sanità, Via Ammiraglio Staiti, Trapani',
    i2b2: 'Funivia Trapani-Erice',
    i2b3: 'Erice',
    i2b4: 'Pasticceria Maria Grammatico, Erice',
    i2b5: 'Erice',
    i3b1: 'Trapani bus terminal, Piazza Montalto',
    i3s1: 'Eurostars Centrale Palace, Corso Vittorio Emanuele 327, Palermo',
    i3b2: 'Palazzo dei Normanni, Palermo',
    i3b3: 'Mercato di Ballarò, Palermo',
    i3b4: 'Chiesa di Santa Caterina d\'Alessandria, Palermo',
    i3b5: 'Foro Italico Umberto I, Palermo',
    i3b6: 'Grano Granis, Via Salvatore Spinuzza 33, Palermo',
    i4b1: 'Piazza Sturzo, Palermo',
    i4b2: 'Mondello beach, Palermo',
    i4b3: 'Lungomare di Mondello, Palermo',
    i4b4: 'Riserva Naturale Capo Gallo, Palermo',
    i4b5: 'Pizzeria Procopio, Palermo',
    i5b1: 'Taormina-Giardini railway station',
    i5s1: 'B&B Al Sole di Sicilia, Giardini Naxos',
    i5b2: 'Spiaggia di Giardini Naxos',
    i5b3: 'Lungomare Tysandros, Giardini Naxos',
    i5b4: 'Corso Umberto, Taormina',
    i6b2: 'Taormina Porta Messina bus terminal',
    i6b3: 'Teatro Antico di Taormina',
    i6b4: 'Bam Bar, Taormina',
    i6b5: 'Villa Comunale di Taormina',
    i6b6: 'Isola Bella, Taormina',
    i6b7: 'Porto di Giardini Naxos',
    i6b8: 'Giardini Naxos',
    i7b1: 'Rifugio Sapienza, Mount Etna',
    i7b2: 'Spiaggia di Giardini Naxos',
    i7b3: 'Giardini Naxos',
    i8b1: 'Catania Centrale railway station',
    i8b2: 'Catania Fontanarossa Airport',
    i8b3: 'Catania Fontanarossa Airport'
  },

  // Days 3 and 5 both move house, so they get no city hint rather than a wrong one.
  mapCity: ['Trapani', 'Trapani', '', 'Mondello', '', 'Taormina', 'Taormina', 'Catania'],

  // What the prose calls a place, for the Google Maps links in descriptions
  // and tips. There is no field guide for this trip yet, so this table is
  // the whole dictionary rather than a set of overrides on one.
  places: {
    'Quattro Canti': 'Quattro Canti, Palermo',
    'Cappella Palatina': 'Cappella Palatina, Palermo',
    'Palatina': 'Cappella Palatina, Palermo',
    'Palazzo dei Normanni': 'Palazzo dei Normanni, Palermo',
    'Ballarò': 'Mercato di Ballarò, Palermo',
    'Vucciria': 'Mercato della Vucciria, Palermo',
    'Mercato del Capo': 'Mercato del Capo, Palermo',
    'Santa Caterina': 'Chiesa di Santa Caterina d\'Alessandria, Palermo',
    'I Segreti del Chiostro': 'I Segreti del Chiostro, Palermo',
    'Teatro Massimo': 'Teatro Massimo, Palermo',
    'Foro Italico': 'Foro Italico Umberto I, Palermo',
    'Monreale': 'Duomo di Monreale',
    'Mondello': 'Mondello beach, Palermo',
    'Capo Gallo': 'Riserva Naturale Capo Gallo, Palermo',
    'Trapani': 'Trapani',
    'Erice': 'Erice',
    'Funivia': 'Funivia Trapani-Erice',
    'Maria Grammatico': 'Pasticceria Maria Grammatico, Erice',
    'Favignana': 'Favignana',
    'Levanzo': 'Levanzo',
    'Cala Rossa': 'Cala Rossa, Favignana',
    'Bue Marino': 'Cala Bue Marino, Favignana',
    'Egadi': 'Isole Egadi',
    'Torre di Ligny': 'Torre di Ligny, Trapani',
    'Mura di Tramontana': 'Mura di Tramontana, Trapani',
    'Segesta': 'Tempio di Segesta',
    'Cefalù': 'Cefalù',
    'Taormina': 'Taormina',
    'Teatro Antico': 'Teatro Antico di Taormina',
    'Corso Umberto': 'Corso Umberto, Taormina',
    'Villa Comunale': 'Villa Comunale di Taormina',
    'Isola Bella': 'Isola Bella, Taormina',
    'Mazzarò': 'Mazzarò, Taormina',
    'Giardini Naxos': 'Giardini Naxos',
    'Naxos': 'Giardini Naxos',
    'Etna': 'Mount Etna',
    'Rifugio Sapienza': 'Rifugio Sapienza, Mount Etna',
    'Catania': 'Catania',
    'La Pescheria': 'La Pescheria, Catania',
    'Messina': 'Messina',
    'Palermo': 'Palermo',
    'Stansted': 'London Stansted Airport',
    'Wigston': 'Wigston, Leicestershire',
    'Bam Bar': 'Bam Bar, Taormina',
    'Grano Granis': 'Grano Granis, Palermo',
    'Nino u Ballerino': 'Nino u Ballerino, Palermo'
  },

  // — where we sleep ————————————————————————————————————————————
  // Booking.com, searched live 4 Aug 2026: 2 adults, 1 room, score 8+,
  // £60-150 a night (£190 in Taormina, where the band does not reach).
  stays: {
    cities: [
      { key: 'pal', nights: 2,
        q: '?checkin=2026-08-24&checkout=2026-08-26&group_adults=2&no_rooms=1&selected_currency=GBP',
        pick: { id: 'centrale', name: 'Eurostars Centrale Palace', url: 'https://www.booking.com/hotel/it/eurostars-centrale-palace.en-gb.html',
          area: 'Quattro Canti · Corso Vittorio Emanuele', km: 0.7, score: 8.6, rev: 2716, loc: null,
          total: 241, tax: 16, night: 120, was: null, cancel: true, payLater: false },
        alts: [
          { id: 'dimora', name: 'La Dimora dei Teatri', url: 'https://www.booking.com/hotel/it/la-dimora-dei-teatri-luxury-rooms.en-gb.html', area: 'Teatro Massimo', km: 0.2, score: 8.3, rev: 209, loc: null, total: 136, tax: 14, night: 68, was: null, cancel: true, payLater: false },
          { id: 'cavalieri', name: 'I Cavalieri di Malta', url: 'https://www.booking.com/hotel/it/i-cavalieri-di-malta.en-gb.html', area: 'La Cala · Kalsa', km: 0.6, score: 8.5, rev: 532, loc: null, total: 153, tax: 14, night: 76, was: null, cancel: false, payLater: false },
          { id: 'isula', name: 'Isula', url: 'https://www.booking.com/hotel/it/isula.en-gb.html', area: 'Politeama side', km: 1.0, score: 9.5, rev: 310, loc: null, total: 182, tax: 14, night: 91, was: null, cancel: true, payLater: false },
          { id: 'tesori', name: 'Le Stanze dei Tesori', url: 'https://www.booking.com/hotel/it/le-stanze-dei-tesori-luxury-rooms.en-gb.html', area: 'Historic centre', km: 0.25, score: 8.8, rev: 253, loc: null, total: 196, tax: 14, night: 98, was: null, cancel: true, payLater: false },
          { id: 'bbcanti', name: 'B&B Hotel Palermo Quattro Canti', url: 'https://www.booking.com/hotel/it/grande-albergo-sole.en-gb.html', area: 'Quattro Canti', km: 0.7, score: 8.1, rev: 2847, loc: null, total: 220, tax: 36, night: 110, was: null, cancel: false, payLater: false },
          { id: 'mercure', name: 'Mercure Palermo Centro', url: 'https://www.booking.com/hotel/it/mercure-palermo-centro.en-gb.html', area: 'Via Roma · Politeama', km: 0.45, score: 8.2, rev: 4650, loc: null, total: 324, tax: 16, night: 162, was: null, cancel: true, payLater: false }
        ] },
      { key: 'nax', nights: 3,
        q: '?checkin=2026-08-26&checkout=2026-08-29&group_adults=2&no_rooms=1&selected_currency=GBP',
        pick: { id: 'alsole', name: 'B&B Al Sole di Sicilia', url: 'https://www.booking.com/hotel/it/b-amp-b-al-sole-di-sicilia.en-gb.html',
          area: 'Giardini Naxos · 100 m from the sand', km: 0.45, score: 9.6, rev: 462, loc: null,
          total: 324, tax: 10, night: 108, was: null, cancel: true, payLater: false },
        alts: [
          { id: 'namuri', name: 'Namuri Luxury Rooms', url: 'https://www.booking.com/hotel/it/namuri-luxury-rooms.en-gb.html', area: 'Mazzeo · 100 m from the beach', km: 1.0, score: 8.7, rev: 369, loc: null, total: 304, tax: 15, night: 101, was: null, cancel: false, payLater: false },
          { id: 'tullas', name: 'Tulla’s', url: 'https://www.booking.com/hotel/it/tullas-affittacamere.en-gb.html', area: 'Recanati end · 150 m from the beach', km: 1.8, score: 9.7, rev: 526, loc: null, total: 308, tax: 10, night: 103, was: null, cancel: true, payLater: false },
          { id: 'mysicily', name: 'B&B My Sicily', url: 'https://www.booking.com/hotel/it/b-amp-b-my-sicily.en-gb.html', area: 'Giardini Naxos centre', km: 0.6, score: 9.5, rev: 658, loc: null, total: 308, tax: 10, night: 103, was: null, cancel: true, payLater: false },
          { id: 'marinablu', name: 'B&B Marina Blu', url: 'https://www.booking.com/hotel/it/b-amp-b-marina-blu-giardini-naxos1.en-gb.html', area: '50 m from the beach', km: 0.9, score: 9.3, rev: 313, loc: null, total: 332, tax: 10, night: 111, was: null, cancel: false, payLater: false },
          { id: 'mediterraneo', name: 'Mediterraneo Guesthouse', url: 'https://www.booking.com/hotel/it/mediterraneo-guesthouse.en-gb.html', area: 'Beachfront', km: 0.4, score: 9.2, rev: 108, loc: null, total: 334, tax: 10, night: 111, was: null, cancel: false, payLater: false },
          { id: 'villaanna', name: 'Villa Anna al Duomo', url: 'https://www.booking.com/hotel/it/villa-anna-taormina.en-gb.html', area: 'Taormina town · 300 m from the Duomo', km: 0.3, score: 9.3, rev: 94, loc: null, total: 450, tax: 0, night: 150, was: null, cancel: true, payLater: false },
          { id: 'meridia', name: 'B&b Meridia', url: 'https://www.booking.com/hotel/it/b-amp-b-meridia.en-gb.html', area: 'Catania · 300 m from the Duomo', km: 0.3, score: 8.8, rev: 498, loc: null, total: 206, tax: 18, night: 69, was: null, cancel: true, payLater: false }
        ] }
    ]
  },

  // — the map ———————————————————————————————————————————————————
  map: {
    route: 'Wigston → Trapani → Palermo → Taormina',
    home: [52.581, -1.093],
    depart: [51.885, 0.235],
    drive: [[52.581, -1.093], [51.885, 0.235]],
    arcs: [
      [[51.885, 0.235], [37.911, 12.488], 2.6],
      [[37.467, 15.066], [51.885, 0.235], -2.6]
    ],
    // West to east in two hops: the coach over the hills to Palermo, then the
    // train along the north coast, round Messina and down the Ionian shore.
    lines: [
      [[38.018, 12.537], [37.941, 12.834], [37.981, 13.109], [38.116, 13.361]],
      [[38.116, 13.361], [38.039, 14.023], [38.128, 15.020], [38.194, 15.554], [37.852, 15.288]],
      [[37.852, 15.288], [37.502, 15.087]]
    ],
    cities: [
      { ll: [52.581, -1.093], label: 'Wigston', longKey: 'wigstonLong', dir: 'right' },
      { ll: [38.018, 12.537], label: 'Trapani', longKey: 'tpsLong', dir: 'left' },
      { ll: [38.116, 13.361], label: 'Palermo', longKey: 'pmoLong', dir: 'right' },
      { ll: [37.852, 15.288], label: 'Taormina', longKey: 'taoLong', dir: 'right' },
      { ll: [37.502, 15.087], label: 'Catania', longKey: 'ctaLong', dir: 'left' }
    ],
    // [lat, lng, cat, spot key, day number, time, also-on-day]
    spots: [
      [38.0176, 12.5365, 'stay', 'staytrp', 1, '23:05'],
      [38.1157, 13.3613, 'stay', 'staypal', 3, '10:15'],
      [37.8218, 15.2606, 'stay', 'staynax', 5, '14:30'],
      [37.9310, 12.3280, 'sea', 'egadi', 2, '09:30'],
      [38.0369, 12.5865, 'sights', 'erice', 2, '19:30'],
      [38.0355, 12.5877, 'food', 'grammatico', 2, '20:30'],
      [38.1113, 13.3533, 'sights', 'palatina', 3, '11:00'],
      [38.1097, 13.3620, 'food', 'ballaro', 3, '13:00'],
      [38.1150, 13.3625, 'sights', 'caterina', 3, '17:30'],
      [38.1140, 13.3720, 'sights', 'foro', 3, '19:30'],
      [38.1213, 13.3577, 'food', 'granis', 3, '21:00'],
      [38.2018, 13.3255, 'sea', 'mondello', 4, '09:15'],
      [38.2100, 13.2900, 'sea', 'capogallo', 4, '16:00'],
      [38.1245, 13.3565, 'food', 'procopio', 4, '21:00'],
      [37.8230, 15.2680, 'sea', 'naxosbeach', 5, '15:30', 7],
      [37.8524, 15.2924, 'sights', 'teatro', 6, '09:00'],
      [37.8515, 15.2880, 'food', 'bambar', 6, '10:30'],
      [37.8496, 15.2925, 'sights', 'villacomunale', 6, '12:00'],
      [37.8517, 15.3010, 'sea', 'isolabella', 6, '13:00'],
      [37.8340, 15.2740, 'sea', 'boat', 6, '17:00'],
      [37.8519, 15.2887, 'fiesta', 'corsonight', 5, '21:00'],
      [37.6990, 15.0000, 'sights', 'etna', 7, '07:30']
    ],
    views: {
      'v-all': { bounds: [[52.581, -1.093], [38.018, 12.537], [37.502, 15.087]], pad: 60, label: null },
      'v-trp': { bounds: [[37.900, 12.300], [38.060, 12.620]], pad: 46, label: 'Trapani' },
      'v-pal': { bounds: [[38.080, 13.260], [38.215, 13.400]], pad: 46, label: 'Palermo' },
      'v-tao': { bounds: [[37.680, 14.980], [37.870, 15.320]], pad: 46, label: 'Taormina' }
    }
  },

  // — the words —————————————————————————————————————————————————
  i18n: {
    en: {
      htmlTitle: 'Sicilia · the Çelik plan',
      metaDesc: 'Eight days, two siblings: Trapani, Palermo and Taormina, 22-29 August. Tick things off as you go.',
      dows: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      pill: '{dow} {dom}',

      static: {
        brand: 'Sicilia · the Çelik plan',
        navDates: '22-29 Aug 2026',
        tagDays: '8 days',
        tagSiblings: '2 siblings',
        tagSea: 'Sea at 27 °C',
        h1: 'Wigston → Trapani → Palermo → Taormina',
        heroText: 'The plane lands in the west and leaves from the east, so the island gets crossed once and nothing is doubled back. Two nights in Trapani for a day among the Egadi islands and a cable car up to Erice at sunset, two in Palermo for the Norman mosaics and the loudest markets in Italy, then the train to a bay you can walk into from the front door. Etna on the Friday, the Greek theatre at nine before the coaches, and a swim every single day. Planned the August way, straight from the vlogs: out early, water at noon, alive after nine.',
        heroPlaceholder: 'Drop a photo of you two',
        homeKicker: 'Home base',
        homeNote: 'Kettle HQ, back by the 29th',
        flightLabel: '~3h flight',
        bcnKicker: 'Nights 1-4',
        bcnNote: 'Egadi, Erice, mosaics, Mondello',
        trainLabel: 'Coach, then the island train',
        vlcKicker: 'Nights 5-7',
        vlcNote: 'Taormina, Isola Bella, Etna',
        city1: 'Trapani · Palermo',
        city1Href: 'https://www.google.com/maps/search/?api=1&query=Trapani',
        city2: 'Taormina · Giardini Naxos',
        city2Href: 'https://www.google.com/maps/search/?api=1&query=Giardini%20Naxos',
        mapIntro: 'Every stop, pinned — dashed lines are the flights out and home, solid sage the train across the island. Hover a pin for its name, tap for the when; the buttons zoom straight to a coast.',
        izemDesc: 'Architect. The Palatine Chapel and the Greek theatre are the days planned around her.',
        ahmetDesc: 'Student. Carry the student ID: the Teatro Antico and most state sites in Sicily are half price at 18-25.',
        vlogsKicker: 'What the vlogs taught us',
        vlogsText: 'Distilled from Sicily vlogs and articles, east and west: the Palatine Chapel’s royal apartments keep their own calendar, granita with brioche is breakfast and not dessert, a cannolo must be filled in front of you, bus tickets come from a tabacchi and get validated or cost €100, free beach strips fill by nine in August, Erice’s cable car shuts in strong wind, the Egadi calas are cut limestone and want water shoes, and Etna is cold at the top even in the last week of the month. Ionian sea: 27 °C. Pack water shoes, a fleece for the volcano, and cash for the markets and the marine reserve.'
      },

      // No fiestas on this island in our week — the theatre's summer season
      // ends two days before we arrive — so the category is the evening out.
      cats: {
        travel: 'Transit', sights: 'Sights', museum: 'Museum', boat: 'Boat trip',
        swim: 'Swim', food: 'Food & drink', event: 'Evening out', stay: 'Stay'
      },
      filters: {
        all: 'Everything', boat: 'Boat trips', swim: 'Swimming', sights: 'Sights',
        museum: 'Museums', food: 'Food', event: 'Evenings out'
      },

      days: [
        { city: 'Trapani', title: 'Wigston → Trapani', sub: 'Saturday 22 Aug · plane day, into the salt town near midnight' },
        { city: 'Egadi → Erice', title: 'The Egadi by boat, Erice after', sub: 'Sunday 23 Aug · half nine out of the port, cable car up the mountain at seven' },
        { city: 'Trapani → Palermo', title: 'Coach east, Norman mosaics', sub: 'Monday 24 Aug · eight o’clock bus, the chapel by eleven, Ballarò for lunch' },
        { city: 'Mondello', title: 'Mondello, all day in the water', sub: 'Tuesday 25 Aug · the 806 at half past eight, sand until the light goes' },
        { city: 'Palermo → Naxos', title: 'Across the island by train', sub: 'Wednesday 26 Aug · four hours coast to coast, swimming by four' },
        { city: 'Taormina', title: 'Taormina from the top down', sub: 'Thursday 27 Aug · theatre at nine, cable car to the water by one' },
        { city: 'Etna', title: 'Etna, then the last swim', sub: 'Friday 28 Aug · 2,900 m in the morning, sea level by five' },
        { city: 'Home', title: 'Arrivederci, Sicilia', sub: 'Saturday 29 Aug · two trains, one plane, kettle on by six' }
      ],

      acts: {
        i1b1: { title: 'Fly Stansted → Trapani', desc: 'Leave Wigston about one; Stansted is roughly two hours down the M1 and M11, and the car stays in the long stay all week. Ryanair FR4494 leaves at 17:45 and lands at Trapani-Birgi at 21:40 local time — just under three hours in the air. One cabin bag each, so there is nothing to wait for at the belt, which matters on a landing this late.', tip: 'Trapani in, Catania out: the island gets crossed once, west to east, with nothing doubled back. Fare not price-checked yet — the return leg was £201.65 a head on 4 Aug and this one still needs a look. Book: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-22&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=STN&destinationIata=TPS' },
        i1b2: { title: 'AST bus into Trapani', desc: 'The AST bus stops outside the terminal, to the left as you come out, and runs roughly hourly until 23:30 — about forty minutes to the centre, forty-five to the port. Tickets from the driver, cash or card, about €2.70 each. Landing at 21:40 leaves a comfortable hour of slack before the last one.', tip: 'If the bags are slow or the bus has just gone, a taxi is about €30 to the old town and worth it at this hour rather than waiting for the next one. Timetables move — check the airport’s own page a few days before: https://www.airgest.it' },
        i1s1: { title: 'Check in: Trapani old town', desc: 'Two nights inside the old town, on the finger of land between the port and the sea walls, so the boat leaves from one end of the morning walk and the funivia is a short hop the other way. Still to be booked — see the note in Book before you fly.', tip: 'The old town is small and mostly pedestrian, and the ZTL makes driving in a bad idea — none of which matters without a car, but it does mean almost anything inside the walls is walkable to both the port and the bus terminal.' },
        i1b3: { title: 'First plate, whatever is still open', desc: 'Sicilians sit down to dinner at nine, so near midnight the bars along Corso Vittorio Emanuele and around Piazza Mercato del Pesce are still going. Something small and a drink, and a first look at the Baroque main street lit up. Then sleep — the boat goes at half nine.', tip: 'Western Sicily eats differently from Palermo: the pesto here is trapanese, made with almonds and tomatoes rather than pine nuts and basil, and the pasta under it is busiate. Worth ordering the moment you see it.' },

        i2b1: { title: 'Egadi islands by boat — Favignana and Levanzo', desc: 'The whole day on the water. The boat leaves the port at half nine and runs out to Favignana, the big one, coasting the calas the island is famous for — Cala Rossa with its quarried limestone walls, Bue Marino, Cala Azzurra — with time ashore in the town and swim stops in between. Then over to Levanzo, the small quiet one, for Cala Fredda and Cala Minnola and the faraglione, and back into Trapani between five and six.', tip: 'Lunch on board is usually pasta with pesto alla trapanese, water and wine included. The Egadi marine reserve fee is about €5 a head and is paid in cash at the meeting point, so carry it. Book ahead — August boats fill days out, and GetYourGuide cancels free: https://www.getyourguide.com/trapani-l1159/from-trapani-favignana-and-levanzo-mini-cruise-with-lunch-t240987/ · If you would rather have the island to yourselves than a boat’s itinerary, the alternative is the Liberty Lines hydrofoil across (30–40 min) and a bike on the far side, about €7–10 a day: https://www.libertylines.it/en/' },
        i2b2: { title: 'Funivia up to Erice', desc: 'Showered and back out: the cable car climbs three kilometres up the mountain in about ten minutes and puts you in a walled medieval town at 750 metres, with the salt pans, the whole gulf and the Egadi you just sailed laid out underneath.', tip: '€9 single, €15 return — buy the return, it is plainly cheaper. From 13 July to 30 August it runs Sunday 09:00 to 01:00, so an evening trip up and a late one down both work; on Mondays it does not open until 14:00. It shuts in strong wind, so look before you climb: https://www.funiviaerice.it/it/page/orari' },
        i2b3: { title: 'Erice at sunset', desc: 'Cobbled lanes, courtyards, a Norman castle on the cliff edge and, at this hour, the light going pink over the salt pans two thousand feet below. It is a small town — an hour walks most of it — and it empties as the coaches leave, which is exactly why this is the evening and not the middle of the day.', tip: 'It is a mountain: bring a layer. Erice can sit in cloud and be ten degrees cooler than the coast even in August.' },
        i2b4: { title: 'Genovesi at Maria Grammatico', desc: 'The one thing Erice is eaten for: genovesi, warm discs of shortcrust filled with lemon custard. Maria Grammatico learned the recipes as a girl in the San Carlo convent orphanage and rebuilt them from memory when she opened her own shop in the early eighties — the story is a book, Bitter Almonds. Order them warm.', tip: 'Also worth the counter space: the almond paste sweets and the mustazzoli. Cash is easier than card in the queue.' },
        i2b5: { title: 'Dinner up top, then the last cabin down', desc: 'Dinner inside the walls with the coast lit up below, then the funivia down — it runs to one in the morning on a Sunday in high summer, so there is no rush.', tip: 'If the cable car is shut for wind, the AST bus down to Trapani takes 40–60 minutes and costs about €2.90 — but it stops running far earlier in the evening, so check both before dinner rather than after.' },

        i3b1: { title: 'Coach to Palermo', desc: 'The eight o’clock Segesta Autolinee bus out of Trapani: about an hour and thirty-five minutes over the hills and down into Palermo, roughly €11 a head, and they leave hourly or better all morning. Bags on the coach, and the whole west of the island behind you by ten.', tip: 'The Trapani stop is at the port, with a second at the railway station; in Palermo it drops at the Politeama and at Stazione Centrale. Timetable and tickets: https://www.segesta.it/en/ · Worth knowing: the road passes the Segesta turn-off, and the Doric temple there is one of the great sights of the island — with a Tarantola bus from Trapani at 08:00 and back at 13:10, about €4 each way. It does not fit a day that also moves house, but it is the first thing to add if the trip ever grows a night.' },
        i3s1: { title: 'Check in: Eurostars Centrale Palace', desc: 'Home for the Palermo nights: a four-star in a converted palazzo on Corso Vittorio Emanuele, standing right at Quattro Canti, the crossroads the whole old town is measured from. Two nights at the £120 nightly rate Booking quoted — about £241 plus £16 taxes — scored 8.6 by 2,716 guests, with free cancellation. Bags can go down before the room is ready.', tip: 'Picked from 663 in-budget Booking.com candidates; six alternatives are on the Where we sleep page. The nightly rate was checked live on 4 Aug for a four-night stay — the two-night total here is that rate doubled, not a fresh search, so confirm it when you book. Book: https://www.booking.com/hotel/it/eurostars-centrale-palace.en-gb.html' },
        i3b2: { title: 'Palazzo dei Normanni + Cappella Palatina', desc: 'Straight from the bags to the Norman palace, and the Palatine Chapel inside it: a small twelfth-century room lined floor to ceiling in gold Byzantine mosaic, with a carved wooden Arab ceiling over the top. Give it an hour, then the royal apartments upstairs — Monday is one of the days you can see them.', tip: 'The apartment rules are the reason this sits on a Monday. The official line is that they open Friday to Monday, when the Sicilian Assembly is not sitting; some listings instead say closed Tuesdays and Thursdays. Monday works either way, which is why it is here — but check the day before, because sessions and services close things at no notice. €19 with the apartments, online to skip the queue: https://www.federicosecondo.org/en/buy-ticket-online/ · Shoulders and knees covered, both of you.' },
        i3b3: { title: 'Ballarò, and the walk down through the old town', desc: 'Lunch is the market. Ballarò runs for streets on end: fish on ice, hawkers half-singing their prices, stalls frying to order. Eat standing — panelle and crocchè in a bun, an arancina, a slice of sfincione — and drink the blood-orange juice. Then wander back up through the cathedral, Quattro Canti and the nude marble of Piazza Pretoria on the way to a siesta.', tip: 'From the vlogs: a panelle and crocchè sandwich is €1.50, juice is €1–2, and the oysters someone will offer you at €3 each are a tourist price. Skip any stall with food already cooked and sitting out. And from a blogger who got clipped by a moped there — Quattro Canti is a live junction, not a piazza. Photograph it from the pavement. Everything shuts from one until five anyway, and that is the hottest part of an August day.' },
        i3b4: { title: 'Santa Caterina roof + the nuns’ cannoli', desc: 'Back out at half five, when the light softens. Ten euros gets the whole of Santa Caterina: the Baroque church, the cloister, and the roof terraces looking straight down onto Piazza Pretoria and out over every dome in the old town. Downstairs, the convent bakery I Segreti del Chiostro sells the pastries the nuns used to make.', tip: 'A vlogger called their cannolo, filled to order, the best of his life — and warned the queue forms within five minutes of opening. At six the crowd is thinner. The rule holds everywhere: if it was filled before you asked, the shell is already soft.' },
        i3b5: { title: 'Foro Italico + the sea walls', desc: 'The evening walk: out along the Foro Italico, the long lawn between the old town and the water, then onto the Mura delle Cattive, the raised seafront promenade the widows of Palermo used to walk. The whole city does this at seven.' },
        i3b6: { title: 'Dinner at Grano Granis', desc: 'Dinner at a small place near Teatro Massimo with a short menu, which in Sicily is the good sign: pasta alla Norma with fried aubergine and salted ricotta, involtini, caponata. Go at nine and be prepared to wait, or go at half eight and be first.', tip: 'From the vlogs: the aperitivo bars along Via Maqueda and Corso Vittorio Emanuele that wave menus at you are tourist traps. Walk one street off either. And for the brave, another night: Nino u Ballerino on Corso Calatafimi does pane ca meusa, a bun of spleen and lung fried in lard with lemon and caciocavallo.' },

        i4b1: { title: 'Bus 806 to Mondello', desc: 'Mondello is Palermo’s beach and the 806 is how the city gets there: from Piazza Sturzo behind the Politeama, through the Favorita park, about forty minutes in August traffic. Buy the ticket first, at any tabacchi — €1.40 there, €1.80 from the driver.', tip: 'Validate it the moment you board: the fine is €100 and it is enforced. Moovit has live times, which the timetable at the stop does not.' },
        i4b2: { title: 'Mondello, the sandy one', desc: 'A two-kilometre curve of pale sand between two headlands, shallow and turquoise, with the Liberty-style bathing pavilion standing out on stilts in the middle of the bay. Either take a free strip — they exist at both ends and between the concessions — or rent from a lido.', tip: 'From the vlogs and the local guides: in August the free sand is gone by nine, so this is a half-past-eight bus, not a half-past-ten one. Two sunbeds and an umbrella run about €35 at the Italo-Belga lidos, which is nearly all of them; book ahead: https://booking.mondelloitalobelga.it/ · The budget version is Bassa Marea at €6–8 a head if you bring your own shade.' },
        i4b3: { title: 'Kiosk panini on the front', desc: 'Lunch is a €6–8 panino from one of the kiosks on the promenade, eaten on the sand.', tip: 'The local rule, from a Palermo-run guide: on that seafront the view and the food are inversely related. Kiosks good, terrace restaurants bad. And ask the price before you accept anything from a beach vendor — a €2.50 beer becomes €6 if you do not.' },
        i4b4: { title: 'Capo Gallo, the quiet end', desc: 'Walk to the far end of the bay and pay two euros into the Capo Gallo reserve: no sand to speak of, flat rocks to lie on, and the clearest water anywhere near the city. A solo traveller who filmed both called it noticeably emptier than Mondello even on a Saturday.', tip: 'Rocks, urchins and no shade — bring water shoes and something to sit on. Valuables in a bag under the towel, not on it, and only one of you in the water at a time.' },
        i4b5: { title: 'Pizza at Procopio', desc: 'Showered, back in town, and eating pizza at nine at a place that fills up in peak season and takes reservations. Book in the morning before the beach. Bags packed after — the island train goes early.' },

        i5b1: { title: 'Intercity across the island', desc: 'The morning train east: an Intercity from Palermo Centrale along the north coast to Messina, then a change onto the line down the Ionian shore to Taormina-Giardini. About four hours all in, with the sea out of the window for most of it, and reserved seats and proper luggage racks on the first leg.', tip: 'Checked on the timetables: the fastest connections run about 3h54 with one change at Messina, and Intercity seats need booking — the cheap tiers on that leg sell out in late August. The bus alternative (SAIS to Catania, €14, then Interbus up to Taormina) has more departures but means two luggage hauls in the heat. Book: https://www.trenitalia.com/en.html' },
        i5s1: { title: 'Check in: B&B Al Sole di Sicilia', desc: 'The east-coast base, and deliberately not Taormina: a B&B in Giardini Naxos, a hundred metres from the sand, scored 9.6 by 462 guests, £324 for the three nights plus £10 tax — about £108 a night, free cancellation. Taormina up on its cliff costs half again for a room further from the water.', tip: 'From the station it is a short taxi (about €10–15) or twenty minutes along the seafront. Book: https://www.booking.com/hotel/it/b-amp-b-al-sole-di-sicilia.en-gb.html' },
        i5b2: { title: 'First swim, Naxos bay', desc: 'Drop the bags and walk into the sea. Giardini Naxos is a long shallow bay with dark volcanic sand, loungers at half Taormina’s price, and free stretches that stay free because the whole bay is this big.' },
        i5b3: { title: 'Dinner on the Naxos seafront', desc: 'Dinner along the Lungomare Tysandros with the lights of Taormina hanging in the dark above you — swordfish, or pasta with pistachio, and a granita after. Naxos prices, not Taormina prices: a blogger who ate in both put Taormina starters at up to €30.' },
        i5b4: { title: 'Taormina after dark', desc: 'The bus back up the hill for the evening the vlogs all rate: Corso Umberto closed to cars and full of people walking it end to end, street performers on the corners, Piazza IX Aprile lit up with the sea black behind it. A gelato, a look at the theatre gates, and the last bus or a taxi down.', tip: 'Checked on the venue calendar: no concert falls in our nights. The Teatro Antico\'s summer season ends two days before we arrive — Il Volo on the 22nd and 23rd, Pooh on the 24th and 25th, then nothing until September. If a date is added it appears here: https://www.ticketone.it/venue/teatro-antico-di-taormina-15305/' },

        i6b2: { title: 'Bus up the hill', desc: 'Taormina sits two hundred metres above its own station, and walking it is forty-five minutes of switchbacks. The Interbus and ASM buses run up from Giardini Naxos in about fifteen minutes.', tip: 'Tickets are not sold on board — buy at the terminal kiosk or a tabaccheria first (about €2–3), and validate on boarding.' },
        i6b3: { title: 'Teatro Antico, at nine sharp', desc: 'The Greek theatre is the single most recommended thing in every Sicily vlog we mined, and the reason to be at the gate when it opens: Etna framed through the broken back wall of the stage, the Ionian on the other side, and you can climb all over it. By eleven it is a queue.', tip: '€14 (some official pages still say €12 — the exhibition surcharge moves), under-18 free, 18-25 half price with a student card. Official: https://parchiarcheologici.regione.sicilia.it/naxos-taormina/en/biglietti/teatro-antico-di-taormina-2/ · On concert days it closes early to day visitors, which is another reason for the morning.' },
        i6b4: { title: 'Granita at Bam Bar, then Corso Umberto', desc: 'The Sicilian breakfast, done properly and late: granita with a brioche col tuppo to dunk in it. Bam Bar is the famous one — start with lemon. Then walk Corso Umberto end to end, through Piazza IX Aprile with its chessboard tiles and its view.', tip: 'From the vlogs, honestly: the granita is excellent and no better than the granita in Catania or Palermo — you are paying for the address. And eat lunch and dinner one lane off the Corso, never on it.' },
        i6b5: { title: 'Villa Comunale, in the shade', desc: 'The public gardens an English aristocrat laid out on the cliff edge: free, shaded, half-empty at noon while the Corso is shoulder to shoulder, and the view straight down over the bay you swam in yesterday.' },
        i6b6: { title: 'Cable car down to Isola Bella', desc: 'The funivia drops from the cliff to Mazzarò in three minutes, every fifteen minutes, until half one in the morning. At the bottom is Isola Bella: a tiny green island joined to the shore by a strip of pebbles, in a cove that is the best-known swim in Sicily.', tip: 'Cable car is €8 one way, €15 return. The beach is pebbles and sharp rock — a vlogging couple who went without water shoes could barely swim, so buy a pair at a stall (about €10) before you go down. Beds and an umbrella run €30–50 in August; the free strip fills by ten. The islet itself is a €5 ticketed reserve and may still be shut after storm damage — check before you count on it: https://parchiarcheologici.regione.sicilia.it/naxos-taormina/' },
        i6b7: { title: 'Boat around Isola Bella + the Blue Grotto', desc: 'An hour on the water in the late afternoon, out of Giardini Naxos: around Isola Bella, into the Grotta Azzurra, past Capo Taormina, with a stop to jump in. Roughly €25 a head; the two-hour version comes with prosecco and swim stops.', tip: 'Book ahead — August boats sell out days in advance, and GetYourGuide cancels free: https://www.getyourguide.com/taormina-l1518/boat-trip-giardini-naxos-taormina-isola-bella-grotta-azzura-t585002/' },
        i6b8: { title: 'Dinner back down in Naxos', desc: 'Back down the hill by cable car and bus, and dinner on the front where it costs what it should. Bed early — the volcano starts at half seven.' },

        i7b1: { title: 'Etna, to 2,900 m', desc: 'The whole day: minibus pickup from Giardini Naxos, up the flank of the volcano to the Rifugio Sapienza at 1,900 m, cable car to 2,500 m, then a four-wheel-drive and a guide over black ash to about 2,900 m, along the rim of craters that are still steaming. Nobody goes above 2,800 m without a certified guide, which is why this is a tour and not a bus.', tip: 'About €120 a head for the full version from Taormina: https://www.getyourguide.com/taormina-l1518/mount-etna-tour-to-2900m-from-taormina-475-excellent-t636956/ · A cheaper half-day to the 1,900 m Silvestri craters runs from Catania at about €60. Dress for it — a vlogger who filmed this on 21 August was cold: long trousers, a fleece and a windproof, closed shoes, two litres of water each. The cable car shuts in strong wind.' },
        i7b2: { title: 'The last swim', desc: 'Back down by five, into the sea from the door, and stay in it until the light goes.' },
        i7b3: { title: 'The long last dinner', desc: 'The proper one: a table on the Naxos front, everything you have not eaten yet — pasta with sardines, swordfish involtini, cassata — and a walk along the water afterwards.' },

        i8b1: { title: 'Train to Catania Centrale', desc: 'The regional train down the coast, about forty-five minutes, €5.10, no reservation needed. Bags packed the night before.' },
        i8b2: { title: 'Alibus to the airport', desc: 'From outside Catania Centrale the Alibus runs to Fontanarossa airport every twenty minutes: €4, about twenty-five minutes. There is time for one last granita in the terminal.', tip: 'If the morning runs early, the fish market La Pescheria is five minutes from the station and open Saturdays 07:30–14:00 — but not with the bags.' },
        i8b3: { title: 'Fly Catania → Stansted', desc: 'Ryanair FR8543 leaves at 13:20 and lands at Stansted at 15:40. Two hours up the M11 and M1, and the kettle is on by six.', tip: 'Checked for real on 4 Aug: £201.65 per person and rising — this is the leg that sets the price of the whole trip, so book it first. Friday the 28th was £176.88 if the dates can bend. Book: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-29&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=CTA&destinationIata=STN' }
      },

      bookings: {
        j1: 'Flight home, Sat 29: Ryanair FR8543 Catania → Stansted 13:20–15:40, £201.65 pp and rising. The dearest leg of the trip and the one that moves — book this one first. Book: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-29&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=CTA&destinationIata=STN',
        j2: 'Flight out, Sat 22: Ryanair FR4494 Stansted → Trapani 17:45–21:40. Ryanair is the only airline on this route and it flies twice a week, so there is no second option on the day — fare not yet price-checked. Book: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-22&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=STN&destinationIata=TPS',
        j3: 'Bed, Trapani Sat 22 → Mon 24 — still to book, and the one gap in this plan: the Trapani nights have not had a live Booking pass yet, so there is no price or pick here. Anything inside the old town walls works, and the highly-rated small places (Matri Mia, Il Sole Blu, Palazzo Gatto) go early in late August. Search our dates: https://www.booking.com/searchresults.en-gb.html?ss=Trapani&checkin=2026-08-22&checkout=2026-08-24&group_adults=2&no_rooms=1&group_children=0&selected_currency=GBP&nflt=review_score%3D80',
        j4: 'Hotel, Palermo Mon 24 → Wed 26: Eurostars Centrale Palace, about £241 + £16 taxes for two nights at the quoted £120 nightly rate, free cancellation — so lock it now. The two-night total is the nightly rate doubled, not a fresh search. Book: https://www.booking.com/hotel/it/eurostars-centrale-palace.en-gb.html',
        j5: 'Hotel, Giardini Naxos Wed 26 → Sat 29: B&B Al Sole di Sicilia, £324 + £10 tax, free cancellation. Small property, 9.6 score, late August — it goes early. Book: https://www.booking.com/hotel/it/b-amp-b-al-sole-di-sicilia.en-gb.html',
        j6: 'Egadi boat tour, Sun 23 · 09:30 — Favignana and Levanzo with lunch on board, out of Trapani port, back late afternoon. Free cancellation on GetYourGuide, and August boats fill days ahead. Carry about €5 pp in cash for the marine reserve fee. Book: https://www.getyourguide.com/trapani-l1159/from-trapani-favignana-and-levanzo-mini-cruise-with-lunch-t240987/',
        j7: 'Intercity Palermo → Taormina-Giardini, Wed 26 morning: reserved seats, about €25 pp, and the cheap tiers sell out in August. Book: https://www.trenitalia.com/en.html',
        j8: 'Cappella Palatina + royal apartments, Mon 24 · 11:00 — €19 pp, online to skip the ticket queue. Monday is a day the apartments open on both readings of the rules, but sessions and services close things at no notice, so check the day before. Book: https://www.federicosecondo.org/en/buy-ticket-online/',
        j9: 'Etna tour to 2,900 m, Fri 28 — about €120 pp with pickup from Giardini Naxos; free cancellation, and August dates fill days ahead. Book: https://www.getyourguide.com/taormina-l1518/mount-etna-tour-to-2900m-from-taormina-475-excellent-t636956/',
        j10: 'Teatro Antico, Thu 27 · 09:00 — €14 pp, half price 18-25 with a student card, under-18 free. Book: https://parchiarcheologici.regione.sicilia.it/naxos-taormina/en/biglietti/teatro-antico-di-taormina-2/',
        j11: 'Nothing to book at the Teatro Antico: checked on the venue calendar, its summer season stops before our nights — Il Volo 22-23 Aug, Pooh 24-25, then nothing until 4 September. Worth one look closer to the date in case a date is added: https://www.ticketone.it/venue/teatro-antico-di-taormina-15305/',
        j12: 'Nothing to book on the funivia to Erice — you buy at the station. But check the day’s hours and the wind before you climb, and take the return ticket at €15 rather than two singles at €9: https://www.funiviaerice.it/it/page/orari',
        j13: 'Mondello lido, Tue 25 — about €35 for two sunbeds and an umbrella; book 48 hours ahead in August or take the free sand at half eight. Book: https://booking.mondelloitalobelga.it/',
        j14: 'Taormina bay boat trip, Thu 27 · 17:00 — about €25 pp for the hour, free cancellation, sells out in August. Book: https://www.getyourguide.com/taormina-l1518/boat-trip-giardini-naxos-taormina-isola-bella-grotta-azzura-t585002/',
        j15: 'Passports, GHIC cards and travel insurance — and a photo of each in the wallet below. Pack water shoes for the Egadi calas and Isola Bella’s pebbles, a fleece and a windproof for 2,900 m and for Erice at night, one long-sleeved thing for churches (shoulders and knees, both of you), and cash — half of Sicily still prefers it, and the boat’s reserve fee is cash only.'
      },

      map: {
        htmlTitle: 'Sicilia — the route',
        panelTitle: 'The route',
        panelDates: '22-29 August',
        viewAll: 'Full route',
        legendLabel: 'Legend ▾',
        flight: 'Flights, ~3h',
        train: 'Coach + island train',
        catSights: 'Sights & museums',
        catSea: 'Boats & swims',
        catFood: 'Food & drink',
        catFiesta: 'Evenings out',
        catStay: 'Where we sleep',
        wigstonLong: 'Wigston — home',
        tpsLong: 'Trapani · nights 1-2',
        pmoLong: 'Palermo · nights 3-4',
        taoLong: 'Taormina · nights 5-7',
        ctaLong: 'Catania · fly home',
        lock: 'Tap to explore the map',
        openInMaps: 'Open in Google Maps',
        spots: {
          staytrp: 'Trapani old town — nights 1-2',
          staypal: 'Eurostars Centrale Palace — nights 3-4',
          staynax: 'Al Sole di Sicilia — nights 5-7',
          egadi: 'Egadi islands boat tour',
          erice: 'Erice at sunset',
          grammatico: 'Genovesi at Maria Grammatico',
          palatina: 'Palazzo dei Normanni + Cappella Palatina',
          ballaro: 'Ballarò market lunch',
          caterina: 'Santa Caterina roof + cannoli',
          foro: 'Foro Italico evening walk',
          granis: 'Dinner at Grano Granis',
          mondello: 'Mondello beach',
          capogallo: 'Capo Gallo reserve',
          procopio: 'Pizza at Procopio',
          naxosbeach: 'Giardini Naxos bay',
          teatro: 'Teatro Antico di Taormina',
          bambar: 'Granita at Bam Bar',
          villacomunale: 'Villa Comunale gardens',
          isolabella: 'Isola Bella',
          boat: 'Boat trip + Blue Grotto',
          corsonight: 'Corso Umberto after dark',
          etna: 'Etna, 2,900 m'
        }
      },

      stays: {
        htmlTitle: 'Sicilia · where we sleep',
        metaDesc: 'Five nights in two towns, searched live on Booking.com: everything that fit the band, and the two we picked.',
        intro: 'Searched live on Booking.com on 4 August: one room, two adults, guest score 8+ only, £60-150 a night. Palermo returned 663 candidates and Giardini Naxos 112 — these are the ones worth arguing about. Since that search the trip has gained two nights in Trapani at the start and lost two in Palermo, so the Palermo column below is the same properties at the same nightly rates, doubled out over two nights instead of four rather than searched again. Trapani has not been searched at all yet, which is why it has no column here — the booking line for it is in Book before you fly. Names open the property with our dates filled.',
        updated: 'Nightly rates checked 4 Aug 2026 and Palermo re-dated to two nights since — they move; the itinerary and its wallet keep the booked truth.',
        palTitle: 'Palermo · nights 3-4',
        palSub: 'Mon 24 → Wed 26 Aug. The base has to work for the Palatine Chapel straight off the Trapani coach, market lunches, the 806 to Mondello from the Politeama, and an early train east out of Centrale.',
        naxTitle: 'Giardini Naxos · nights 5-7',
        naxSub: 'Wed 26 → Sat 29 Aug. Off the island train, then a bay to swim in from the door, Taormina fifteen minutes up the hill, and the Etna minibus picking up outside.',
        whyCentrale: [
          'It stands on Quattro Canti itself: the cathedral, Ballarò, Santa Caterina and the Palatine Chapel are all inside a fifteen-minute walk, which is the entire Palermo stop of this trip on foot — and with only two nights here, walkable is the whole argument.',
          'The Trapani coach drops at the Politeama and at Stazione Centrale, both about a kilometre off, and the train east leaves from Centrale — so both ends of the Palermo stay are a short walk with the bags.',
          '8.6 from 2,716 guests, a proper four-star at about £120 a night, and free cancellation: the one rate in the shortlist that costs nothing to hold while the flights get booked.'
        ],
        whyAlsole: [
          'A hundred metres from the sand. Sleeping in Taormina instead means paying half again for a room and taking a cable car or a bus to every swim — this trip swims every day.',
          '9.6 from 462 guests at about £108 a night with free cancellation, which is the best score-per-pound of all four searches we ran.',
          'Giardini Naxos is where the boats leave from and where the Etna minibus picks up, and Taormina is a fifteen-minute bus up the hill for the evening — you lose the postcard address and keep everything else.'
        ],
        beds: {},
        notes: {
          dimora: 'The cheapest central bed of the search at £68 a night, 8.3 by the opera house, free cancellation — thin on reviews (209) for a two-night base, but the value option if the budget tightens.',
          cavalieri: 'An 8.5 down by La Cala at £76 a night, close to the Kalsa evenings — non-refundable at that rate, which is what keeps it off the top.',
          isula: 'The highest score in the Palermo list, 9.5 from 310 guests, at £91 — a guesthouse a kilometre out, so every morning starts with a walk in.',
          tesori: 'Rooms in the historic centre, 8.8, 250 m from the middle, free cancellation at £98 — the closest rival, beaten on reviews and on the four-star extras.',
          bbcanti: 'The same corner as the pick, 8.1 from 2,847 guests, £110 a night — but £36 of taxes on top and no free cancellation.',
          mercure: 'The chain comfort option at £162 a night: over the band, and it buys a 8.2 rather than an 8.6.',
          namuri: 'The Taormina hack: 100 m from Mazzeo beach below the town at £101 a night, 8.7 — non-refundable, and it splits the difference badly between beach and town.',
          tullas: 'The highest score anywhere in this search, 9.7 from 526 guests at £103 — but out at the Recanati end, about 3 km from the station.',
          mysicily: 'A 9.5 from 658 guests at £103, free cancellation, 600 m in from the centre — 700 m from the water instead of 100.',
          marinablu: 'Fifty metres from the beach and 9.3 from 313 guests at £111 — non-refundable at this rate.',
          mediterraneo: 'Actually on the beachfront, 9.2, £111 — only 108 reviews behind it, and non-refundable.',
          villaanna: 'The Taormina option if the postcard address wins: 9.3, free cancellation, taxes in, at £150 a night — the top of the stretch, and 500 m uphill from any swim.',
          meridia: 'The Catania counter-plan: £69 a night, 8.8, 300 m from the Duomo, free cancellation. Cheapest of all — but Catania’s beaches are lava rock, which is the wrong end of a swimming week.'
        },
        totalKicker: 'The two picks together',
        totalLine: '£565 for these five nights — £113 a night, inside the band. Trapani’s two nights are still to come.',
        totalNote: 'Palermo takes £120 a night for a four-star on Quattro Canti; Naxos takes £108 for a room a hundred metres from the sea. Both cancel free, and both booking lines are waiting in “Book before you fly” — alongside the Trapani line, which is the one still without a price.',
        method: 'How this list was made: Booking.com searched live for 22-26 and 26-29 Aug 2026, one room, two adults, filtered to guest score 8+ and £60-150 a night, GBP throughout — plus parallel searches of Taormina and Catania to test the east-coast base. Location quality was judged against this itinerary, not the tourist-brochure centre. The Palermo dates have since moved to 24-26 and the totals here are the same nightly rates over two nights; a fresh search of both Palermo and Trapani is the next job.'
      }
    },

    // ————————————————————————————————————————————————————————— Türkçe —
    tr: {
      htmlTitle: 'Sicilya · Çelik planı',
      metaDesc: 'Sekiz gün, iki kardeş: Trapani, Palermo ve Taormina, 22-29 Ağustos. Yaptıkça işaretle.',
      dows: ['Cmt', 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'],
      pill: '{dom} {dow}',

      static: {
        brand: 'Sicilya · Çelik planı',
        navDates: '22-29 Ağustos 2026',
        tagDays: '8 gün',
        tagSiblings: '2 kardeş',
        tagSea: 'Deniz 27 °C',
        h1: 'Wigston → Trapani → Palermo → Taormina',
        heroText: 'Uçak batıya iniyor, doğudan kalkıyor; yani ada bir kez geçiliyor ve hiçbir yol iki kez yürünmüyor. Trapani’de iki gece: bir gün Egadi adalarında tekneyle, akşamüstü teleferikle Erice’ye. Palermo’da iki gece: Norman mozaikleri ve İtalya’nın en gürültülü pazarları. Sonra trenle, kapının önünden girilen bir koya. Cuma Etna, perşembe sabah dokuzda —otobüs kafileleri gelmeden— antik tiyatro ve her gün bir yüzme. Ağustos usulü kurgulandı, doğrudan vloglardan: erken çık, öğlen suya gir, dokuzdan sonra canlan.',
        heroPlaceholder: 'İkinizin fotoğrafını buraya bırak',
        homeKicker: 'Ev üssü',
        homeNote: 'Çaydanlık merkezi, 29’unda dönüş',
        flightLabel: '~3 saatlik uçuş',
        bcnKicker: '1-4. geceler',
        bcnNote: 'Egadi, Erice, mozaikler, Mondello',
        trainLabel: 'Otobüs, sonra ada treni',
        vlcKicker: '5-7. geceler',
        vlcNote: 'Taormina, Isola Bella, Etna',
        city1: 'Trapani · Palermo',
        city1Href: 'https://www.google.com/maps/search/?api=1&query=Trapani',
        city2: 'Taormina · Giardini Naxos',
        city2Href: 'https://www.google.com/maps/search/?api=1&query=Giardini%20Naxos',
        mapIntro: 'Her durak haritada iğneli — kesikli çizgiler gidiş ve dönüş uçuşları, düz adaçayı yeşili adayı geçen tren. İmleci iğnenin üzerine getir adı, dokun zamanı çıksın; düğmeler doğruca o kıyıya yakınlaşır.',
        izemDesc: 'Mimar. Palatina Şapeli ve antik tiyatro günleri onun için kuruldu.',
        ahmetDesc: 'Öğrenci. Öğrenci kartını yanından ayırma: Teatro Antico ve Sicilya’daki devlet müzelerinin çoğu 18-25 yaş arasına yarı fiyat.',
        vlogsKicker: 'Vlogların öğrettikleri',
        vlogsText: 'Doğusundan batısına Sicilya vlogları ve makalelerinden damıtıldı: Palatina Şapeli’nin kraliyet dairelerinin kendine has bir takvimi var, brioche’li granita tatlı değil kahvaltı, cannolo gözünün önünde doldurulmalı, otobüs bileti tabacchi’den alınır ve valide edilmezse 100 euro, ağustosta ücretsiz plaj şeridi dokuzda doluyor, Erice teleferiği sert rüzgârda kapanıyor, Egadi koyları kesme kalker — deniz ayakkabısı istiyor, Etna’nın tepesi ayın son haftasında bile soğuk. İyonya denizi: 27 °C. Deniz ayakkabısı, yanardağ için polar, pazarlar ve deniz rezervi ücreti için nakit koy çantaya.'
      },

      cats: {
        travel: 'Ulaşım', sights: 'Gezilecek yer', museum: 'Müze', boat: 'Tekne turu',
        swim: 'Yüzme', food: 'Yeme içme', event: 'Akşam programı', stay: 'Konaklama'
      },
      filters: {
        all: 'Hepsi', boat: 'Tekne turları', swim: 'Yüzme', sights: 'Gezilecek yerler',
        museum: 'Müzeler', food: 'Yemek', event: 'Akşam programı'
      },

      days: [
        { city: 'Trapani', title: 'Wigston → Trapani', sub: '22 Ağustos Cumartesi · uçuş günü, gece yarısına doğru tuz şehrine iniş' },
        { city: 'Egadi → Erice', title: 'Tekneyle Egadi, sonra Erice', sub: '23 Ağustos Pazar · dokuz buçukta limandan çıkış, yedide teleferikle dağın tepesine' },
        { city: 'Trapani → Palermo', title: 'Otobüsle doğuya, Norman mozaikleri', sub: '24 Ağustos Pazartesi · sekizde otobüs, on birde şapel, öğlen Ballarò' },
        { city: 'Mondello', title: 'Mondello, bütün gün suda', sub: '25 Ağustos Salı · sekiz buçukta 806, ışık gidene kadar kum' },
        { city: 'Palermo → Naxos', title: 'Trenle adayı geçiş', sub: '26 Ağustos Çarşamba · kıyıdan kıyıya dört saat, dörtte suya' },
        { city: 'Taormina', title: 'Taormina, tepeden aşağı', sub: '27 Ağustos Perşembe · dokuzda tiyatro, birde teleferikle denize' },
        { city: 'Etna', title: 'Etna, sonra son yüzme', sub: '28 Ağustos Cuma · sabah 2.900 metre, beşte deniz seviyesi' },
        { city: 'Ev', title: 'Arrivederci, Sicilya', sub: '29 Ağustos Cumartesi · iki tren, bir uçak, altıda çaydanlık ocakta' }
      ],

      acts: {
        i1b1: { title: 'Stansted → Trapani uçuşu', desc: 'Wigston’dan bir gibi çıkış; Stansted M1 ve M11 üzerinden yaklaşık iki saat, araba bütün hafta uzun süreli otoparkta kalıyor. Ryanair FR4494 17:45’te kalkıyor, yerel saatle 21:40’ta Trapani-Birgi’ye iniyor — havada üç saatten biraz az. Herkese birer kabin çantası; bantta bekleyecek valiz yok, ki bu kadar geç bir inişte bunun kıymeti var.', tip: 'Trapani’den giriş, Katanya’dan çıkış: ada bir kez, batıdan doğuya geçiliyor ve hiçbir yol iki kez yürünmüyor. Bu bacağın fiyatına henüz bakılmadı — 4 Ağustos’ta dönüş bacağı kişi başı £201,65’ti, bu da bir kontrol istiyor. Bilet: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-22&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=STN&destinationIata=TPS' },
        i1b2: { title: 'AST otobüsüyle Trapani’ye', desc: 'AST otobüsü terminalin hemen önünde, çıkışta solda duruyor ve 23:30’a kadar aşağı yukarı saat başı kalkıyor — merkeze kırk dakika, limana kırk beş. Bilet şoförden, nakit ya da kart, kişi başı €2,70 civarı. 21:40 inişiyle son otobüse rahat bir saat pay kalıyor.', tip: 'Bagajlar gecikirse ya da otobüs yeni kalkmışsa eski şehre taksi €30 civarı — bu saatte bir sonrakini beklemektense değer. Tarifeler oynuyor; birkaç gün önceden havalimanının kendi sayfasına bak: https://www.airgest.it' },
        i1s1: { title: 'Yerleşme: Trapani eski şehir', desc: 'İki gece, limanla deniz surları arasındaki kara parmağının üstünde, eski şehrin içinde: tekne sabah yürüyüşünün bir ucundan kalkıyor, teleferik öbür yönde kısa bir sıçrama. Henüz ayrılmadı — “Uçmadan önce ayırt” listesindeki nota bak.', tip: 'Eski şehir küçük ve büyük ölçüde yaya; ZTL yüzünden içeri araba sokmak zaten kötü fikir — arabasız gidince bunun önemi yok ama surların içindeki hemen her yerin hem limana hem otogara yürünebilir olması demek.' },
        i1b3: { title: 'İlk tabak, açık olan neyse', desc: 'Sicilyalılar akşam yemeğine dokuzda oturuyor, dolayısıyla gece yarısına doğru Corso Vittorio Emanuele boyunca ve Balık Pazarı meydanı çevresindeki barlar hâlâ ayakta. Küçük bir şey, bir içki ve ışıklandırılmış Barok ana caddeye ilk bakış. Sonra uyku — tekne dokuz buçukta kalkıyor.', tip: 'Batı Sicilya, Palermo’dan başka yiyor: buranın pestosu trapanese, yani çam fıstığı ve fesleğen yerine badem ve domatesle; altındaki makarna da busiate. Menüde görür görmez söylenecek şey.' },

        i2b1: { title: 'Tekneyle Egadi adaları — Favignana ve Levanzo', desc: 'Bütün gün suda. Tekne limandan dokuz buçukta kalkıyor, önce büyük ada Favignana’ya gidiyor ve adanın meşhur koylarını sıralıyor — taş ocağından kesilme kalker duvarlarıyla Cala Rossa, Bue Marino, Cala Azzurra — arada yüzme molaları ve kasabada karaya çıkma vakti var. Sonra küçük ve sakin olanı Levanzo: Cala Fredda, Cala Minnola ve faraglione. Trapani’ye dönüş beşle altı arası.', tip: 'Teknede öğle yemeği genelde pesto alla trapanese’li makarna; su ve şarap dahil. Egadi deniz rezervi ücreti kişi başı €5 civarı ve buluşma noktasında nakit ödeniyor, cebinde bulunsun. Önceden ayırt — ağustos tekneleri günler öncesinden doluyor, GetYourGuide ücretsiz iptal ediyor: https://www.getyourguide.com/trapani-l1159/from-trapani-favignana-and-levanzo-mini-cruise-with-lunch-t240987/ · Teknenin programı yerine adayı kendinize istiyorsanız alternatif şu: Liberty Lines deniz otobüsüyle karşıya (30-40 dk) ve orada bisiklet, günlüğü €7-10: https://www.libertylines.it/en/' },
        i2b2: { title: 'Teleferikle Erice’ye', desc: 'Duş alınmış, yeniden dışarı: teleferik dağı üç kilometre boyunca on dakikada tırmanıyor ve seni 750 metrede surlarla çevrili ortaçağ kasabasına bırakıyor. Aşağıda tuzlalar, bütün körfez ve az önce içinde yüzdüğünüz Egadi serili duruyor.', tip: 'Tek yön €9, gidiş-dönüş €15 — gidiş-dönüş al, açıkça ucuz. 13 Temmuz-30 Ağustos arası pazar günleri 09:00-01:00 çalışıyor, yani akşam çıkıp gece inmek ikisi de mümkün; pazartesileri ancak 14:00’te açıyor. Sert rüzgârda kapanıyor, çıkmadan bak: https://www.funiviaerice.it/it/page/orari' },
        i2b3: { title: 'Gün batımında Erice', desc: 'Arnavut kaldırımı sokaklar, avlular, uçurumun kenarında bir Norman kalesi ve bu saatte altı yüz metre aşağıdaki tuzlaların üstüne pembeye dönen ışık. Küçük bir kasaba — bir saat çoğunu yürütür — ve otobüs kafileleri gidince boşalıyor; bunun akşam programı olmasının, öğlenin ortası olmamasının sebebi tam olarak bu.', tip: 'Burası dağ: yanına bir kat al. Erice ağustosta bile bulutun içinde kalabiliyor ve kıyıdan on derece serin olabiliyor.' },
        i2b4: { title: 'Maria Grammatico’da genovesi', desc: 'Erice’ye yemek için gelinen tek şey: genovesi — limonlu muhallebiyle doldurulmuş, ılık servis edilen yuvarlak kurabiyeler. Maria Grammatico tarifleri kız çocuğuyken San Carlo manastırının yetimhanesinde öğrendi ve seksenlerin başında kendi dükkânını açtığında hepsini hafızasından yeniden kurdu — hikâyesi bir kitap: Bitter Almonds. Ilık iste.', tip: 'Tezgâhta yer ayırmaya değer diğerleri: badem ezmeli tatlılar ve mustazzoli. Kuyrukta nakit karttan kolay.' },
        i2b5: { title: 'Yukarıda akşam yemeği, sonra son kabin', desc: 'Surların içinde, aşağıda kıyı ışıl ışılken akşam yemeği; sonra teleferikle iniş — yaz ortasında pazar günleri gece bire kadar çalışıyor, yani acele yok.', tip: 'Teleferik rüzgârdan kapalıysa Trapani’ye inen AST otobüsü 40-60 dakika ve €2,90 civarı — ama akşam çok daha erken kesiliyor, o yüzden ikisine de yemekten sonra değil, önce bak.' },

        i3b1: { title: 'Otobüsle Palermo’ya', desc: 'Trapani’den sekizde kalkan Segesta Autolinee otobüsü: tepeleri aşıp Palermo’ya inmesi bir saat otuz beş dakika kadar, kişi başı €11 civarı ve sabah boyunca saat başı ya da daha sık kalkıyor. Bagajlar otobüste ve onda adanın bütün batısı arkanızda kalıyor.', tip: 'Trapani’de durak limanda, ikincisi tren istasyonunda; Palermo’da Politeama’ya ve Stazione Centrale’ye bırakıyor. Tarife ve bilet: https://www.segesta.it/en/ · Bilinmeye değer: yol Segesta sapağının önünden geçiyor ve oradaki Dor tapınağı adanın en büyük manzaralarından biri — Trapani’den Tarantola otobüsü 08:00’de gidiyor, 13:10’da dönüyor, tek yön €4 civarı. Ev taşınan bir güne sığmıyor ama gezi bir gece daha uzarsa eklenecek ilk şey o.' },
        i3s1: { title: 'Yerleşme: Eurostars Centrale Palace', desc: 'Palermo gecelerinin evi: Corso Vittorio Emanuele üzerinde, eski şehrin merkez kabul edildiği kavşak Quattro Canti’nin tam köşesinde, saraydan çevrilme dört yıldızlı bir otel. Booking’in verdiği £120 gecelik tarifeyle iki gece — £241 artı £16 vergi civarı — 2.716 misafirin puanı 8,6 ve ücretsiz iptalli. Oda hazır olmadan çantalar aşağıya bırakılabilir.', tip: 'Bütçeye giren 663 Booking.com adayı arasından seçildi; altı alternatif Nerede uyuyoruz sayfasında. Gecelik tarife 4 Ağustos’ta dört gecelik konaklama için canlı bakıldı — buradaki iki gecelik toplam o tarifenin ikiyle çarpımı, yeni bir arama değil; ayırtırken doğrula. Rezervasyon: https://www.booking.com/hotel/it/eurostars-centrale-palace.en-gb.html' },
        i3b2: { title: 'Palazzo dei Normanni + Cappella Palatina', desc: 'Çantalardan doğruca Norman sarayına ve içindeki Palatina Şapeli’ne: on ikinci yüzyıldan kalma, tabandan tavana altın Bizans mozaiğiyle kaplı küçük bir mekân, üstünde oymalı Arap ahşap tavanı. Bir saat ayır, sonra üst kattaki kraliyet daireleri — pazartesi onların görülebildiği günlerden biri.', tip: 'Bu ziyaretin pazartesiye konmasının sebebi dairelerin kuralları. Resmî açıklama: Sicilya Meclisi toplanmadığı zaman cuma-pazartesi arası açık. Bazı kaynaklar ise “salı ve perşembe kapalı” diyor. Pazartesi her iki okumada da uyuyor, burada olmasının sebebi bu — ama oturumlar ve ayinler hiç haber vermeden kapatabiliyor, bir gün önceden teyit et. Dairelerle birlikte €19, kuyruğu atlamak için internetten: https://www.federicosecondo.org/en/buy-ticket-online/ · Omuz ve diz kapalı, ikiniz de.' },
        i3b3: { title: 'Ballarò ve eski şehirden dönüş yürüyüşü', desc: 'Öğle yemeği pazarın kendisi. Ballarò sokaklar boyunca uzuyor: buz üstünde balık, fiyatını yarı şarkıyla bağıran satıcılar, sipariş üstüne kızartan tezgâhlar. Ayakta ye — ekmek arası panelle ve crocchè, bir arancina, bir dilim sfincione — ve kan portakalı suyunu iç. Sonra siestaya giderken katedralin, Quattro Canti’nin ve Piazza Pretoria’nın çıplak mermerlerinin içinden yokuş yukarı dolan.', tip: 'Vloglardan: panelle-crocchè sandviçi €1,50, meyve suyu €1-2 ve birinin tanesi €3’e önereceği istiridye turist fiyatı. Yemeği önceden pişirip önüne koymuş tezgâhı atla. Bir de orada motosikletin sıyırdığı blogger’dan: Quattro Canti meydan değil, işleyen bir kavşak — fotoğrafı kaldırımdan çek. Zaten birle beş arası her yer kapanıyor ve ağustos gününün en sıcak saati orası.' },
        i3b4: { title: 'Santa Caterina çatısı + rahibelerin cannolo’su', desc: 'Beş buçukta, ışık yumuşayınca yeniden dışarı. On euro Santa Caterina’nın tamamını açıyor: Barok kilise, avlu ve doğrudan Piazza Pretoria’ya, oradan eski şehrin bütün kubbelerine bakan çatı terasları. Aşağıda, manastırın pastanesi I Segreti del Chiostro, rahibelerin eskiden yaptığı tatlıları satıyor.', tip: 'Bir vlogger sipariş üstüne doldurulan cannolo’larını “hayatımın en iyisi” diye anlattı — ve açılıştan beş dakika sonra kuyruğun oluştuğunu söyledi. Altıda kalabalık daha ince. Kural her yerde aynı: sen istemeden doldurulmuşsa kabuğu çoktan yumuşamıştır.' },
        i3b5: { title: 'Foro Italico + deniz surları', desc: 'Akşam yürüyüşü: eski şehirle su arasındaki uzun çimenlik Foro Italico boyunca, sonra Palermo’nun dul kadınlarının yürüdüğü yükseltilmiş sahil yolu Mura delle Cattive. Bütün şehir yedide bunu yapıyor.' },
        i3b6: { title: 'Grano Granis’te akşam yemeği', desc: 'Teatro Massimo yakınında, menüsü kısa küçük bir yer — ki Sicilya’da bu iyiye işaret: kızarmış patlıcanlı ve tuzlu ricotta’lı pasta alla Norma, involtini, caponata. Dokuzda git ve beklemeyi göze al, ya da sekiz buçukta git ve ilk ol.', tip: 'Vloglardan: Via Maqueda ve Corso Vittorio Emanuele boyunca eline menü tutuşturan aperitivo barları turist tuzağı. Bir sokak içeri gir, yeter. Cesur olana, başka bir akşam: Corso Calatafimi’deki Nino u Ballerino’da pane ca meusa — iç yağında kızartılmış dalak ve akciğer, limon ve caciocavallo ile ekmek arası.' },

        i4b1: { title: '806 otobüsüyle Mondello’ya', desc: 'Mondello, Palermo’nun plajı; 806 da şehrin oraya gitme şekli: Politeama’nın arkasındaki Piazza Sturzo’dan, Favorita parkının içinden, ağustos trafiğinde kırk dakika kadar. Bileti önce al, herhangi bir tabacchi’den — orada €1,40, şoförden €1,80.', tip: 'Bindiğin an valide et: cezası €100 ve gerçekten kesiliyor. Canlı saatler için Moovit; duraktaki tarife işe yaramıyor.' },
        i4b2: { title: 'Mondello, kumlu olan', desc: 'İki burun arasında iki kilometrelik açık renk kum kavisi; sığ, turkuaz ve koyun ortasında kazıklar üstünde duran Liberty üslubu plaj pavyonu. Ya ücretsiz şeritlerden birine kur (iki uçta ve işletmelerin arasında var) ya da bir lidodan kirala.', tip: 'Vloglar ve yerel rehberler hemfikir: ağustosta ücretsiz kum dokuzda bitiyor, yani bu sekiz buçuk otobüsü, on buçuk değil. İki şezlong ve şemsiye Italo-Belga lidolarında (yani neredeyse hepsinde) €35 civarı; önceden ayırt: https://booking.mondelloitalobelga.it/ · Ekonomik versiyon: kendi gölgeni götürürsen Bassa Marea kişi başı €6-8.' },
        i4b3: { title: 'Sahildeki büfeden panino', desc: 'Öğle yemeği, sahil yolundaki büfelerden €6-8’lik bir panino; kumda yenir.', tip: 'Palermolu bir rehberin yerel kuralı: o sahilde manzarayla yemek ters orantılı. Büfe iyi, teraslı restoran kötü. Ve plajdaki seyyar satıcıdan bir şey almadan önce fiyatını sor — sormazsan €2,50’lik bira €6 oluyor.' },
        i4b4: { title: 'Capo Gallo, sakin uç', desc: 'Koyun uzak ucuna yürü ve Capo Gallo rezervine iki euro ver: kum sayılacak yer yok, uzanılacak düz kayalar ve şehir çevresindeki en berrak su var. İkisini de çeken tek başına gezen bir vlogger, cumartesi günü bile Mondello’dan belirgin biçimde boş olduğunu söylüyor.', tip: 'Kaya, deniz kestanesi ve sıfır gölge — deniz ayakkabısı ve altına serecek bir şey götür. Değerli eşya havlunun üstünde değil altında, poşette; ve suya sırayla girin.' },
        i4b5: { title: 'Procopio’da pizza', desc: 'Duş alınmış, şehre dönülmüş ve dokuzda pizza yeniliyor — sezonda dolan, rezervasyon alan bir yer. Sabah plaja gitmeden ara. Sonrasında çantalar toplanır: ada treni erken kalkıyor.' },

        i5b1: { title: 'Intercity ile adayı geçiş', desc: 'Sabah doğuya giden tren: Palermo Centrale’den kuzey kıyısı boyunca Intercity ile Messina’ya, orada aktarma yapıp İyonya kıyısındaki hattan Taormina-Giardini’ye. Toplam dört saat kadar, çoğunda deniz camda; ilk bacakta rezerve koltuk ve düzgün bagaj rafları var.', tip: 'Tarifelerden: en hızlı bağlantılar Messina’da tek aktarmayla yaklaşık 3 sa 54 dk sürüyor ve Intercity koltuğu rezervasyon istiyor — o bacakta ucuz tarifeler ağustos sonunda tükeniyor. Otobüs alternatifi (SAIS ile Katanya’ya €14, sonra Interbus ile Taormina’ya) daha sık kalkıyor ama sıcakta iki kez bagaj taşımak demek. Bilet: https://www.trenitalia.com/en.html' },
        i5s1: { title: 'Yerleşme: B&B Al Sole di Sicilia', desc: 'Doğu kıyısı üssü ve bilerek Taormina değil: Giardini Naxos’ta, kumdan yüz metre uzakta, 462 misafirin 9,6 verdiği bir B&B; üç gece £324 artı £10 vergi — geceliği yaklaşık £108, ücretsiz iptalli. Kayalığın üstündeki Taormina, sudan daha uzak bir oda için bunun bir buçuk katını istiyor.', tip: 'İstasyondan kısa bir taksi (€10-15 civarı) ya da sahil boyunca yirmi dakika. Rezervasyon: https://www.booking.com/hotel/it/b-amp-b-al-sole-di-sicilia.en-gb.html' },
        i5b2: { title: 'İlk yüzme, Naxos koyu', desc: 'Çantaları bırak ve denize gir. Giardini Naxos uzun, sığ bir koy: koyu volkanik kum, Taormina’nın yarı fiyatına şezlong ve koy o kadar geniş olduğu için ücretsiz kalmayı sürdüren şeritler.' },
        i5b3: { title: 'Naxos sahilinde akşam yemeği', desc: 'Lungomare Tysandros boyunca, yukarıda karanlıkta asılı duran Taormina ışıklarıyla akşam yemeği — kılıç balığı ya da fıstıklı makarna, arkasından granita. Taormina fiyatı değil, Naxos fiyatı: ikisinde de yemiş bir blogger Taormina’da başlangıçların €30’a çıktığını yazıyor.' },
        i5b4: { title: 'Karanlıkta Taormina', desc: 'Akşam için otobüsle yeniden yukarı — vlogların hepsinin övdüğü saat: Corso Umberto arabaya kapalı ve baştan sona yürüyen insanlarla dolu, köşelerde sokak müzisyenleri, Piazza IX Aprile ışıl ışıl ve arkasında kapkara deniz. Bir dondurma, tiyatronun kapısına bir bakış, sonra son otobüs ya da taksiyle aşağı.', tip: 'Mekânın kendi takviminden kontrol edildi: bizim gecelerimize denk gelen konser yok. Teatro Antico’nun yaz sezonu biz gelmeden iki gün önce bitiyor — 22 ve 23’ünde Il Volo, 24 ve 25’inde Pooh, sonra eylüle kadar hiçbir şey. Yeni tarih eklenirse burada görünür: https://www.ticketone.it/venue/teatro-antico-di-taormina-15305/' },

        i6b2: { title: 'Otobüsle yokuş yukarı', desc: 'Taormina kendi istasyonunun iki yüz metre yukarısında ve yürümek kırk beş dakikalık virajlı bir tırmanış demek. Interbus ve ASM otobüsleri Giardini Naxos’tan yaklaşık on beş dakikada çıkarıyor.', tip: 'Bilet otobüste satılmıyor — önce terminal büfesinden ya da tabaccheria’dan al (€2-3 civarı) ve binerken valide et.' },
        i6b3: { title: 'Teatro Antico, tam dokuzda', desc: 'Taradığımız bütün Sicilya vloglarında en çok önerilen tek şey bu Yunan tiyatrosu ve kapı açılırken orada olmanın sebebi de o: sahnenin yıkık arka duvarından çerçevelenen Etna, öbür yanda İyonya ve her yerine tırmanabiliyorsun. On birde kuyruğa dönüşüyor.', tip: '€14 (bazı resmî sayfalar hâlâ €12 yazıyor — sergi farkı oynuyor), 18 yaş altı ücretsiz, öğrenci kartıyla 18-25 yarı fiyat. Resmî: https://parchiarcheologici.regione.sicilia.it/naxos-taormina/en/biglietti/teatro-antico-di-taormina-2/ · Konser günlerinde gündüz ziyaretine erken kapanıyor; sabah olmasının bir sebebi de bu.' },
        i6b4: { title: 'Bam Bar’da granita, sonra Corso Umberto', desc: 'Sicilya kahvaltısı, usulünce ve geç: içine batırmak için brioche col tuppo ile granita. Bam Bar meşhur olanı — limonlusundan başla. Sonra Corso Umberto’yu baştan sona yürü; satranç tahtası döşemeli ve manzaralı Piazza IX Aprile’den geç.', tip: 'Vloglardan, dürüstçe: granita mükemmel ve Katanya’dakinden ya da Palermo’dakinden daha iyi değil — parayı adrese veriyorsun. Öğle ve akşam yemeğini de Corso’nun üstünde değil, bir ara sokak içeride ye.' },
        i6b5: { title: 'Villa Comunale, gölgede', desc: 'Bir İngiliz aristokratın uçurum kenarına kurduğu halk bahçesi: ücretsiz, gölgeli, Corso omuz omuza sürünürken öğlen yarı boş ve manzarası dün yüzdüğün koya dik iniyor.' },
        i6b6: { title: 'Teleferikle Isola Bella’ya iniş', desc: 'Funivia uçurumdan Mazzarò’ya üç dakikada iniyor, on beş dakikada bir, gece bir buçuğa kadar. Aşağıda Isola Bella var: kıyıya çakıl şeridiyle bağlanan minik yeşil ada ve Sicilya’nın en bilinen yüzme koyu.', tip: 'Teleferik tek yön €8, gidiş-dönüş €15. Plaj çakıl ve keskin kaya — deniz ayakkabısız giden bir vlogger çifti neredeyse yüzemedi, o yüzden inmeden bir tezgâhtan al (€10 civarı). Ağustosta şezlong ve şemsiye €30-50; ücretsiz şerit onda doluyor. Adacığın kendisi €5’lik biletli bir rezerv ve fırtına hasarından hâlâ kapalı olabilir — buna güvenmeden önce bak: https://parchiarcheologici.regione.sicilia.it/naxos-taormina/' },
        i6b7: { title: 'Isola Bella + Mavi Mağara tekne turu', desc: 'Öğleden sonranın sonunda suda bir saat, Giardini Naxos’tan çıkışlı: Isola Bella’nın çevresi, Grotta Azzurra’nın içi, Capo Taormina önü ve atlayıp yüzmek için bir mola. Kişi başı €25 civarı; iki saatlik versiyonunda prosecco ve yüzme molaları var.', tip: 'Önceden ayırt — ağustos tekneleri günler öncesinden doluyor, GetYourGuide ücretsiz iptal ediyor: https://www.getyourguide.com/taormina-l1518/boat-trip-giardini-naxos-taormina-isola-bella-grotta-azzura-t585002/' },
        i6b8: { title: 'Naxos’a inip akşam yemeği', desc: 'Teleferik ve otobüsle aşağı, akşam yemeği yine sahilde ve olması gereken fiyata. Erken yat — yanardağ yedi buçukta başlıyor.' },

        i7b1: { title: 'Etna, 2.900 metreye', desc: 'Bütün gün: Giardini Naxos’tan minibüsle alınma, yanardağın yamacından 1.900 metredeki Rifugio Sapienza’ya, teleferikle 2.500 metreye, oradan dört çekerle ve rehberle siyah külün üstünden yaklaşık 2.900 metreye — hâlâ tüten kraterlerin kenarına. 2.800 metrenin üstüne sertifikalı rehber olmadan kimse çıkamıyor; bunun otobüs değil tur olmasının sebebi bu.', tip: 'Taormina çıkışlı tam versiyon kişi başı €120 civarı: https://www.getyourguide.com/taormina-l1518/mount-etna-tour-to-2900m-from-taormina-475-excellent-t636956/ · Daha ucuz yarım günlük 1.900 metre Silvestri kraterleri turu Katanya’dan €60 civarı. Giyimi ciddiye al — bunu 21 Ağustos’ta çeken bir vlogger üşüdü: uzun pantolon, polar ve rüzgârlık, kapalı ayakkabı, kişi başı iki litre su. Teleferik sert rüzgârda kapanıyor.' },
        i7b2: { title: 'Son yüzme', desc: 'Beşte aşağıda ol, kapının önünden denize gir ve ışık gidene kadar çık.' },
        i7b3: { title: 'Uzun son yemek', desc: 'Asıl olanı: Naxos sahilinde bir masa, henüz yemediğiniz ne varsa — sardalyalı makarna, kılıç balığı involtini, cassata — ve arkasından su kenarında bir yürüyüş.' },

        i8b1: { title: 'Katanya Centrale treni', desc: 'Kıyı boyunca bölgesel tren, yaklaşık kırk beş dakika, €5,10, rezervasyon gerekmiyor. Çantalar bir önceki akşamdan hazır.' },
        i8b2: { title: 'Alibus ile havalimanına', desc: 'Katanya Centrale’nin önünden Alibus, Fontanarossa havalimanına yirmi dakikada bir kalkıyor: €4, yaklaşık yirmi beş dakika. Terminalde son bir granita’ya vakit var.', tip: 'Sabah erken biterse balık pazarı La Pescheria istasyona beş dakika ve cumartesi 07:30-14:00 açık — ama bagajla değil.' },
        i8b3: { title: 'Katanya → Stansted uçuşu', desc: 'Ryanair FR8543 13:20’de kalkıyor, 15:40’ta Stansted’e iniyor. M11 ve M1’den iki saat ve altıda çaydanlık ocakta.', tip: '4 Ağustos’ta gerçek fiyat: kişi başı £201,65 ve yükseliyor — bütün tatilin fiyatını belirleyen bacak bu, o yüzden ilk onu al. Tarihler esneyebilirse 28 Cuma £176,88’di. Bilet: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-29&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=CTA&destinationIata=STN' }
      },

      bookings: {
        j1: 'Dönüş uçuşu, 29 Cmt: Ryanair FR8543 Katanya → Stansted 13:20-15:40, kişi başı £201,65 ve yükseliyor. Gezinin en pahalı ve en oynak bacağı — ilk bunu al. Bilet: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-29&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=CTA&destinationIata=STN',
        j2: 'Gidiş uçuşu, 22 Cmt: Ryanair FR4494 Stansted → Trapani 17:45-21:40. Bu hatta uçan tek şirket Ryanair ve haftada iki sefer var, yani o gün için ikinci bir seçenek yok — fiyatına henüz bakılmadı. Bilet: https://www.ryanair.com/gb/en/trip/flights/select?adults=2&teens=0&children=0&infants=0&dateOut=2026-08-22&dateIn=&isReturn=false&discount=0&promoCode=&isConnectedFlight=false&originIata=STN&destinationIata=TPS',
        j3: 'Yatak, Trapani 22 Cmt → 24 Pzt — henüz ayrılmadı ve bu planın tek açığı: Trapani geceleri için Booking’de canlı arama yapılmadı, o yüzden burada ne fiyat ne seçim var. Surların içindeki hemen her yer iş görür; yüksek puanlı küçük tesisler (Matri Mia, Il Sole Blu, Palazzo Gatto) ağustos sonunda erken gidiyor. Bizim tarihlerimizle arama: https://www.booking.com/searchresults.en-gb.html?ss=Trapani&checkin=2026-08-22&checkout=2026-08-24&group_adults=2&no_rooms=1&group_children=0&selected_currency=GBP&nflt=review_score%3D80',
        j4: 'Otel, Palermo 24 Pzt → 26 Çar: Eurostars Centrale Palace, £120’lik gecelik tarifeyle iki gece £241 + £16 vergi civarı, ücretsiz iptalli — yani şimdiden kilitle. İki gecelik toplam, gecelik tarifenin ikiyle çarpımı; yeni bir arama değil. Rezervasyon: https://www.booking.com/hotel/it/eurostars-centrale-palace.en-gb.html',
        j5: 'Otel, Giardini Naxos 26 Çar → 29 Cmt: B&B Al Sole di Sicilia, £324 + £10 vergi, ücretsiz iptalli. Küçük tesis, 9,6 puan, ağustos sonu — erken gider. Rezervasyon: https://www.booking.com/hotel/it/b-amp-b-al-sole-di-sicilia.en-gb.html',
        j6: 'Egadi tekne turu, 23 Paz · 09:30 — Favignana ve Levanzo, teknede öğle yemeğiyle; Trapani limanından çıkıp öğleden sonranın sonunda dönüyor. GetYourGuide’da ücretsiz iptalli ve ağustos tekneleri günler öncesinden doluyor. Deniz rezervi ücreti için kişi başı €5 civarı nakit taşı. Rezervasyon: https://www.getyourguide.com/trapani-l1159/from-trapani-favignana-and-levanzo-mini-cruise-with-lunch-t240987/',
        j7: 'Intercity Palermo → Taormina-Giardini, 26 Çar sabahı: rezerve koltuk, kişi başı €25 civarı ve ucuz tarifeler ağustosta tükeniyor. Bilet: https://www.trenitalia.com/en.html',
        j8: 'Cappella Palatina + kraliyet daireleri, 24 Pzt · 11:00 — kişi başı €19, gişe kuyruğunu atlamak için internetten. Kuralların her iki okumasında da pazartesi daireler açık; yine de oturumlar ve ayinler haber vermeden kapatabildiği için bir gün önceden teyit et. Bilet: https://www.federicosecondo.org/en/buy-ticket-online/',
        j9: 'Etna turu, 2.900 metre, 28 Cum — Giardini Naxos’tan almalı, kişi başı €120 civarı; ücretsiz iptalli ve ağustos günleri günler öncesinden doluyor. Rezervasyon: https://www.getyourguide.com/taormina-l1518/mount-etna-tour-to-2900m-from-taormina-475-excellent-t636956/',
        j10: 'Teatro Antico, 27 Per · 09:00 — kişi başı €14, öğrenci kartıyla 18-25 yarı fiyat, 18 yaş altı ücretsiz. Bilet: https://parchiarcheologici.regione.sicilia.it/naxos-taormina/en/biglietti/teatro-antico-di-taormina-2/',
        j11: 'Teatro Antico’da ayırtılacak bir şey yok: mekânın takviminden bakıldı, yaz sezonu bizim gecelerimizden önce bitiyor — 22-23 Ağustos Il Volo, 24-25 Pooh, sonra 4 Eylül’e kadar boş. Yine de tarihe yaklaşınca bir kez bakmakta fayda var, yeni tarih eklenebilir: https://www.ticketone.it/venue/teatro-antico-di-taormina-15305/',
        j12: 'Erice teleferiğinde ayırtılacak bir şey yok — bilet istasyondan alınıyor. Ama çıkmadan o günün saatlerine ve rüzgâra bak; iki tek yön €9 yerine €15’lik gidiş-dönüşü al: https://www.funiviaerice.it/it/page/orari',
        j13: 'Mondello lidosu, 25 Sal — iki şezlong ve şemsiye €35 civarı; ağustosta 48 saat önceden ayırt ya da sekiz buçukta gidip ücretsiz kuma kur. Rezervasyon: https://booking.mondelloitalobelga.it/',
        j14: 'Taormina koyu tekne turu, 27 Per · 17:00 — bir saat için kişi başı €25 civarı, ücretsiz iptalli, ağustosta doluyor. Rezervasyon: https://www.getyourguide.com/taormina-l1518/boat-trip-giardini-naxos-taormina-isola-bella-grotta-azzura-t585002/',
        j15: 'Pasaportlar, GHIC kartları ve seyahat sigortası — ve her birinin fotoğrafı aşağıdaki cüzdana. Çantaya: Egadi koyları ve Isola Bella’nın çakılları için deniz ayakkabısı, 2.900 metre ve gece Erice için polar ve rüzgârlık, kiliseler için uzun kollu bir şey (omuz ve diz, ikiniz de) ve nakit — Sicilya’nın yarısı hâlâ nakit seviyor, teknenin rezerv ücreti de yalnızca nakit.'
      },

      map: {
        htmlTitle: 'Sicilya — rota',
        panelTitle: 'Rota',
        panelDates: '22-29 Ağustos',
        viewAll: 'Tüm rota',
        legendLabel: 'Gösterge ▾',
        flight: 'Uçuşlar, ~3 sa',
        train: 'Otobüs + ada treni',
        catSights: 'Gezilecekler ve müzeler',
        catSea: 'Tekne ve yüzme',
        catFood: 'Yeme içme',
        catFiesta: 'Akşam programı',
        catStay: 'Nerede uyuyoruz',
        wigstonLong: 'Wigston — ev',
        tpsLong: 'Trapani · 1-2. geceler',
        pmoLong: 'Palermo · 3-4. geceler',
        taoLong: 'Taormina · 5-7. geceler',
        ctaLong: 'Katanya · dönüş uçuşu',
        lock: 'Haritayı açmak için dokun',
        openInMaps: 'Google Haritalar’da aç',
        spots: {
          staytrp: 'Trapani eski şehir — 1-2. geceler',
          staypal: 'Eurostars Centrale Palace — 3-4. geceler',
          staynax: 'Al Sole di Sicilia — 5-7. geceler',
          egadi: 'Egadi adaları tekne turu',
          erice: 'Gün batımında Erice',
          grammatico: 'Maria Grammatico’da genovesi',
          palatina: 'Palazzo dei Normanni + Cappella Palatina',
          ballaro: 'Ballarò pazarında öğle yemeği',
          caterina: 'Santa Caterina çatısı + cannolo',
          foro: 'Foro Italico akşam yürüyüşü',
          granis: 'Grano Granis’te akşam yemeği',
          mondello: 'Mondello plajı',
          capogallo: 'Capo Gallo rezervi',
          procopio: 'Procopio’da pizza',
          naxosbeach: 'Giardini Naxos koyu',
          teatro: 'Teatro Antico di Taormina',
          bambar: 'Bam Bar’da granita',
          villacomunale: 'Villa Comunale bahçeleri',
          isolabella: 'Isola Bella',
          boat: 'Tekne turu + Mavi Mağara',
          corsonight: 'Karanlıkta Corso Umberto',
          etna: 'Etna, 2.900 m'
        }
      },

      stays: {
        htmlTitle: 'Sicilya · nerede uyuyoruz',
        metaDesc: 'İki kasabada beş gece, Booking.com’da canlı arandı: banda giren her şey ve seçtiğimiz ikisi.',
        intro: '4 Ağustos’ta Booking.com’da canlı arandı: bir oda, iki yetişkin, yalnızca 8+ misafir puanı, gecelik £60-150. Palermo 663, Giardini Naxos 112 aday döndürdü — aşağıdakiler tartışmaya değer olanlar. O aramadan bu yana gezi başına Trapani’de iki gece kazandı, Palermo’dan iki gece kaybetti; dolayısıyla aşağıdaki Palermo sütunu aynı tesisler ve aynı gecelik tarifelerle, dört gece yerine iki geceye yayılmış hâli — yeniden aranmadı. Trapani ise henüz hiç aranmadı, burada sütunu olmamasının sebebi bu; onun rezervasyon satırı “Uçmadan önce ayırt” listesinde. İsimler tesisi bizim tarihlerimiz dolu halde açıyor.',
        updated: 'Gecelik tarifeler 4 Ağustos 2026’da bakıldı, Palermo o zamandan beri iki geceye çekildi — fiyatlar oynuyor; ayrılmış olanın doğrusu plan ve cüzdanda duruyor.',
        palTitle: 'Palermo · 3-4. geceler',
        palSub: '24 Pzt → 26 Çar. Üssün işi: Trapani otobüsünden iner inmez Palatina, pazar yemekleri, Politeama’dan Mondello’ya 806 ve Centrale’den erken doğu treni.',
        naxTitle: 'Giardini Naxos · 5-7. geceler',
        naxSub: '26 Çar → 29 Cmt. Ada treninden inip kapının önünde yüzülecek bir koy, tepede on beş dakika ötede Taormina ve kapıya gelen Etna minibüsü.',
        whyCentrale: [
          'Doğrudan Quattro Canti’nin üstünde: katedral, Ballarò, Santa Caterina ve Palatina Şapeli on beş dakikalık yürüme çemberinin içinde — yani gezinin bütün Palermo durağı yayan. Elde yalnız iki gece varken bütün mesele de bu.',
          'Trapani otobüsü hem Politeama’ya hem Stazione Centrale’ye bırakıyor, ikisi de bir kilometre kadar; doğuya giden tren de Centrale’den kalkıyor — yani Palermo konaklamasının iki ucu da çantalarla kısa bir yürüyüş.',
          '2.716 misafirden 8,6, gecelik yaklaşık £120’ye gerçek bir dört yıldız ve ücretsiz iptal: listede uçuşlar ayrılırken elde tutmanın hiçbir maliyeti olmayan tek tarife.'
        ],
        whyAlsole: [
          'Kumdan yüz metre. Onun yerine Taormina’da yatmak, hem odaya bir buçuk kat fazla ödemek hem de her yüzme için teleferiğe ya da otobüse binmek demek — bu plan her gün yüzüyor.',
          '462 misafirden 9,6, gecelik yaklaşık £108 ve ücretsiz iptal: yaptığımız dört aramanın en iyi puan/para oranı.',
          'Tekneler Giardini Naxos’tan kalkıyor, Etna minibüsü oradan alıyor ve akşam için Taormina yokuş yukarı on beş dakikalık otobüs — kartpostal adresini kaybediyorsun, gerisini kazanıyorsun.'
        ],
        beds: {},
        notes: {
          dimora: 'Aramanın en ucuz merkezi yatağı, gecelik £68; opera binasının yanında 8,3 ve ücretsiz iptalli — dört gecelik bir üs için yorum sayısı (209) ince kalıyor, ama bütçe daralırsa seçenek bu.',
          cavalieri: 'La Cala’da gecelik £76’ya 8,5; Kalsa akşamlarına yakın — bu tarifede iadesiz, onu tepeden uzak tutan da bu.',
          isula: 'Palermo listesinin en yüksek puanı, 310 misafirden 9,5, £91 — ama bir kilometre dışarıda bir konukevi, yani her sabah içeri yürüyüşle başlıyor.',
          tesori: 'Tarihî merkezde odalar, 8,8, merkeze 250 m, ücretsiz iptalli, £98 — en yakın rakip; yorum sayısında ve dört yıldız donanımında kaybediyor.',
          bbcanti: 'Seçtiğimizle aynı köşe, 2.847 misafirden 8,1, gecelik £110 — ama üstüne £36 vergi ve ücretsiz iptal yok.',
          mercure: 'Zincir konforu, gecelik £162: bandın üstünde ve karşılığında 8,6 değil 8,2 alıyorsun.',
          namuri: 'Taormina kestirmesi: kasabanın altındaki Mazzeo plajına 100 m, gecelik £101, 8,7 — iadesiz ve plajla kasaba arasında kötü bir orta nokta.',
          tullas: 'Bu aramanın her yerdeki en yüksek puanı, 526 misafirden 9,7, £103 — ama Recanati ucunda, istasyona 3 km kadar.',
          mysicily: '658 misafirden 9,5, £103, ücretsiz iptalli, merkeze 600 m içeride — suya 100 değil 700 metre.',
          marinablu: 'Plaja elli metre ve 313 misafirden 9,3, £111 — bu tarifede iadesiz.',
          mediterraneo: 'Gerçekten deniz kıyısında, 9,2, £111 — arkasında yalnız 108 yorum var ve iadesiz.',
          villaanna: 'Kartpostal adresi kazanırsa Taormina seçeneği: 9,3, ücretsiz iptalli, vergiler dahil, gecelik £150 — esnetilmiş bandın tepesi ve her yüzmeden 500 m yokuş yukarı.',
          meridia: 'Katanya karşı planı: gecelik £69, 8,8, Duomo’ya 300 m, ücretsiz iptalli. Hepsinin en ucuzu — ama Katanya’nın plajları lav kayası, yüzme haftası için yanlış uç.'
        },
        totalKicker: 'İki seçim birlikte',
        totalLine: 'Bu beş gece toplam £565 — gecelik £113, bandın içinde. Trapani’nin iki gecesi henüz eklenmedi.',
        totalNote: 'Palermo, Quattro Canti üstünde dört yıldız için gecelik £120 alıyor; Naxos denize yüz metre bir oda için £108. İkisi de ücretsiz iptalli ve iki rezervasyon satırı da “Uçmadan önce ayırt” listesinde bekliyor — yanlarında, hâlâ fiyatsız olan Trapani satırıyla.',
        method: 'Bu liste nasıl çıktı: Booking.com’da 22-26 ve 26-29 Ağustos 2026 için canlı arama, bir oda, iki yetişkin, 8+ misafir puanı ve gecelik £60-150 filtresi, baştan sona GBP — artı doğu kıyısı üssünü sınamak için Taormina ve Katanya’da paralel aramalar. Konum kalitesi turist broşürünün merkezine göre değil, bu plana göre değerlendirildi. Palermo tarihleri o zamandan beri 24-26’ya kaydı ve buradaki toplamlar aynı gecelik tarifelerin iki geceye yayılmış hâli; hem Palermo’yu hem Trapani’yi yeniden aramak sıradaki iş.'
      }
    }
  }
};
