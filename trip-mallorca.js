/* Mallorca · the Çelik plan — the third trip, whole.
 *
 * Same shape as trip-italy.js: the skeleton is ids, times, categories and
 * per-person euros; the words live once per language; the map keeps only
 * geometry. Registers itself into window.TRIPS and app.js / i18n.js /
 * trip-map.html read it when it is the one chosen (see trips.js).
 *
 * Prices: flights, the hotel and the UK rail leg were checked live on
 * 15 Aug 2026 — those say so. Bus fares come from TIB's own fare engine and
 * timetable PDFs, ticket prices from the venues' own sales pages.
 *
 * Two things this plan is honest about and the prose repeats: Jet2's flight
 * times were never confirmed (their site refuses automated reads), so the
 * two travel days carry assumed times; and one base means the north of the
 * island — Formentor — is out of reach.
 *
 * Loaded after trips.js and before i18n.js.
 */
window.TRIPS = window.TRIPS || {};
window.TRIPS.mallorca = {

  // — the skeleton ——————————————————————————————————————————————
  start: [2026, 7, 22],
  days: [
    { dom: '22', dot: 'var(--color-accent-3)', acts: [
      { id: 'm1b1', t: '09:30', cat: 'travel', eur: 28 },
      { id: 'm1b2', t: '12:00', cat: 'travel', eur: 157 },
      { id: 'm1b3', t: '16:45', cat: 'travel', eur: 5 },
      { id: 'm1s1', t: '17:30', cat: 'stay', eur: null },
      { id: 'm1b4', t: '18:00', cat: 'swim', eur: 15 },
      { id: 'm1b5', t: '21:00', cat: 'food', eur: 25 }
    ] },
    { dom: '23', dot: 'var(--color-accent-3)', acts: [
      { id: 'm2b1', t: '09:00', cat: 'travel', eur: 4 },
      { id: 'm2b2', t: '10:00', cat: 'museum', eur: 0 },
      { id: 'm2b3', t: '11:30', cat: 'museum', eur: 8 },
      { id: 'm2b4', t: '13:00', cat: 'food', eur: 18 },
      { id: 'm2b5', t: '15:00', cat: 'museum', eur: 8 },
      { id: 'm2b6', t: '17:00', cat: 'sights', eur: 2 },
      { id: 'm2b7', t: '20:00', cat: 'food', eur: 30 }
    ] },
    { dom: '24', dot: 'var(--color-accent-3)', acts: [
      { id: 'm3b1', t: '08:45', cat: 'travel', eur: 4 },
      { id: 'm3b2', t: '10:10', cat: 'travel', eur: 32 },
      { id: 'm3b3', t: '11:30', cat: 'sights', eur: 0 },
      { id: 'm3b4', t: '12:00', cat: 'food', eur: 18 },
      { id: 'm3b5', t: '13:00', cat: 'boat', eur: 35 },
      { id: 'm3b6', t: '17:45', cat: 'swim', eur: 0 },
      { id: 'm3b7', t: '18:30', cat: 'travel', eur: 0 },
      { id: 'm3b8', t: '21:00', cat: 'food', eur: 22 }
    ] },
    { dom: '25', dot: 'var(--color-accent-3)', acts: [
      { id: 'm4b1', t: '09:15', cat: 'travel', eur: 4 },
      { id: 'm4b2', t: '10:00', cat: 'sights', eur: 25 },
      { id: 'm4b3', t: '12:00', cat: 'food', eur: 10 },
      { id: 'm4b4', t: '13:30', cat: 'food', eur: 15 },
      { id: 'm4b5', t: '15:30', cat: 'swim', eur: 12 },
      { id: 'm4b6', t: '20:00', cat: 'event', eur: 30 }
    ] },
    { dom: '26', dot: 'var(--color-accent-3)', acts: [
      { id: 'm5b1', t: '09:30', cat: 'travel', eur: 10 },
      { id: 'm5b2', t: '11:30', cat: 'food', eur: 18 },
      { id: 'm5b3', t: '14:00', cat: 'museum', eur: 18.5 },
      { id: 'm5b4', t: '17:00', cat: 'travel', eur: 5.4 },
      { id: 'm5b5', t: '20:30', cat: 'food', eur: 25 }
    ] },
    { dom: '27', dot: 'var(--color-accent-3)', acts: [
      { id: 'm6b1', t: '09:00', cat: 'travel', eur: 8 },
      { id: 'm6b2', t: '10:15', cat: 'museum', eur: 12.5 },
      { id: 'm6b3', t: '12:30', cat: 'food', eur: 12 },
      { id: 'm6b4', t: '14:30', cat: 'sights', eur: 0 },
      { id: 'm6b5', t: '19:00', cat: 'travel', eur: 4 },
      { id: 'm6b6', t: '21:00', cat: 'food', eur: 30 }
    ] },
    { dom: '28', dot: 'var(--color-neutral-500)', acts: [
      { id: 'm7b1', t: '08:00', cat: 'swim', eur: 0 },
      { id: 'm7b2', t: '14:30', cat: 'travel', eur: 5 },
      { id: 'm7b3', t: '17:00', cat: 'travel', eur: 157 },
      { id: 'm7b4', t: '21:00', cat: 'travel', eur: 28 }
    ] }
  ],

  bookings: ['k1', 'k2', 'k3', 'k4', 'k5', 'k6', 'k7', 'k8', 'k9', 'k10'],

  maps: {
    m1b1: 'South Wigston railway station',
    m1b2: 'East Midlands Airport',
    m1b3: 'Palma de Mallorca Airport',
    m1s1: 'Carrer de Maria Antònia Salvà 44, S\'Arenal, Mallorca',
    m1b4: 'Platja de Palma',
    m1b5: 'S\'Arenal, Mallorca',
    m2b1: 'Plaça d\'Espanya, Palma',
    m2b2: 'Castell de Bellver, Palma',
    m2b3: 'Es Baluard Museu, Palma',
    m2b4: 'La Llotja, Palma',
    m2b5: 'Palau Reial de l\'Almudaina, Palma',
    m2b6: 'Banys Àrabs, Carrer de Can Serra 7, Palma',
    m2b7: 'Mercat de Santa Catalina, Palma',
    m3b1: 'Plaça d\'Espanya, Palma',
    m3b2: 'Estació del Ferrocarril de Sóller, Palma',
    m3b3: 'Port de Sóller tram terminus',
    m3b4: 'Port de Sóller',
    m3b5: 'Sa Calobra, Mallorca',
    m3b6: 'Platja d\'en Repic, Port de Sóller',
    m3b7: 'Sóller railway station',
    m3b8: 'S\'Arenal, Mallorca',
    m4b1: 'Plaça de la Reina, Palma',
    m4b2: 'Catedral de Mallorca',
    m4b3: 'Mercat de l\'Olivar, Palma',
    m4b4: 'Mercat de Santa Catalina, Palma',
    m4b5: 'Platja de ses Illetes, Calvià',
    m4b6: 'Carrer de Blanquerna, Palma',
    m5b1: 'Estació Intermodal, Palma',
    m5b2: 'Porto Cristo, Mallorca',
    m5b3: 'Coves del Drac, Porto Cristo',
    m5b4: 'Porto Cristo, Mallorca',
    m5b5: 'S\'Arenal, Mallorca',
    m6b1: 'Estació Intermodal, Palma',
    m6b2: 'Reial Cartoixa de Valldemossa',
    m6b3: 'Ca\'n Molinas, Valldemossa',
    m6b4: 'Deià, Mallorca',
    m6b5: 'Deià, Mallorca',
    m6b6: 'S\'Arenal, Mallorca',
    m7b1: 'Platja de Palma',
    m7b2: 'Palma de Mallorca Airport',
    m7b3: 'East Midlands Airport',
    m7b4: 'South Wigston railway station'
  },

  // One base all week, so the hint is the day's destination, not the bed.
  mapCity: ['Palma', 'Palma', 'Port de Sóller', 'Palma', 'Porto Cristo', 'Valldemossa', ''],

  places: {
    'Palma': 'Palma de Mallorca',
    'La Seu': 'Catedral de Mallorca',
    'Katedral': 'Catedral de Mallorca',
    'Catedral de Mallorca': 'Catedral de Mallorca',
    'Almudaina': 'Palau Reial de l\'Almudaina, Palma',
    'Palau Reial de l\'Almudaina': 'Palau Reial de l\'Almudaina, Palma',
    'Bellver': 'Castell de Bellver, Palma',
    'Castell de Bellver': 'Castell de Bellver, Palma',
    'Es Baluard': 'Es Baluard Museu, Palma',
    'Banys Àrabs': 'Banys Àrabs, Palma',
    'Mercat de l\'Olivar': 'Mercat de l\'Olivar, Palma',
    'Santa Catalina': 'Mercat de Santa Catalina, Palma',
    'Mercat de Santa Catalina': 'Mercat de Santa Catalina, Palma',
    'Passeig del Born': 'Passeig del Born, Palma',
    'Plaça d\'Espanya': 'Plaça d\'Espanya, Palma',
    'Estació Intermodal': 'Estació Intermodal, Palma',
    'La Llotja': 'La Llotja, Palma',
    'Blanquerna': 'Carrer de Blanquerna, Palma',
    'Carrer de Sant Feliu': 'Carrer de Sant Feliu, Palma',
    's\'Arenal': 'S\'Arenal, Mallorca',
    'S\'Arenal': 'S\'Arenal, Mallorca',
    'Playa de Palma': 'Platja de Palma',
    'Platja de Palma': 'Platja de Palma',
    'Can Pastilla': 'Can Pastilla, Palma',
    'Illetes': 'Platja de ses Illetes, Calvià',
    'ses Illetes': 'Platja de ses Illetes, Calvià',
    'Cala Major': 'Cala Major, Palma',
    'Sóller': 'Sóller, Mallorca',
    'Port de Sóller': 'Port de Sóller',
    'Platja d\'en Repic': 'Platja d\'en Repic, Port de Sóller',
    'Platja des Través': 'Platja des Través, Port de Sóller',
    'Sa Calobra': 'Sa Calobra, Mallorca',
    'Torrent de Pareis': 'Torrent de Pareis, Mallorca',
    'Cala Tuent': 'Cala Tuent, Mallorca',
    'Valldemossa': 'Valldemossa, Mallorca',
    'Cartoixa': 'Reial Cartoixa de Valldemossa',
    'Palau del Rei Sanç': 'Palau del Rei Sanç, Valldemossa',
    'Deià': 'Deià, Mallorca',
    'Cala Deià': 'Cala Deià, Mallorca',
    'Fornalutx': 'Fornalutx, Mallorca',
    'Porto Cristo': 'Porto Cristo, Mallorca',
    'Coves del Drach': 'Coves del Drac, Porto Cristo',
    'Coves dels Hams': 'Coves dels Hams, Porto Cristo',
    'Alcúdia': 'Alcúdia, Mallorca',
    'Port d\'Alcúdia': 'Port d\'Alcúdia, Mallorca',
    'Playa de Muro': 'Platja de Muro, Mallorca',
    'Port de Pollença': 'Port de Pollença, Mallorca',
    'Formentor': 'Cap de Formentor, Mallorca',
    'Cap de Formentor': 'Cap de Formentor, Mallorca',
    'Es Trenc': 'Platja des Trenc, Campos',
    'Colònia de Sant Jordi': 'Colònia de Sant Jordi, Mallorca',
    'South Wigston': 'South Wigston, Leicestershire',
    'Wigston': 'Wigston, Leicestershire',
    'East Midlands': 'East Midlands Airport',
    'Leicester': 'Leicester'
  },

  // — where we sleep ————————————————————————————————————————————
  // Booking.com, live 15 Aug 2026: 2 adults, 1 room, score 8+. The £60-150
  // band does not exist in Mallorca in late August; these are what does.
  stays: {
    cities: [
      { key: 'arn', nights: 6,
        q: '?checkin=2026-08-22&checkout=2026-08-28&group_adults=2&no_rooms=1&selected_currency=GBP',
        pick: { id: 'tent', name: 'tent Arenal', url: 'https://www.booking.com/hotel/es/tal.en-gb.html',
          area: 'S\'Arenal · 300 m from Platja de Palma', km: 14, score: 8.2, rev: 769, loc: 8.2,
          total: 1141, tax: 23, night: 190, was: null, cancel: true, payLater: true },
        alts: [
          { id: 'hostalpdp', name: 'Hostal Playa de Palma', url: 'https://www.booking.com/hotel/es/hostal-playa-de-palma.en-gb.html', area: 'S\'Arenal · 150 m from the sand', km: 14, score: 8.9, rev: 169, loc: 9.5, total: 1096, tax: 13, night: 183, was: null, cancel: false, payLater: false },
          { id: 'pabisa', name: 'Hotel Pabisa Sofia', url: 'https://www.booking.com/hotel/es/pabisa-sofia.en-gb.html', area: 'Playa de Palma · sea-view balcony', km: 13, score: 8.2, rev: 979, loc: 9.1, total: 1195, tax: 0, night: 199, was: null, cancel: false, payLater: false },
          { id: 'carmen', name: 'BQ Carmen Playa · Adults Only', url: 'https://www.booking.com/hotel/es/carmen-playa.en-gb.html', area: 'S\'Arenal · 250 m from the sand', km: 13.5, score: 8.5, rev: 366, loc: 8.8, total: 1261, tax: 0, night: 210, was: null, cancel: true, payLater: true },
          { id: 'delfin', name: 'BQ Delfín Azul', url: 'https://www.booking.com/hotel/es/stil-delfin-azul.en-gb.html', area: 'Port d\'Alcúdia · 550 m from the sand', km: 55, score: 8.4, rev: 518, loc: 8.8, total: 1368, tax: 0, night: 228, was: null, cancel: true, payLater: true },
          { id: 'jsplaza', name: 'JS Palma Plaza', url: 'https://www.booking.com/hotel/es/js-palma-plaza.en-gb.html', area: 'Palma centre · Plaça de Madrid', km: 1.1, score: 8.7, rev: 1277, loc: null, total: 1571, tax: 0, night: 262, was: null, cancel: true, payLater: true },
          { id: 'apuntadores', name: 'Apuntadores 8', url: 'https://www.booking.com/hotel/es/hostal-apuntadores.en-gb.html', area: 'La Llotja · 250 m from the centre', km: 0.25, score: 8.5, rev: 1831, loc: null, total: 1135, tax: 0, night: 189, was: null, cancel: false, payLater: false }
        ] }
    ]
  },

  // — the map ———————————————————————————————————————————————————
  map: {
    route: 'South Wigston → Palma → s\'Arenal',
    home: [52.5757, -1.1096],
    depart: [52.8311, -1.3281],
    drive: [[52.5757, -1.1096], [52.8311, -1.3281]],
    arcs: [
      [[52.8311, -1.3281], [39.5517, 2.7388], 2.6],
      [[39.5517, 2.7388], [52.8311, -1.3281], -2.6]
    ],
    // One base, spokes out of it: the airport bus down the bay, the Sóller
    // railway over the Tramuntana, the 401 east to the caves, the 203 up the
    // west coast to Valldemossa and Deià.
    lines: [
      [[39.5517, 2.7388], [39.5040, 2.7480]],
      [[39.5040, 2.7480], [39.5776, 2.6540]],
      [[39.5776, 2.6540], [39.6630, 2.6900], [39.7663, 2.7150], [39.7963, 2.6944]],
      [[39.7963, 2.6944], [39.8503, 2.8006]],
      [[39.5776, 2.6540], [39.6000, 2.9000], [39.5700, 3.2090], [39.5386, 3.3320]],
      [[39.5776, 2.6540], [39.6500, 2.6300], [39.7096, 2.6222], [39.7486, 2.6486]]
    ],
    cities: [
      { ll: [52.5757, -1.1096], label: 'South Wigston', longKey: 'wigstonLong', dir: 'right' },
      { ll: [39.5674, 2.6478], label: 'Palma', longKey: 'pmaLong', dir: 'left' },
      { ll: [39.5040, 2.7480], label: 's\'Arenal', longKey: 'arnLong', dir: 'right' },
      { ll: [39.7963, 2.6944], label: 'Port de Sóller', longKey: 'solLong', dir: 'right' },
      { ll: [39.5386, 3.3320], label: 'Porto Cristo', longKey: 'pcrLong', dir: 'right' }
    ],
    // [lat, lng, cat, spot key, day number, time, also-on-day]
    spots: [
      [39.50071, 2.75405, 'stay', 'staytent', 1, '17:30'],
      [39.5040, 2.7480, 'sea', 'platjapalma', 1, '18:00', 7],
      [39.5637, 2.6199, 'sights', 'bellver', 2, '10:00'],
      [39.5697, 2.6414, 'sights', 'baluard', 2, '11:30'],
      [39.5665, 2.6459, 'sights', 'almudaina', 2, '15:00'],
      [39.5695, 2.6503, 'sights', 'banys', 2, '17:00'],
      [39.5722, 2.6398, 'food', 'santacatalina', 2, '20:00', 4],
      [39.7663, 2.7150, 'sights', 'soller', 3, '11:10'],
      [39.7963, 2.6944, 'sea', 'portsoller', 3, '17:45'],
      [39.8503, 2.8006, 'sea', 'calobra', 3, '13:00'],
      [39.5674, 2.6478, 'sights', 'seu', 4, '10:00'],
      [39.5734, 2.6519, 'food', 'olivar', 4, '12:00'],
      [39.5352, 2.5925, 'sea', 'illetes', 4, '15:30'],
      [39.5749, 2.6446, 'fiesta', 'tapas', 4, '20:00'],
      [39.5324, 3.3305, 'sights', 'drach', 5, '14:00'],
      [39.5386, 3.3320, 'food', 'portocristo', 5, '11:30'],
      [39.7093, 2.6217, 'sights', 'cartoixa', 6, '10:15'],
      [39.7486, 2.6486, 'sights', 'deia', 6, '14:30']
    ],
    views: {
      'v-all': { bounds: [[52.5757, -1.1096], [39.5040, 2.5925], [39.8503, 3.3320]], pad: 60, label: null },
      'v-pma': { bounds: [[39.5300, 2.5800], [39.5900, 2.7600]], pad: 46, label: 'Palma' },
      'v-sol': { bounds: [[39.7400, 2.6600], [39.8600, 2.8100]], pad: 46, label: 'Sóller' },
      'v-est': { bounds: [[39.5100, 3.2800], [39.5600, 3.3600]], pad: 46, label: 'Porto Cristo' }
    }
  },

  // — the words —————————————————————————————————————————————————
  i18n: {
    en: {
      htmlTitle: 'Mallorca · the Çelik plan',
      metaDesc: 'Seven days from one base: Palma, the Sóller railway, Sa Calobra and a beach at the front door, 22-28 August.',
      dows: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      pill: '{dow} {dom}',

      static: {
        brand: 'Mallorca · the Çelik plan',
        navDates: '22-28 Aug 2026',
        tagDays: '7 days',
        tagSiblings: '2 siblings',
        tagSea: 'Sea at 27 °C',
        h1: 'South Wigston → Palma → s\'Arenal',
        heroText: 'One island, one bed, no bags to move mid-week. The base is a beach hotel on Platja de Palma with brunch running to half one, and everything else is a bus or a train out of Plaça d\'Espanya and back: Palma\'s old town on the Sunday when the castle is free, the 1912 wooden railway over the Tramuntana on the Monday and a boat on to Sa Calobra, the cathedral terraces and Illetes on the Tuesday, the caves and their underground concert on the Wednesday, Chopin in a Carthusian monastery on the Thursday. Swimming happens twice a day because the sand is three hundred metres from the door. What one base costs is the north: Formentor does not fit, and we said so rather than pretending.',
        heroPlaceholder: 'Drop a photo of you two',
        homeKicker: 'Home base',
        homeNote: 'Kettle HQ, back on the 28th',
        flightLabel: '~2h30 flight',
        bcnKicker: 'Nights 1-6',
        bcnNote: 'One base, brunch to 13:30, sand at 300 m',
        trainLabel: 'Buses and the Sóller railway',
        vlcKicker: 'Day trips',
        vlcNote: 'Sóller, Sa Calobra, the caves, Valldemossa',
        city1: 'Palma · s\'Arenal',
        city1Href: 'https://www.google.com/maps/search/?api=1&query=Palma%20de%20Mallorca',
        city2: 'Sóller · Valldemossa',
        city2Href: 'https://www.google.com/maps/search/?api=1&query=Port%20de%20S%C3%B3ller',
        mapIntro: 'Every stop, pinned — dashed lines are the flights out and home, solid the spokes out of the base: the railway over the mountains, the coast road to Valldemossa, the long run east to the caves. Hover a pin for its name, tap for the when.',
        izemDesc: 'Architect. The cathedral terraces and the Carthusian monastery are the two days planned around her.',
        ahmetDesc: 'Student. Carry the student ID: the Cartoixa is €8.50 rather than €12.50 with it.',
        vlogsKicker: 'What the vlogs taught us',
        vlogsText: 'Distilled from 20 Mallorca vlogs and 22 articles: tap a contactless card on the buses rather than paying cash, it is 40% cheaper and two people can share one card; the free-travel headline is for residents only. Half the bus numbers online are dead — 320, 330, 340 and the Es Trenc shuttle no longer exist, and Porto Cristo is the 401, not the 412. The cathedral shuts on Sundays and the Cartoixa shuts on Sundays; Bellver, Es Baluard and the Almudaina all shut on Mondays. Port de Sóller is the one beach that wants water shoes, and do not swim by the harbour — a vlogger filmed the water there and it is oily. Jellyfish were reported at Ses Illetes this summer, so check the map on the morning. Sea: 27 °C. Pack water shoes, earplugs for the corridor doors, and cash for the beach loungers.'
      },

      cats: {
        travel: 'Transit', sights: 'Sights', museum: 'Museum', boat: 'Boat trip',
        swim: 'Swim', food: 'Food & drink', event: 'Evening out', stay: 'Stay'
      },
      filters: {
        all: 'Everything', boat: 'Boat trips', swim: 'Swimming', sights: 'Sights',
        museum: 'Museums', food: 'Food', event: 'Evenings out'
      },

      days: [
        { city: 's\'Arenal', title: 'South Wigston → Palma', sub: 'Saturday 22 Aug · train, plane, and into the sea before dinner' },
        { city: 'Palma', title: 'Palma on the free day', sub: 'Sunday 23 Aug · Bellver free, the palace free at three, no cathedral today' },
        { city: 'Sóller', title: 'The wooden train and Sa Calobra', sub: 'Monday 24 Aug · 1912 railway at ten past ten, boat under the gorge at one' },
        { city: 'Palma', title: 'Cathedral terraces, markets, Illetes', sub: 'Tuesday 25 Aug · roof at ten, two markets, then the best-value sunbeds on the island' },
        { city: 'Porto Cristo', title: 'The caves and the lake concert', sub: 'Wednesday 26 Aug · 401 east, strings on a boat 25 metres underground' },
        { city: 'Valldemossa', title: 'Chopin, then Deià', sub: 'Thursday 27 Aug · piano in the monastery, the coast road after' },
        { city: 'Home', title: 'Adéu, Mallorca', sub: 'Friday 28 Aug · brunch, last swim, and home the way we came' }
      ],

      acts: {
        m1b1: { title: 'Train to East Midlands', desc: 'Out of South Wigston, one stop to Leicester, then the Skylink bus to East Midlands Airport — about an hour and five all in, and roughly £47.60 return for the two of us.', tip: 'The Skylink runs 24 hours a day, hourly through the night, which is the reason this airport won: of the seven we priced it is the only one where a midnight landing does not strand you. The catch is at the other end — the last Leicester → South Wigston train is 22:25, so a late arrival means a short taxi for the final four miles.' },
        m1b2: { title: 'Fly East Midlands → Palma', desc: 'Jet2 to Palma, about two and a half hours, £135 a head return. The fare includes a 10 kg cabin bag, which is why it beats the Ryanair fare that looks cheaper: Ryanair was £125 a head but its bags cost £133 for the two of us, so it lands £113 worse overall.', tip: 'Checked live on 15 Aug. The one thing we could not confirm is the flight time — Jet2\'s site refuses automated reads, so the times on this day and on the last are assumed, not verified. Check them at booking and shift the day if they land differently. Book: https://www.jet2.com/en/cheap-flights/east-midlands/majorca' },
        m1b3: { title: 'Bus A2 straight to the door', desc: 'The EMT A2 runs from the airport to s\'Arenal without going anywhere near Palma — twenty to twenty-five minutes, €5 each in cash and less on a contactless card. The hotel is eight kilometres from the terminal.', tip: 'A taxi is about €20-25 and it is metered, not a flat airport fare: €2.50 to start, €1.20 a kilometre, a €4.65 airport supplement and a €16.95 minimum.' },
        m1s1: { title: 'Check in: tent Arenal', desc: 'Home for all six nights: a hotel renovated in 2025 on Carrer Maria Antònia Salvà, three hundred metres from Platja de Palma, with two pools, a gym, a 24-hour desk and unlimited brunch every morning until half past one. £1,141 plus £23 for the six nights on the flexible rate — free cancellation until 19 August and nothing paid up front.', tip: 'Book it on Booking.com and not on Airbnb even though the listing is on both: the prices match to within a pound, but only Booking sells the free-cancellation rate and only Booking sells the room as "Double or Twin" — on Airbnb every room at this hotel is two single beds. There is a sea-view room for £103 more, and only two were left. Book: https://www.booking.com/hotel/es/tal.en-gb.html' },
        m1b4: { title: 'First swim, Platja de Palma', desc: 'Straight down to the sand. The beach runs four and a half kilometres, so unlike the small coves there is no rush to claim a spot — the crowd spreads out even in August.', tip: 'Palma\'s 2026 municipal rate is €10 for a lounger and €10 for a parasol, sold as packs: €20 for one bed, a parasol and a locker, €30 for the two-bed pack. Or take the free sand, which is everywhere. The s\'Arenal end is the loud one — walk toward Can Pastilla for quiet.' },
        m1b5: { title: 'First plate on the front', desc: 'Dinner on the seafront. Spain eats at nine, so nothing is rushed.', tip: 'From the guests\' own reviews of this hotel, honestly: this is not the prettiest corner of Mallorca and the bars nearby are wall-to-wall German tourism. It is also cheap, three hundred metres from the sea, and one street back the food gets better fast.' },

        m2b1: { title: 'Bus 23 into Palma', desc: 'The EMT 23 runs from s\'Arenal to Plaça d\'Espanya in thirty to forty minutes. This is the commute the single base buys you, four times over the week.', tip: 'Tap a contactless bank card rather than paying cash — it is about 40% cheaper on EMT, and cheaper again per head when two people tap the same card. Cash single is €2 and the driver takes notes up to €10.' },
        m2b2: { title: 'Castell de Bellver — free today', desc: 'A circular Gothic castle in pine woods above the bay, the only one of its shape in Spain, with the whole of Palma laid out below. Sunday is the day it costs nothing.', tip: 'Free on Sundays, €4 otherwise. April to September it opens Tuesday to Saturday 10:00-19:00 and Sundays 10:00-15:00 — so this is a morning, not an afternoon. Closed Mondays. One caveat: the castle\'s own site was down throughout our research, so these hours are from guides rather than the source — worth a look before you set off.' },
        m2b3: { title: 'Es Baluard, on the old sea wall', desc: 'Contemporary art inside a Renaissance bastion, with a terrace along the rampart looking over the marina. Sunday hours are 10:00 to 15:00.', tip: '€8 — several guides still say €6, which is out of date. Fridays are pay-what-you-want from €0.10, but our Friday is the flight home, so today it is €8. Closed Mondays.' },
        m2b4: { title: 'Lunch around La Llotja', desc: 'The old merchants\' exchange and the lanes behind it — this is where Palma eats when it is not at a market. Neither big market opens on a Sunday, so today lunch is a table rather than a stall.', tip: 'The two named tapas streets are Carrer de Blanquerna and Carrer de Sant Feliu; the second is a short walk from here. A menú del día runs €12-18 and is the cheap way to eat well at lunch.' },
        m2b5: { title: 'Palau Reial de l\'Almudaina', desc: 'The Moorish fort the Christian kings turned into a palace, right beside the cathedral and still an official royal residence. Arab bones, Gothic halls, Flemish tapestries, and a courtyard looking straight out to sea.', tip: '€8, or free for EU citizens on Wednesdays and Sundays from 15:00 to 19:00 with ID — which is exactly this slot. A British passport no longer qualifies; a Turkish or EU one does. Open Tuesday to Sunday 10:00-19:00 April to September, closed Mondays. Book: https://tickets.patrimonionacional.es/en/tickets/142760?city=PMI' },
        m2b6: { title: 'Banys Àrabs, then the Born at dusk', desc: 'The tenth-century Arab baths on Carrer de Can Serra are all that is left standing of Muslim Palma: one small domed room and a garden, fifteen minutes and no booking. Then the walk up Passeig del Born as the light goes, which is when the city comes out.', tip: '€2, open 09:30-20:00 April to November. Two vlogs both warn it is cash only, so carry coins.' },
        m2b7: { title: 'Dinner in Santa Catalina', desc: 'The old fishing quarter, now the food quarter: the 1905 market building at the middle of it and the good restaurants in the streets around. The market itself is a daytime thing — tomorrow — but the evening here is the reason people move to this neighbourhood.', tip: 'Bus 23 back to s\'Arenal, or the 25 from the Cathedral end. Both run late.' },

        m3b1: { title: 'Early bus to Plaça d\'Espanya', desc: 'Out on the 23 by quarter to nine. The railway station is on the square and the operator asks for thirty minutes before departure in high season — that is not padding, it is their own advice.' },
        m3b2: { title: 'The 1912 railway over the Tramuntana', desc: 'An hour in a wooden carriage from 1912, twenty-seven kilometres through orange terraces and thirteen tunnels, including the three-kilometre Túnel Major, and out into the Sóller valley. Seven departures a day; ours is the 10:10, the only one that stops at the Mirador des Pujol d\'en Banya for the view.', tip: 'Buy the combined train-and-tram return online at €32 — it is €40 at the window, and it is the only ticket they sell online at all. Every other ticket, one-ways included, is same-day box office only, which is why this day is built around the combined one. Sit on the left going north. Book: https://trendesoller.com/eng/train-ticket' },
        m3b3: { title: 'Tram down to the port', desc: 'Change in Sóller onto the open-sided tram — twenty minutes down the valley to the sea, past the back gardens of the town, half-hourly from half eleven.', tip: 'Included in the combined ticket. The last tram back up is 21:05 and the last train to Palma is 19:30, so the day has a hard edge — ours is the 18:00 train.' },
        m3b4: { title: 'Lunch on the bay before the boat', desc: 'An hour on the front at Port de Sóller before the boat goes. Grilled octopus and a view of the tram is the vlog recommendation.' },
        m3b5: { title: 'Barcos Azules to Sa Calobra', desc: 'An hour along a coast with no road: cliffs straight down into the water, and a landing at Sa Calobra where a short walk through a tunnel in the rock opens onto the mouth of the Torrent de Pareis, a gorge that comes out between two vertical walls of limestone. The 13:00 out, the 16:45 back.', tip: '€35 return, 10% off online, and the operator asks you to confirm the seat by phone even after booking. Four sailings a day in one direction in peak August — this is the sort of thing that fills. Weather can cancel it, so reconfirm the day before. Book: https://www.barcoscalobra.com/timetable-prices/?lang=en' },
        m3b6: { title: 'A swim back at the port', desc: 'Off the boat at quarter to six and into the bay for half an hour before the tram.', tip: 'This is the one beach on the trip that genuinely wants water shoes: Platja des Través by the tram terminus is coarse gravel, and Platja d\'en Repic has nicer sand but pebbles for the first few metres of the water. And do not swim by the harbour itself — a vlogger filmed it and the water there is oily. Loungers run about €19-27 for two with a parasol, cash on the sand.' },
        m3b7: { title: 'Tram, train, and back down the bay', desc: 'The tram at half six, the 18:00 train back over the mountains into Palma, then the 23 home.' },
        m3b8: { title: 'Late dinner at the base', desc: 'Back near nine, which is when Spain sits down anyway.' },

        m4b1: { title: 'Bus 25 to the Cathedral', desc: 'The 25 runs from s\'Arenal to Plaça de la Reina, at the cathedral end of the old town.' },
        m4b2: { title: 'La Seu, and up onto the terraces', desc: 'The cathedral is the thing everybody comes for and it earns it: a Gothic nave with the widest rose window in the world, Gaudí\'s reworking of the sanctuary, and Miquel Barceló\'s ceramic wall in the Chapel of St Peter. The terrace tour walks the roof itself, out among the buttresses with the bay underneath.', tip: '€11 for cathedral and museum, €25 with the terraces. Terraces go in 30-minute slots with capped numbers and they need booking in advance in August; no under-nines. Open Monday to Friday 10:00-17:15 and Saturday to 14:15 — and closed Sundays, which is why yesterday was the castle. Shoulders and knees covered. Much of the roof route is in full sun, so take water. Book: https://catedraldemallorca.entradasdemuseos.com/visit/catedral-de-mallorca-terrazas-museo-de-arte-sacro' },
        m4b3: { title: 'Mercat de l\'Olivar', desc: 'Palma\'s big covered market, open Monday to Friday 07:00 to 14:30. Fish, jamón, cheese, and a gastronomy section with counters to eat at.', tip: 'From a vlog: buy fish at one of the stalls and they will cook it for you for about €6. The eating section stays open until 16:00 after the stalls wind down.' },
        m4b4: { title: 'Santa Catalina market, and the tapas bar inside it', desc: 'The 1905 market we walked past last night, seen properly: Monday to Saturday, 07:00 to 17:00, with a tapas bar in the middle where you sit down with a beer and a plate of ham and cheese. This is where the ensaimada and the sobrassada come from.', tip: 'The Mallorcan things to actually eat: pa amb oli (bread with tomato and oil, €6-12), sobrassada, tumbet, arròs brut, and an ensaimada bought the same morning it was baked.' },
        m4b5: { title: 'Illetes — the best-value sand on the island', desc: 'The EMT 4 runs from Plaça d\'Espanya through the cathedral and Santa Catalina out to Ses Illetes, thirty minutes, and terminates there. Three small coves of white sand and very clear water, ten kilometres west of the city.', tip: 'Calvià charges €6.50 an element in 2026, so two loungers and a parasol are €19.50 — the cheapest equipped beach of the five we priced. But it is small, about 100 by 50 metres, and the free sand goes by ten, which is why this is a late-afternoon visit rather than a morning one. One warning: Ses Illetes was named in this summer\'s Mallorca jellyfish reports, so look at the map before you go — https://www.medusapp.net/mapa/ · If it is flagged, Cala Major is on the same bus, and Platja de Palma is at the hotel door.' },
        m4b6: { title: 'Tapas crawl, Blanquerna and Sant Feliu', desc: 'Back into town for the evening rather than eating at the base: Carrer de Blanquerna is pedestrian and full of bars locals actually use, and Carrer de Sant Feliu is the narrow restaurant lane off the Born. Three or four stops, a plate at each.', tip: 'If you would rather have it guided, Secret Food Tours runs a Palma food tour at €79.99 a head, Monday to Saturday at 10:30 from Plaça de l\'Olivar — five stops, drinks included, and the only one of the three tours we compared with a firm published price. Book: https://www.secretfoodtours.com/mallorca/food-tours-palma-de-mallorca/' },

        m5b1: { title: 'The 401 east to Porto Cristo', desc: 'Bus 23 to the Estació Intermodal, then the TIB 401 straight across the island to Porto Cristo — no change, seventy-six to eighty-four minutes, thirty-six departures a day.', tip: '€5.40 a head on a contactless card, €9 cash. Ignore any guide that sends you on the 412: that stopped being the Palma route in 2022 and half the internet has not noticed. The stop is "Mestral" on the bypass and the caves are a 1.4 km walk down through the harbour. Timetable: https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/401' },
        m5b2: { title: 'Lunch in Porto Cristo', desc: 'An hour in the harbour town before the cave slot — a working port with a narrow inlet and a beach at the head of it, and lunch on the water.' },
        m5b3: { title: 'Coves del Drach, and the concert on the lake', desc: 'A kilometre and a bit of walkway down to twenty-five metres below the surface, through chambers of stalactites, to Lake Martel — one of the largest underground lakes in the world. There a quartet of two violins, a cello and a harpsichord play for ten minutes from boats on the water, as they have done continuously since 1935, and then you cross the lake by boat yourself. About an hour, 17-21 °C.', tip: 'Book this one now, not later: querying the operator\'s own availability on 15 August showed the 10:00 and 11:00 slots already at or near zero for every day of our week — coach parties take them. Afternoons were wide open, which is why this is a 14:00. €18.50 online against €19.50 at the door, and the discount only exists on their own site. Arrive fifteen minutes early; a missed slot is not refunded. Book: https://www.cuevasdeldrach.com/en/venta-entradas.php' },
        m5b4: { title: 'The 401 back', desc: 'The same bus home. Evening departures thin out — after 21:05 it is 22:05 and then 23:05, so the afternoon slot leaves plenty of room.' },
        m5b5: { title: 'Dinner back at the base', desc: 'Late back, so dinner is on the front at s\'Arenal.' },

        m6b1: { title: 'The 203 up the west coast', desc: 'Bus 23 in, then the TIB 203 out of the Estació Intermodal — the road that climbs out of Palma into the Tramuntana and runs on through Valldemossa and Deià to Sóller. Thirty to thirty-five minutes to Valldemossa.', tip: 'Roughly two-hourly; weekday departures from Palma are 07:30, 08:40, 09:45, 11:00, 12:00, 13:15, 14:25, 15:30, 16:50, 18:00, 19:00, 20:15. You cannot ride the 203 between two stops inside Palma — use the EMT for that.' },
        m6b2: { title: 'The Cartoixa, and Chopin at half ten', desc: 'The Carthusian monastery where Chopin and George Sand spent the winter of 1838-39, which she then wrote a famously unkind book about. The monks\' cells, the old pharmacy with its jars intact, the cloister, and Chopin\'s piano.', tip: 'The good surprise: a fifteen-minute Chopin recital by Carlos Bonnín is included in the ticket, no separate booking — at 10:30, 11:30, 12:30, 13:15 and 14:15, in the Palau del Rei Sanç. The Palau is not a separate ticket either, whatever the old listings say; it is inside, and it is where the recital happens. €12.50, or €8.50 with a student card, €15.50 with the tower. Open Monday to Friday 10:00-17:00, Saturday to 16:00 — and closed Sundays. Book: https://cartoixadevalldemossa.com/tickets/' },
        m6b3: { title: 'Coca de patata at Ca\'n Molinas', desc: 'The village\'s own pastry, a light potato-flour bun dusted with sugar, from a bakery that has been making it since 1920. Eaten warm with a hot chocolate, which is the local order even in August.', tip: 'From two vlogs: Valldemossa is a cruise-excursion stop, so it is busiest in the middle of the day. Getting here for opening — as this day does — is the whole trick.' },
        m6b4: { title: 'On to Deià', desc: 'Twenty minutes further along the same road: a village of ochre stone stacked on a hillside between the mountains and the sea, where Robert Graves lived and is buried. His house is a museum, and the walk down through the village is the point of coming.', tip: 'Cala Deià, the cove below, has no bus — it is a walk down or a taxi, and it is seventy metres of boulders rather than sand, so water shoes and something to sit on. Watch for the jellyfish flag; the cove is exposed on a windy day.' },
        m6b5: { title: 'The 203 back into Palma', desc: 'Back down the coast road in the early evening, then the 23 home.' },
        m6b6: { title: 'The long last dinner', desc: 'The proper one, on the front: everything not eaten yet, and a walk along the water after. Bags packed tonight rather than tomorrow.' },

        m7b1: { title: 'Brunch, and the last swim', desc: 'The brunch runs to half past one, so there is no reason to be up early. Eat, swim, eat again, and let the room go at two — the desk holds the bags.', tip: 'This is the shape of the day if the Jet2 flight is an afternoon one. If it turns out to be a morning departure, this whole day collapses into the airport run and the last swim moves to last night after dinner — check the time when you book.' },
        m7b2: { title: 'Bus A2 to the airport', desc: 'The same direct bus as the first day, twenty to twenty-five minutes from s\'Arenal to the terminal, €5 each.' },
        m7b3: { title: 'Fly Palma → East Midlands', desc: 'Jet2 home, about two and a half hours, bags in the fare.', tip: 'Time assumed, not confirmed — see the note on the first day.' },
        m7b4: { title: 'Skylink and the train home', desc: 'The Skylink bus into Leicester and one stop on to South Wigston.', tip: 'The last Leicester → South Wigston train is 22:25. Later than that and it is a taxi for the last four miles, roughly £12-18 — the Skylink itself runs all night, so there is no scenario where you are stuck at the airport.' }
      },

      bookings: {
        k1: 'Flights, Sat 22 out and Fri 28 back: Jet2 East Midlands ↔ Palma, £135 a head return with a 10 kg cabin bag in the fare — £270 for the two of us. Ryanair looks cheaper at £125 but its bags cost £133 for two, so it comes out £113 worse. Seven days out in peak August this is the line that moves fastest: book it first. Book: https://www.jet2.com/en/cheap-flights/east-midlands/majorca',
        k2: 'Coves del Drach, Wed 26 · 14:00 — €18.50 a head online against €19.50 at the door. Checked against the operator\'s live availability on 15 Aug: the 10:00 and 11:00 slots are already gone on most days of our week and the afternoons are open. Do this one today. Book: https://www.cuevasdeldrach.com/en/venta-entradas.php',
        k3: 'Hotel, s\'Arenal Sat 22 → Fri 28: tent Arenal, £1,141 + £23 for the six nights on the flexible rate, free cancellation until 19 August and no prepayment — so it costs nothing to hold while the flights get sorted. Take it on Booking.com rather than Airbnb: same price, but only Booking sells this rate and only Booking offers a double bed rather than two singles. The sea-view room is £103 more and there were two left. Book: https://www.booking.com/hotel/es/tal.en-gb.html?checkin=2026-08-22&checkout=2026-08-28&group_adults=2&no_rooms=1&group_children=0&selected_currency=GBP',
        k4: 'Cathedral terraces, Tue 25 · 10:00 — €25 a head for cathedral, museum and roof. Timed 30-minute slots with capped numbers; in August they need booking ahead. €11 if you skip the terraces. Book: https://catedraldemallorca.entradasdemuseos.com/visit/catedral-de-mallorca-terrazas-museo-de-arte-sacro',
        k5: 'Sóller combined train + tram ticket, Mon 24 — €32 a head online against €40 at the window. This is the only ticket the railway sells online at all: every other fare, one-ways included, is same-day box office only, which is why the day is built around this one. Book: https://trendesoller.com/eng/train-ticket',
        k6: 'Barcos Azules to Sa Calobra, Mon 24 · 13:00 — €35 a head return, 10% off online, back at 16:45. The operator asks you to confirm the seat by phone even after booking, and four sailings a day in peak August is the sort of capacity that fills. Reconfirm the day before: weather cancels it. Book: https://www.barcoscalobra.com/timetable-prices/?lang=en',
        k7: 'Palma food tour, Tue 25 (optional) — Secret Food Tours, €79.99 a head, Mon-Sat 10:30 from Plaça de l\'Olivar, max 12, drinks included. The only Palma food tour of the three we compared with a firm published price; the Viator alternatives quoted anywhere between €87 and £180 for the same evening. Book: https://www.secretfoodtours.com/mallorca/food-tours-palma-de-mallorca/',
        k8: 'Nothing to book for Bellver, the Almudaina, Es Baluard, the Banys Àrabs or the Cartoixa — all pay-at-the-door. But the days matter: the cathedral and the Cartoixa close on Sundays, and Bellver, Es Baluard and the Almudaina close on Mondays. Bellver is free on Sundays and the Almudaina is free to EU citizens on Wednesday and Sunday afternoons, both of which this plan uses.',
        k9: 'Nothing to book on the buses — but get a contactless bank card ready rather than cash. It is about 40% cheaper on both TIB and EMT, and cheaper again per head when two people tap the same card. On TIB you must tap on and tap off; missing the exit tap is a €0.30 penalty each. The "free public transport in 2026" headline is real but residency-only, so it does not apply to us.',
        k10: 'Passports, GHIC cards and travel insurance — and a photo of each in the wallet below. Pack water shoes for Port de Sóller and Cala Deià, earplugs (the repeated complaint about this hotel is corridor doors slamming, not the strip outside), a light layer for the cathedral (shoulders and knees, both of you), and cash for the beach loungers and the ecotasa, which is about €34 for the two of us over six nights and is paid at the property.'
      },

      map: {
        htmlTitle: 'Mallorca — the route',
        panelTitle: 'The route',
        panelDates: '22-28 August',
        viewAll: 'Full route',
        legendLabel: 'Legend ▾',
        flight: 'Flights, ~2h30',
        train: 'Buses and the Sóller railway',
        catSights: 'Sights & museums',
        catSea: 'Boats & swims',
        catFood: 'Food & drink',
        catFiesta: 'Evenings out',
        catStay: 'Where we sleep',
        wigstonLong: 'South Wigston — home',
        pmaLong: 'Palma · day trips out of here',
        arnLong: 's\'Arenal · all six nights',
        solLong: 'Port de Sóller · the railway day',
        pcrLong: 'Porto Cristo · the caves',
        lock: 'Tap to explore the map',
        openInMaps: 'Open in Google Maps',
        spots: {
          staytent: 'tent Arenal — all six nights',
          platjapalma: 'Platja de Palma — the beach at the door',
          bellver: 'Castell de Bellver (free Sunday)',
          baluard: 'Es Baluard museum',
          almudaina: 'Palau Reial de l\'Almudaina',
          banys: 'Banys Àrabs',
          santacatalina: 'Santa Catalina — market and dinner',
          soller: 'Sóller — the 1912 railway',
          portsoller: 'Port de Sóller — swim (water shoes)',
          calobra: 'Sa Calobra + Torrent de Pareis',
          seu: 'La Seu — cathedral terraces',
          olivar: 'Mercat de l\'Olivar',
          illetes: 'Ses Illetes — best-value sand',
          tapas: 'Tapas on Blanquerna',
          drach: 'Coves del Drach — lake concert',
          portocristo: 'Porto Cristo harbour lunch',
          cartoixa: 'Cartoixa de Valldemossa — Chopin',
          deia: 'Deià'
        }
      },

      stays: {
        htmlTitle: 'Mallorca · where we sleep',
        metaDesc: 'One base for six nights, searched live on Booking.com and Airbnb: what the £60-150 band actually buys in peak August, and the one we picked.',
        intro: 'Searched live on Booking.com on 15 August for 22-28 August, one room, two adults, guest score 8+ — and on Airbnb in parallel, which is new for this trip and worth the trouble. Two findings shaped everything. Palma has no Airbnb market left: the city banned holiday lets in apartment buildings and the whole centre returns nine entire-place listings, so the survivors are licensed commercial establishments at a premium. And the £60-150 band does not exist here in late August — anything central and well-reviewed starts around £170 a night. Names open the property with our dates filled.',
        updated: 'Rates checked live 15 Aug 2026 for 22-28 August — they move; the itinerary and its wallet keep the booked truth.',
        arnTitle: 's\'Arenal · all six nights',
        arnSub: 'Sat 22 → Fri 28 Aug. One base, no bags to move mid-week. It has to work for a beach at the door, a bus into Palma four times, and an airport that is twenty minutes away on a direct bus.',
        whyTent: [
          'Unlimited brunch until 13:30 every day, which on a beach week replaces lunch as well as breakfast — about £155 of food for the two of us over six days, and the single most-praised thing in 940 guest reviews.',
          'Three hundred metres from four and a half kilometres of sand, two pools, and the airport twenty minutes away on the direct A2 bus. At £1,141 plus £23 it undercuts every two-base combination we priced.',
          'The flexible rate costs £114 more and cancels free until 19 August with nothing paid up front — booking seven days out in peak August, that is cheap insurance on a hotel whose one weak score is its location.'
        ],
        beds: {},
        notes: {
          hostalpdp: 'The cheapest credible bed of the search at £1,096: 150 m from the sand, a 25 m² room against the pick\'s 20, and the best guest scores in the whole s\'Arenal set — location 9.5, staff 9.6, value 9.2. No pool, no gym, only 169 reviews, non-refundable, and two rooms left when we looked.',
          pabisa: 'The strongest pure-value play: £1,195 with breakfast, or £1,336 half board — which buys seven dinners for £141 on top. Sea-view balcony and a better location score than the pick. Non-refundable, which is the trade.',
          carmen: 'Adults-only, 250 m from the sand, and the only free-cancellation room near the money at £1,261 — but that is room-only, and breakfast adds about £168.',
          delfin: 'The counter-plan if the north of the island is the point of the trip: Port d\'Alcúdia, free cancellation, and Formentor and Playa de Muro on the doorstep. The cost is the reverse of ours — Palma and Sóller become two-hour round trips.',
          jsplaza: 'The honest premium at £1,571: soundproofed rooms, a rooftop pool, unlimited spa, free cancellation, and the whole of the old town out of the front door. About £400 more, and the beach becomes the bus ride instead.',
          apuntadores: 'The old-town value option in La Llotja, 250 m from the middle at £1,135 — everything walkable, but no pool and no beach, and non-refundable at this rate.'
        },
        totalKicker: 'Six nights, one bed',
        totalLine: '£1,141 plus £23 tax for the six nights — about £194 a night, brunch in. The ecotasa is about €34 for the two of us and is paid at the property.',
        totalNote: 'One base beat every split we priced. The two-base plan we started from — four nights in Palma and three in Port d\'Alcúdia — came to £1,326 for seven nights with no breakfast and a mid-week move, and Port de Sóller turned out to have almost no stock at all: nine hotels on Booking and three listings on Airbnb for our dates.',
        method: 'How this list was made: Booking.com searched live for 22-28 Aug 2026, one room, two adults, guest score 8+, GBP throughout, across Palma centre, Playa de Palma and Port d\'Alcúdia — plus the same three areas on Airbnb with no room-type filter, because filtering to entire homes hides the hotel rooms Airbnb also sells, which is how this very hotel was missed on the first pass. Prices on the two platforms match to within a pound on the pick, but only Booking sells the free-cancellation rate and only Booking offers a double bed here.'
      }
    },

    // ————————————————————————————————————————————————————————— Türkçe —
    tr: {
      htmlTitle: 'Mallorca · Çelik planı',
      metaDesc: 'Tek üsten yedi gün: Palma, Sóller treni, Sa Calobra ve kapının önünde bir kumsal. 22-28 Ağustos.',
      dows: ['Cmt', 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum'],
      pill: '{dow} {dom}',

      static: {
        brand: 'Mallorca · Çelik planı',
        navDates: '22-28 Ağustos 2026',
        tagDays: '7 gün',
        tagSiblings: '2 kardeş',
        tagSea: 'Deniz 27 °C',
        h1: 'South Wigston → Palma → s\'Arenal',
        heroText: 'Tek ada, tek yatak, hafta ortasında taşınacak bavul yok. Üs, Playa de Palma\'da bir sahil oteli; brunch her sabah 13:30\'a kadar sürüyor, gerisi Plaça d\'Espanya\'dan kalkan bir otobüs ya da tren: pazar günü Palma\'nın eski şehri, kalenin bedava olduğu gün; pazartesi 1912 model ahşap trenle Tramuntana\'nın üstünden geçip Sa Calobra\'ya tekne; salı katedral terasları ve Illetes; çarşamba mağaralar ve yerin yirmi beş metre altındaki konser; perşembe bir Kartuziyen manastırında Chopin. Yüzme günde iki kez oluyor, çünkü kum kapıdan üç yüz metre. Tek üssün bedeli adanın kuzeyi: Formentor sığmıyor, ve bunu gizlemek yerine yazdık.',
        heroPlaceholder: 'İkinizin fotoğrafını buraya bırak',
        homeKicker: 'Ev üssü',
        homeNote: 'Çaydanlık merkezi, 28\'inde dönüş',
        flightLabel: '~2s30 uçuş',
        bcnKicker: '1-6. geceler',
        bcnNote: 'Tek üs, 13:30\'a kadar brunch, kuma 300 m',
        trainLabel: 'Otobüsler ve Sóller treni',
        vlcKicker: 'Günübirlikler',
        vlcNote: 'Sóller, Sa Calobra, mağaralar, Valldemossa',
        city1: 'Palma · s\'Arenal',
        city1Href: 'https://www.google.com/maps/search/?api=1&query=Palma%20de%20Mallorca',
        city2: 'Sóller · Valldemossa',
        city2Href: 'https://www.google.com/maps/search/?api=1&query=Port%20de%20S%C3%B3ller',
        mapIntro: 'Her durak haritada — kesik çizgiler gidiş ve dönüş uçuşları, düz çizgiler üsten çıkan kollar: dağların üstünden geçen tren, Valldemossa\'ya giden kıyı yolu, doğuya mağaralara uzanan uzun hat. İğnenin üstüne gel, adını görürsün; dokun, saatini.',
        izemDesc: 'Mimar. Katedral terasları ve Kartuziyen manastırı, günleri onun için kurulan iki durak.',
        ahmetDesc: 'Öğrenci. Öğrenci kartını yanına al: Cartoixa kartla €12,50 değil €8,50.',
        vlogsKicker: 'Vloglardan öğrendiklerimiz',
        vlogsText: '20 Mallorca vlog\'u ve 22 makaleden damıtıldı: otobüste nakit yerine temassız banka kartı okut — %40 ucuz, üstelik iki kişi aynı kartı kullanabiliyor; "2026\'da toplu taşıma bedava" haberi yalnızca ikamet kaydı olanlar için. İnternetteki otobüs numaralarının yarısı ölü: 320, 330, 340 ve Es Trenc servisi artık yok, Porto Cristo\'ya 401 gidiyor, 412 değil. Katedral ve Cartoixa pazar günleri kapalı; Bellver, Es Baluard ve Almudaina pazartesi kapalı. Deniz ayakkabısı isteyen tek plaj Port de Sóller, ve orada limanın dibinde yüzme — bir vlogger suyu çekmiş, mazot gibi. Bu yaz Ses Illetes\'te denizanası bildirildi, sabahı haritadan bak. Deniz 27 °C. Deniz ayakkabısı, koridor kapıları için kulak tıkacı ve şezlong parası için nakit al.'
      },

      cats: {
        travel: 'Yol', sights: 'Gezi', museum: 'Müze', boat: 'Tekne',
        swim: 'Yüzme', food: 'Yeme içme', event: 'Akşam programı', stay: 'Konaklama'
      },
      filters: {
        all: 'Hepsi', boat: 'Tekne turları', swim: 'Yüzme', sights: 'Gezilecekler',
        museum: 'Müzeler', food: 'Yemek', event: 'Akşam programları'
      },

      days: [
        { city: 's\'Arenal', title: 'South Wigston → Palma', sub: '22 Ağustos Cumartesi · tren, uçak ve akşam yemeğinden önce denize' },
        { city: 'Palma', title: 'Palma\'da bedava gün', sub: '23 Ağustos Pazar · Bellver bedava, saray üçten sonra bedava, katedral bugün kapalı' },
        { city: 'Sóller', title: 'Ahşap tren ve Sa Calobra', sub: '24 Ağustos Pazartesi · onu on geçe 1912 treni, birde kanyonun dibinde tekne' },
        { city: 'Palma', title: 'Katedral terasları, pazarlar, Illetes', sub: '25 Ağustos Salı · onda çatı, iki pazar, sonra adanın en hesaplı şezlongları' },
        { city: 'Porto Cristo', title: 'Mağaralar ve göl konseri', sub: '26 Ağustos Çarşamba · 401\'le doğuya, yerin 25 m altında teknede yaylılar' },
        { city: 'Valldemossa', title: 'Chopin, ardından Deià', sub: '27 Ağustos Perşembe · manastırda piyano, sonrasında kıyı yolu' },
        { city: 'Ev', title: 'Adéu, Mallorca', sub: '28 Ağustos Cuma · brunch, son yüzme, geldiğimiz yoldan eve' }
      ],

      acts: {
        m1b1: { title: 'Trenle East Midlands\'e', desc: 'South Wigston\'dan bir durak Leicester, oradan Skylink otobüsüyle East Midlands havalimanı — toplam bir saat beş dakika, ikimize gidiş-dönüş yaklaşık £47,60.', tip: 'Skylink 24 saat çalışıyor, gece boyunca saatte bir. Bu havalimanının kazanmasının asıl sebebi bu: fiyatladığımız yedi havalimanı içinde gece yarısı inişinde seni mahsur bırakmayan tek yer. Pürüz öteki uçta — Leicester\'dan South Wigston\'a son tren 22:25, geç kalırsan son dört mil için taksi.' },
        m1b2: { title: 'East Midlands → Palma uçuşu', desc: 'Jet2 ile Palma\'ya, yaklaşık iki buçuk saat, kişi başı £135 gidiş-dönüş. Ücrete 10 kg kabin bagajı dahil ve Ryanair\'i yenmesinin sebebi tam olarak bu: Ryanair kişi başı £125 görünüyor ama bagajı ikimize £133 tutuyor, yani toplamda £113 pahalıya geliyor.', tip: '15 Ağustos\'ta canlı bakıldı. Teyit edemediğimiz tek şey uçuş saati — Jet2\'nin sitesi otomatik okumaya kapalı, o yüzden bu günün ve son günün saatleri varsayım. Rezervasyonda gör ve gerekiyorsa günü kaydır. Rezervasyon: https://www.jet2.com/en/cheap-flights/east-midlands/majorca' },
        m1b3: { title: 'A2 otobüsüyle doğrudan kapıya', desc: 'EMT\'nin A2 hattı havalimanından s\'Arenal\'e Palma\'ya hiç uğramadan gidiyor — yirmi, yirmi beş dakika, nakit kişi başı €5, temassız kartla daha az. Otel terminalden sekiz kilometre.', tip: 'Taksi €20-25 ve sabit havalimanı ücreti yok, metreli: €2,50 açılış, kilometre €1,20, €4,65 havalimanı ek ücreti, €16,95 asgari.' },
        m1s1: { title: 'Yerleşme: tent Arenal', desc: 'Altı gecenin tamamı burada: Carrer Maria Antònia Salvà\'da 2025\'te komple yenilenmiş bir otel, Playa de Palma\'ya üç yüz metre, iki havuz, spor salonu, 24 saat resepsiyon ve her sabah 13:30\'a kadar sınırsız brunch. Esnek tarifede altı gece £1.141 + £23 — 19 Ağustos\'a kadar ücretsiz iptal ve peşin ödeme yok.', tip: 'İlan hem Booking\'de hem Airbnb\'de ama Booking\'den al: fiyatlar bir sterlin farkla aynı, fakat ücretsiz iptalli tarifeyi yalnızca Booking satıyor ve odayı "Double veya Twin" diye yalnızca Booking veriyor — Airbnb\'de bu otelin bütün odaları iki tek yatak. Deniz manzaralı oda £103 fazla ve iki tane kalmıştı. Rezervasyon: https://www.booking.com/hotel/es/tal.en-gb.html' },
        m1b4: { title: 'İlk yüzme, Playa de Palma', desc: 'Doğrudan kuma. Plaj dört buçuk kilometre, yani küçük koyların aksine yer kapma telaşı yok — ağustosta bile kalabalık dağılıyor.', tip: 'Palma\'nın 2026 belediye tarifesi: şezlong €10, şemsiye €10, paket hâlinde satılıyor — bir yatak + şemsiye + kasa €20, iki yataklı paket €30. Ya da bedava kum, ki her yerde var. s\'Arenal ucu gürültülü olan; sessizlik için Can Pastilla yönüne yürü.' },
        m1b5: { title: 'Sahilde ilk tabak', desc: 'Akşam yemeği sahilde. İspanya dokuzda yemeğe oturuyor, acele yok.', tip: 'Otelin kendi misafir yorumlarından, dürüstçe: burası Mallorca\'nın en güzel köşesi değil ve çevredeki barlar baştan sona Alman turizmi. Ama aynı zamanda ucuz, denize üç yüz metre, ve bir sokak geride yemek hızla düzeliyor.' },

        m2b1: { title: '23 numarayla Palma\'ya', desc: 'EMT\'nin 23\'ü s\'Arenal\'den Plaça d\'Espanya\'ya otuz kırk dakikada gidiyor. Tek üssün karşılığında ödediğin komüt bu, hafta boyunca dört kez.', tip: 'Nakit yerine temassız banka kartı okut — EMT\'de yaklaşık %40 ucuz, iki kişi aynı kartı okuttuğunda kişi başı daha da düşüyor. Nakit tek biniş €2, şoför en fazla €10 banknot bozuyor.' },
        m2b2: { title: 'Castell de Bellver — bugün bedava', desc: 'Körfezin üstünde çam ormanı içinde dairesel bir Gotik kale — İspanya\'da bu planda tek örnek — ve ayaklarının altında bütün Palma.', tip: 'Pazar günleri ücretsiz, diğer günler €4. Nisan-Eylül arası Salı-Cmt 10:00-19:00, Pazar 10:00-15:00 — yani bu bir sabah işi, öğleden sonra değil. Pazartesi kapalı. Bir çekince: kalenin kendi sitesi araştırma boyunca kapalıydı, bu saatler rehber kaynaklı — çıkmadan bir bak.' },
        m2b3: { title: 'Es Baluard, eski sur burcunda', desc: 'Rönesans burcunun içinde çağdaş sanat, surun üstünde marinaya bakan bir teras. Pazar saatleri 10:00-15:00.', tip: '€8 — birçok rehber hâlâ €6 yazıyor, güncel değil. Cuma günleri €0,10\'dan başlayan "ne verirsen", ama bizim cumamız dönüş günü, o yüzden bugün €8. Pazartesi kapalı.' },
        m2b4: { title: 'La Llotja çevresinde öğle yemeği', desc: 'Eski tüccar borsası ve arkasındaki sokaklar — Palma pazarda değilse burada yiyor. İki büyük pazar da pazar günü kapalı olduğu için bugün öğle yemeği tezgâh değil masa.', tip: 'Adı geçen iki tapas sokağı Carrer de Blanquerna ve Carrer de Sant Feliu; ikincisi buradan birkaç adım. Menú del día €12-18 ve öğlen iyi yemenin ucuz yolu.' },
        m2b5: { title: 'Palau Reial de l\'Almudaina', desc: 'Hıristiyan kralların saraya çevirdiği Mağrip kalesi, katedralin hemen yanında ve hâlâ resmî kraliyet ikametgâhı. Arap iskeleti, Gotik salonlar, Flaman duvar halıları ve doğrudan denize bakan bir avlu.', tip: '€8, ya da **AB vatandaşlarına** Çarşamba ve Pazar 15:00-19:00 arası kimlikle ücretsiz — tam da bu saat. İngiliz pasaportu artık bu kapsamda değil; Türk ya da AB pasaportu geçerli. Nisan-Eylül Salı-Pazar 10:00-19:00, pazartesi kapalı. Bilet: https://tickets.patrimonionacional.es/en/tickets/142760?city=PMI' },
        m2b6: { title: 'Banys Àrabs, sonra alacakaranlıkta Born', desc: 'Carrer de Can Serra\'daki onuncu yüzyıl Arap hamamı, Müslüman Palma\'dan ayakta kalan tek yapı: tek bir kubbeli oda ve bir bahçe, on beş dakika, rezervasyon yok. Ardından ışık çekilirken Passeig del Born yürüyüşü — şehrin sokağa çıktığı saat.', tip: '€2, Nisan-Kasım 09:30-20:00. İki ayrı vlog "sadece nakit" diye uyarıyor, bozuk para bulundur.' },
        m2b7: { title: 'Santa Catalina\'da akşam yemeği', desc: 'Eski balıkçı mahallesi, şimdi yemek mahallesi: ortasında 1905 pazar binası, çevresindeki sokaklarda iyi restoranlar. Pazarın kendisi gündüz işi — o yarın — ama insanların bu mahalleye taşınma sebebi buranın akşamı.', tip: '23 numarayla s\'Arenal\'e dönüş, ya da katedral ucundan 25. İkisi de geç saate kadar çalışıyor.' },

        m3b1: { title: 'Erken otobüsle Plaça d\'Espanya\'ya', desc: 'Dokuza çeyrek kala 23\'le yola. Tren istasyonu meydanda ve operatör yüksek sezonda kalkıştan otuz dakika önce orada olmanızı istiyor — bu bizim eklediğimiz pay değil, kendi uyarıları.' },
        m3b2: { title: '1912 treniyle Tramuntana\'nın üstünden', desc: '1912\'den kalma ahşap vagonda bir saat: yirmi yedi kilometre, portakal terasları, on üç tünel — üç kilometrelik Túnel Major dahil — ve Sóller vadisine iniş. Günde yedi sefer var; bizimki 10:10, manzara için Mirador des Pujol d\'en Banya\'da duran tek sefer.', tip: 'Kombine tren+tramvay gidiş-dönüşü internetten €32\'ye al — gişede €40, ve zaten internetten sattıkları tek bilet bu. Tek yön dahil diğer bütün biletler yalnızca yolculuk günü gişeden alınıyor; günün bu bilet etrafında kurulmasının sebebi bu. Kuzeye giderken sol tarafa otur. Bilet: https://trendesoller.com/eng/train-ticket' },
        m3b3: { title: 'Tramvayla limana', desc: 'Sóller\'de açık yanlı tramvaya aktarma — yirmi dakika, kasabanın arka bahçelerinin arasından denize, 11:30\'dan sonra yarım saatte bir.', tip: 'Kombine bilete dahil. Yukarı son tramvay 21:05, Palma\'ya son tren 19:30 — yani günün sert bir sınırı var; bizimki 18:00 treni.' },
        m3b4: { title: 'Tekneden önce körfezde öğle yemeği', desc: 'Tekne kalkmadan önce Port de Sóller sahilinde bir saat. Vlog önerisi ızgara ahtapot ve tramvay manzarası.' },
        m3b5: { title: 'Barcos Azules ile Sa Calobra', desc: 'Yolu olmayan bir kıyı boyunca bir saat: kayalıklar dosdoğru suya iniyor, ve Sa Calobra\'da karaya çıkıp kayanın içine oyulmuş kısa bir tünelden geçince Torrent de Pareis\'in ağzı açılıyor — iki dik kireçtaşı duvarın arasından çıkan bir kanyon. 13:00 gidiş, 16:45 dönüş.', tip: '€35 gidiş-dönüş, internetten %10 indirim, ve operatör rezervasyondan sonra bile koltuğu telefonla teyit etmenizi istiyor. Zirve ağustosta günde dört sefer — bu tür şeyler doluyor. Hava iptal ettirebiliyor, bir gün önceden teyit et. Rezervasyon: https://www.barcoscalobra.com/timetable-prices/?lang=en' },
        m3b6: { title: 'Limana dönünce bir yüzme', desc: 'Altıya çeyrek kala tekneden inip tramvaya kadar yarım saat körfeze.', tip: 'Gezinin gerçekten deniz ayakkabısı isteyen tek plajı burası: tramvay durağının yanındaki Platja des Través kaba çakıl, Platja d\'en Repic\'in kumu daha iyi ama suya girişin ilk birkaç metresi taşlı. Ve limanın dibinde yüzme — bir vlogger orayı çekmiş, su mazot gibi. Şezlong ikili şemsiyeyle €19-27, kumda nakit.' },
        m3b7: { title: 'Tramvay, tren ve körfeze dönüş', desc: 'Altı buçukta tramvay, 18:00 treniyle dağların üstünden Palma\'ya, oradan 23 numarayla eve.' },
        m3b8: { title: 'Üste geç akşam yemeği', desc: 'Dokuza doğru dönüş, ki İspanya zaten o saatte sofraya oturuyor.' },

        m4b1: { title: '25 numarayla katedrale', desc: '25 numara s\'Arenal\'den eski şehrin katedral ucundaki Plaça de la Reina\'ya gidiyor.' },
        m4b2: { title: 'La Seu ve teraslara çıkış', desc: 'Herkesin geldiği şey, ve hak ediyor: dünyanın en geniş gül penceresine sahip Gotik bir nef, Gaudí\'nin yeniden düzenlediği mihrap alanı ve Miquel Barceló\'nun Aziz Petrus Şapeli\'ndeki seramik duvarı. Teras turu çatının üstünde yürüyor — payandaların arasında, altında körfez.', tip: 'Katedral + müze €11, teraslar dahil €25. Teraslar 30 dakikalık kontenjanlı seanslarla ve ağustosta önceden rezervasyon şart; 9 yaş altı alınmıyor. Pzt-Cum 10:00-17:15, Cmt 14:15\'e kadar — ve **pazar kapalı**, dün kaleye gitmemizin sebebi buydu. Omuz ve diz kapalı. Çatı yolunun çoğu güneşte, su al. Bilet: https://catedraldemallorca.entradasdemuseos.com/visit/catedral-de-mallorca-terrazas-museo-de-arte-sacro' },
        m4b3: { title: 'Mercat de l\'Olivar', desc: 'Palma\'nın büyük kapalı pazarı, Pzt-Cum 07:00-14:30. Balık, jamón, peynir ve oturup yenen bir gastronomi bölümü.', tip: 'Bir vlogdan: tezgâhtan aldığın balığı yaklaşık €6 karşılığında pişiriyorlar. Tezgâhlar kapandıktan sonra yeme bölümü 16:00\'ya kadar açık.' },
        m4b4: { title: 'Santa Catalina pazarı ve içindeki tapas barı', desc: 'Dün akşam önünden geçtiğimiz 1905 pazarı, bu sefer düzgünce: Pzt-Cmt 07:00-17:00, ortasında oturup bira ve jambon-peynir tabağı söylediğin bir tapas barı. Ensaimada ve sobrassada buradan çıkıyor.', tip: 'Gerçekten yenmesi gereken Mallorca şeyleri: pa amb oli (domates ve zeytinyağlı ekmek, €6-12), sobrassada, tumbet, arròs brut, ve pişirildiği sabah alınmış bir ensaimada.' },
        m4b5: { title: 'Illetes — adanın en hesaplı kumu', desc: 'EMT 4 hattı Plaça d\'Espanya\'dan katedral ve Santa Catalina üzerinden Ses Illetes\'e gidiyor, otuz dakika, son durak orası. Şehrin on kilometre batısında üç küçük beyaz kumlu koy ve çok berrak su.', tip: 'Calvià 2026\'da parça başı €6,50 alıyor, yani iki şezlong + şemsiye €19,50 — fiyatladığımız beş plajın en hesaplısı. Ama küçük, aşağı yukarı 100 × 50 metre, ve bedava kum onda bitiyor; bu yüzden sabah değil geç öğleden sonra gidiyoruz. Bir uyarı: Ses Illetes bu yazki Mallorca denizanası bildirimlerinde adı geçen plajlardan — çıkmadan haritaya bak: https://www.medusapp.net/mapa/ · Bayrak varsa Cala Major aynı otobüste, Playa de Palma ise zaten otelin kapısında.' },
        m4b6: { title: 'Tapas turu: Blanquerna ve Sant Feliu', desc: 'Akşamı üste değil şehirde geçiriyoruz: Carrer de Blanquerna yayalaştırılmış ve yerlilerin gerçekten gittiği barlarla dolu, Carrer de Sant Feliu ise Born\'dan çıkan dar restoran sokağı. Üç dört durak, her birinde bir tabak.', tip: 'Rehberli olsun istersen: Secret Food Tours\'un Palma yemek turu kişi başı €79,99, Pzt-Cmt 10:30, Plaça de l\'Olivar\'dan kalkıyor, en fazla 12 kişi, içecekler dahil. Karşılaştırdığımız üç turdan yayımlanmış net fiyatı olan tek tur; Viator\'daki muadili aynı akşam için €87 ile £180 arasında değişen rakamlar veriyor. Rezervasyon: https://www.secretfoodtours.com/mallorca/food-tours-palma-de-mallorca/' },

        m5b1: { title: '401\'le doğuya, Porto Cristo\'ya', desc: '23 numarayla Estació Intermodal\'e, oradan TIB 401 ile aktarmasız olarak adanın öbür ucuna — yetmiş altı ile seksen dört dakika, günde otuz altı sefer.', tip: 'Temassız kartla kişi başı €5,40, nakit €9. Seni 412\'ye yönlendiren rehberleri boş ver: o hat 2022\'de Palma güzergâhı olmaktan çıktı ve internetin yarısı fark etmedi. Durak baypastaki "Mestral", mağaralar limandan geçen 1,4 km\'lik bir yürüyüş. Saatler: https://www.tib.org/es/lineas-y-horarios/autobus/-/linia/401' },
        m5b2: { title: 'Porto Cristo\'da öğle yemeği', desc: 'Mağara seansından önce liman kasabasında bir saat — dar bir koya kurulmuş çalışan bir liman, dibinde bir plaj, ve suyun kenarında öğle yemeği.' },
        m5b3: { title: 'Coves del Drach ve göldeki konser', desc: 'Bir kilometreden uzun bir yürüme yoluyla yüzeyin yirmi beş metre altına, sarkıt salonlarının içinden Martel Gölü\'ne — dünyanın en büyük yeraltı göllerinden biri. Orada iki keman, bir çello ve bir klavsenden oluşan dörtlü, teknelerin üstünde on dakika çalıyor; 1935\'ten beri kesintisiz. Ardından gölü kendin tekneyle geçiyorsun. Yaklaşık bir saat, 17-21 °C.', tip: 'Bunu sonra değil şimdi al: operatörün kendi müsaitlik verisi 15 Ağustos\'ta sorgulandığında bizim haftamızın neredeyse her günü 10:00 ve 11:00 seansları sıfır ya da sıfıra yakındı — otobüs turları kapatıyor. Öğleden sonralar bomboştu, 14:00 olmasının sebebi bu. İnternetten €18,50, kapıda €19,50, ve indirim yalnızca kendi sitelerinde. On beş dakika önce orada ol; kaçırılan seans iade edilmiyor. Bilet: https://www.cuevasdeldrach.com/en/venta-entradas.php' },
        m5b4: { title: '401\'le dönüş', desc: 'Aynı otobüsle geri. Akşam seferleri seyrekleşiyor — 21:05\'ten sonra 22:05 ve 23:05 var, o yüzden öğleden sonra seansı bol pay bırakıyor.' },
        m5b5: { title: 'Üste dönüp akşam yemeği', desc: 'Geç dönüş, akşam yemeği s\'Arenal sahilinde.' },

        m6b1: { title: '203\'le batı kıyısına', desc: '23 numarayla şehre, sonra Estació Intermodal\'den TIB 203 — Palma\'dan çıkıp Tramuntana\'ya tırmanan ve Valldemossa ile Deià üzerinden Sóller\'e devam eden yol. Valldemossa otuz otuz beş dakika.', tip: 'Kabaca iki saatte bir; hafta içi Palma kalkışları 07:30, 08:40, 09:45, 11:00, 12:00, 13:15, 14:25, 15:30, 16:50, 18:00, 19:00, 20:15. 203 ile Palma içindeki iki durak arasında yolculuk yapılamıyor — onun için EMT.' },
        m6b2: { title: 'Cartoixa ve on buçukta Chopin', desc: 'Chopin ile George Sand\'in 1838-39 kışını geçirdiği Kartuziyen manastırı — Sand sonradan burası hakkında epeyce ters bir kitap yazdı. Keşiş hücreleri, kavanozları yerinde duran eski eczane, revak ve Chopin\'in piyanosu.', tip: 'Güzel sürpriz: Carlos Bonnín\'in on beş dakikalık Chopin dinletisi bilete dahil, ayrı rezervasyon yok — 10:30, 11:30, 12:30, 13:15 ve 14:15\'te, Palau del Rei Sanç\'ta. Palau da ayrı bilet değil; eski listelemeler ne derse desin içeride, ve dinleti orada oluyor. €12,50, öğrenci kartıyla €8,50, kuleyle €15,50. Pzt-Cum 10:00-17:00, Cmt 16:00\'ya kadar — ve **pazar kapalı**. Bilet: https://cartoixadevalldemossa.com/tickets/' },
        m6b3: { title: 'Ca\'n Molinas\'ta coca de patata', desc: 'Köyün kendi hamur işi: patates unundan yapılan, üstü pudra şekerli hafif bir çörek — 1920\'den beri aynı fırında. Sıcak sıcak ve sıcak çikolatayla yeniyor, ki ağustosta bile yerel sipariş bu.', tip: 'İki vlogdan: Valldemossa kruvaziyer turlarının durağı, o yüzden en kalabalık saat günün ortası. Açılışa yetişmek — bu günün yaptığı gibi — bütün numara.' },
        m6b4: { title: 'Deià\'ya devam', desc: 'Aynı yolda yirmi dakika daha: dağla deniz arasında bir yamaca istiflenmiş oker taş bir köy, Robert Graves\'in yaşadığı ve gömüldüğü yer. Evi müze, ama asıl mesele köyün içinden aşağı inen yürüyüş.', tip: 'Aşağıdaki koya, Cala Deià\'ya otobüs yok — yürüyerek ya da taksiyle inilir, ve kum değil yetmiş metrelik kaya bloğu, yani deniz ayakkabısı ve altına serecek bir şey. Denizanası bayrağına bak; koy rüzgârlı günde açık.' },
        m6b5: { title: '203\'le Palma\'ya dönüş', desc: 'Akşamüstü kıyı yolundan aşağı, sonra 23 numarayla eve.' },
        m6b6: { title: 'Uzun veda yemeği', desc: 'Asıl olanı, sahilde: henüz yenmemiş ne varsa, ardından su kenarında bir yürüyüş. Bavullar yarın değil bu akşam.' },

        m7b1: { title: 'Brunch ve son yüzme', desc: 'Brunch 13:30\'a kadar sürüyor, yani erken kalkmak için sebep yok. Ye, yüz, tekrar ye, odayı ikide bırak — bagajı resepsiyon tutuyor.', tip: 'Bu, Jet2 uçuşu öğleden sonraysa günün şekli. Sabah kalkışı çıkarsa bütün gün havalimanı yoluna dönüşür ve son yüzme dün akşam yemeğinden sonraya kayar — rezervasyonda saati gör.' },
        m7b2: { title: 'A2 otobüsüyle havalimanına', desc: 'İlk günkü aynı direkt otobüs, s\'Arenal\'den terminale yirmi yirmi beş dakika, kişi başı €5.' },
        m7b3: { title: 'Palma → East Midlands uçuşu', desc: 'Jet2 ile eve, yaklaşık iki buçuk saat, bagaj ücrete dahil.', tip: 'Saat varsayım, teyit edilmedi — ilk gündeki nota bak.' },
        m7b4: { title: 'Skylink ve trenle eve', desc: 'Skylink otobüsüyle Leicester\'a, oradan bir durak South Wigston.', tip: 'Leicester\'dan South Wigston\'a son tren 22:25. Ondan geç kalırsan son dört mil için taksi, yaklaşık £12-18 — Skylink\'in kendisi gece boyunca çalıştığı için havalimanında kalma senaryosu yok.' }
      },

      bookings: {
        k1: 'Uçuşlar, 22 Cmt gidiş ve 28 Cum dönüş: Jet2 East Midlands ↔ Palma, kişi başı £135 gidiş-dönüş ve 10 kg kabin bagajı ücrete dahil — ikimize £270. Ryanair kişi başı £125 ile ucuz görünüyor ama bagajı ikimize £133, yani toplamda £113 pahalı. Zirve ağustosta yedi gün kala en hızlı hareket eden kalem bu: önce bunu al. Rezervasyon: https://www.jet2.com/en/cheap-flights/east-midlands/majorca',
        k2: 'Coves del Drach, 26 Çar · 14:00 — internetten kişi başı €18,50, kapıda €19,50. 15 Ağustos\'ta operatörün canlı müsaitliğine bakıldı: bizim haftamızın çoğu gününde 10:00 ve 11:00 seansları çoktan gitmiş, öğleden sonralar açık. Bunu bugün hallet. Bilet: https://www.cuevasdeldrach.com/en/venta-entradas.php',
        k3: 'Otel, s\'Arenal 22 Cmt → 28 Cum: tent Arenal, esnek tarifede altı gece £1.141 + £23, 19 Ağustos\'a kadar ücretsiz iptal ve peşin ödeme yok — yani uçuşlar netleşene kadar tutmanın maliyeti sıfır. Airbnb\'den değil Booking\'den al: fiyat aynı, ama bu tarifeyi yalnızca Booking satıyor ve çift kişilik yatağı yalnızca Booking veriyor. Deniz manzaralı oda £103 fazla ve iki tane kalmıştı. Rezervasyon: https://www.booking.com/hotel/es/tal.en-gb.html?checkin=2026-08-22&checkout=2026-08-28&group_adults=2&no_rooms=1&group_children=0&selected_currency=GBP',
        k4: 'Katedral terasları, 25 Sal · 10:00 — katedral, müze ve çatı için kişi başı €25. 30 dakikalık kontenjanlı seanslar; ağustosta önceden almak şart. Terassız €11. Bilet: https://catedraldemallorca.entradasdemuseos.com/visit/catedral-de-mallorca-terrazas-museo-de-arte-sacro',
        k5: 'Sóller kombine tren + tramvay bileti, 24 Pzt — internetten kişi başı €32, gişede €40. Demiryolunun internetten sattığı tek bilet bu: tek yön dahil diğer bütün tarifeler yalnızca yolculuk günü gişeden alınıyor, günün bu bilet etrafında kurulmasının sebebi de o. Bilet: https://trendesoller.com/eng/train-ticket',
        k6: 'Barcos Azules ile Sa Calobra, 24 Pzt · 13:00 — kişi başı €35 gidiş-dönüş, internetten %10 indirim, dönüş 16:45. Operatör rezervasyondan sonra bile koltuğu telefonla teyit etmenizi istiyor, ve zirve ağustosta günde dört sefer dolan cinsten bir kapasite. Bir gün önceden teyit et: hava iptal ettirebiliyor. Rezervasyon: https://www.barcoscalobra.com/timetable-prices/?lang=en',
        k7: 'Palma yemek turu, 25 Sal (isteğe bağlı) — Secret Food Tours, kişi başı €79,99, Pzt-Cmt 10:30, Plaça de l\'Olivar\'dan, en fazla 12 kişi, içecekler dahil. Karşılaştırdığımız üç Palma yemek turundan yayımlanmış net fiyatı olan tek tur; Viator muadilleri aynı akşam için €87 ile £180 arası rakamlar veriyor. Rezervasyon: https://www.secretfoodtours.com/mallorca/food-tours-palma-de-mallorca/',
        k8: 'Bellver, Almudaina, Es Baluard, Banys Àrabs ve Cartoixa için rezervasyon gerekmiyor — hepsi kapıda ödemeli. Ama günler önemli: katedral ve Cartoixa **pazar** kapalı; Bellver, Es Baluard ve Almudaina **pazartesi** kapalı. Bellver pazar günleri ücretsiz, Almudaina ise Çarşamba ve Pazar öğleden sonraları AB vatandaşlarına ücretsiz — bu plan ikisini de kullanıyor.',
        k9: 'Otobüsler için rezervasyon yok — ama nakit yerine temassız banka kartı hazırla. TIB\'de de EMT\'de de yaklaşık %40 ucuz, ve iki kişi aynı kartı okuttuğunda kişi başı daha da düşüyor. TIB\'de **binerken ve inerken** okutmak zorunlu; iniş okutmasını unutmak kişi başı €0,30 ceza. "2026\'da toplu taşıma bedava" haberi gerçek ama yalnızca ikamet kaydı olanlar için, yani bize işlemiyor.',
        k10: 'Pasaportlar, GHIC kartları ve seyahat sigortası — ve her birinin fotoğrafı aşağıdaki cüzdana. Port de Sóller ve Cala Deià için deniz ayakkabısı, kulak tıkacı (bu otelde tekrar eden şikâyet dışarıdaki şerit değil, koridorda çarpan kapılar), katedral için ince bir üst (omuz ve diz, ikiniz de) ve nakit al — şezlonglar ve ecotasa için. Ecotasa ikimize altı gecede yaklaşık €34 ve tesiste ödeniyor.'
      },

      map: {
        htmlTitle: 'Mallorca — rota',
        panelTitle: 'Rota',
        panelDates: '22-28 Ağustos',
        viewAll: 'Tüm rota',
        legendLabel: 'Gösterge ▾',
        flight: 'Uçuşlar, ~2s30',
        train: 'Otobüsler ve Sóller treni',
        catSights: 'Gezi ve müzeler',
        catSea: 'Tekne ve yüzme',
        catFood: 'Yeme içme',
        catFiesta: 'Akşam programları',
        catStay: 'Konakladığımız yer',
        wigstonLong: 'South Wigston — ev',
        pmaLong: 'Palma · günübirlikler buradan',
        arnLong: 's\'Arenal · altı gecenin tamamı',
        solLong: 'Port de Sóller · tren günü',
        pcrLong: 'Porto Cristo · mağaralar',
        lock: 'Haritayı açmak için dokun',
        openInMaps: 'Google Haritalar\'da aç',
        spots: {
          staytent: 'tent Arenal — altı gecenin tamamı',
          platjapalma: 'Playa de Palma — kapının önündeki kumsal',
          bellver: 'Castell de Bellver (pazar bedava)',
          baluard: 'Es Baluard müzesi',
          almudaina: 'Palau Reial de l\'Almudaina',
          banys: 'Banys Àrabs',
          santacatalina: 'Santa Catalina — pazar ve akşam yemeği',
          soller: 'Sóller — 1912 treni',
          portsoller: 'Port de Sóller — yüzme (deniz ayakkabısı)',
          calobra: 'Sa Calobra + Torrent de Pareis',
          seu: 'La Seu — katedral terasları',
          olivar: 'Mercat de l\'Olivar',
          illetes: 'Ses Illetes — en hesaplı kum',
          tapas: 'Blanquerna\'da tapas',
          drach: 'Coves del Drach — göl konseri',
          portocristo: 'Porto Cristo limanında öğle yemeği',
          cartoixa: 'Cartoixa de Valldemossa — Chopin',
          deia: 'Deià'
        }
      },

      stays: {
        htmlTitle: 'Mallorca · nerede uyuyoruz',
        metaDesc: 'Altı gece tek üs, Booking.com ve Airbnb\'de canlı arandı: zirve ağustosta £60-150 bandının gerçekte ne aldığı ve seçtiğimiz.',
        intro: '15 Ağustos\'ta 22-28 Ağustos için Booking.com\'da canlı arandı — bir oda, iki yetişkin, 8+ misafir puanı — ve paralel olarak Airbnb\'de de, ki bu tur için yeni ve zahmetine değdi. İki bulgu her şeyi şekillendirdi. **Palma\'da Airbnb piyasası kalmamış:** şehir apartman binalarında turistik kiralamayı yasakladı ve merkezin tamamı dokuz tüm-ev ilanı veriyor; ayakta kalanlar ruhsatlı ticari işletmeler ve fiyatları da öyle. Ve **£60-150 bandı burada ağustos sonunda yok** — merkezi ve iyi puanlı ne varsa gecelik £170 civarından başlıyor. İsimler, tarihlerimiz dolu hâlde tesisi açar.',
        updated: 'Fiyatlar 22-28 Ağustos için 15 Ağu 2026\'da canlı alındı — değişirler; program ve cüzdan rezerve edilmiş gerçeği tutar.',
        arnTitle: 's\'Arenal · altı gecenin tamamı',
        arnSub: '22 Cmt → 28 Cum Ağustos. Tek üs, hafta ortasında taşınacak bavul yok. Kapının önünde kumsal, hafta boyunca dört kez Palma\'ya otobüs ve direkt otobüsle yirmi dakikadaki bir havalimanı için çalışması gerekiyor.',
        whyTent: [
          'Her gün 13:30\'a kadar sınırsız brunch — plaj haftasında kahvaltının yanı sıra öğle yemeğinin de yerine geçiyor; ikimize altı günde yaklaşık £155\'lik yemek, ve 940 misafir yorumunda en çok övülen tek şey.',
          'Dört buçuk kilometrelik kuma üç yüz metre, iki havuz, ve direkt A2 otobüsüyle yirmi dakikadaki havalimanı. £1.141 + £23 ile fiyatladığımız bütün iki-üslü kombinasyonların altından geçiyor.',
          'Esnek tarife £114 fazla ve 19 Ağustos\'a kadar peşin ödemesiz ücretsiz iptalli — zirve ağustosta yedi gün kala, tek zayıf notu konumu olan bir otel için ucuz bir sigorta.'
        ],
        beds: {},
        notes: {
          hostalpdp: 'Aramanın en ucuz ciddi yatağı, £1.096: kuma 150 m, seçilenin 20 m²\'sine karşı 25 m² oda, ve bütün s\'Arenal setinin en iyi misafir notları — konum 9,5, personel 9,6, değer 9,2. Havuz yok, spor salonu yok, yalnızca 169 yorum, iade yok, ve baktığımızda iki oda kalmıştı.',
          pabisa: 'En güçlü saf değer hamlesi: kahvaltı dahil £1.195, ya da yarım pansiyon £1.336 — ki bu, üstüne £141\'e yedi akşam yemeği demek. Deniz manzaralı balkon ve seçilenden daha iyi konum notu. Takası iade yok olması.',
          carmen: 'Yetişkinlere özel, kuma 250 m, ve paraya yakın tek ücretsiz iptalli oda £1.261 — ama bu sadece oda, kahvaltı yaklaşık £168 ekliyor.',
          delfin: 'Tatilin asıl derdi adanın kuzeyiyse karşı plan: Port d\'Alcúdia, ücretsiz iptalli, Formentor ve Playa de Muro kapının önünde. Bedeli bizimkinin tersi — Palma ve Sóller iki saatlik gidiş-dönüşlere dönüşüyor.',
          jsplaza: '£1.571 ile dürüst premium: sesi yalıtılmış odalar, çatı havuzu, sınırsız spa, ücretsiz iptal ve kapının önünde bütün eski şehir. Yaklaşık £400 fazla, ve bu sefer otobüs mesafesine düşen şey plaj.',
          apuntadores: 'La Llotja\'da eski şehir değer seçeneği, merkeze 250 m, £1.135 — her şey yürüme mesafesinde, ama havuz da yok plaj da, ve bu tarifede iade yok.'
        },
        totalKicker: 'Altı gece, tek yatak',
        totalLine: 'Altı gece £1.141 + £23 vergi — gecelik yaklaşık £194, brunch dahil. Ecotasa ikimize yaklaşık €34 ve tesiste ödeniyor.',
        totalNote: 'Tek üs, fiyatladığımız bütün bölünmeleri yendi. Başladığımız iki-üslü plan — Palma\'da dört gece, Port d\'Alcúdia\'da üç — yedi gece için £1.326 tutuyordu, kahvaltısız ve hafta ortasında bir taşınmayla. Port de Sóller\'de ise neredeyse hiç stok çıkmadı: bizim tarihlerde Booking\'de dokuz otel, Airbnb\'de üç ilan.',
        method: 'Bu liste nasıl çıktı: Booking.com\'da 22-28 Ağustos 2026 için canlı arama — bir oda, iki yetişkin, 8+ misafir puanı, baştan sona GBP — Palma merkez, Playa de Palma ve Port d\'Alcúdia\'da; artı aynı üç bölgede **oda tipi filtresi olmadan** Airbnb araması, çünkü "tüm ev" filtresi Airbnb\'nin sattığı otel odalarını gizliyor ve bu otel ilk turda tam da o yüzden kaçtı. Seçilen tesiste iki platformun fiyatı bir sterlin farkla aynı, ama ücretsiz iptalli tarifeyi ve burada çift kişilik yatağı yalnızca Booking veriyor.'
      }
    }
  }
};
