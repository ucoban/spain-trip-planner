/* España · the Çelik plan — every user-facing string, in every language.
 *
 * The itinerary skeleton (ids, times, prices, coordinates) stays in app.js
 * and trip-map.html; the words live here, once per language. Adding a
 * language is one more entry in STRINGS plus a button in the nav.
 *
 * Loaded before app.js / image-slot.js on index.html (all deferred, in
 * order) and synchronously on trip-map.html, so window.I18N exists by the
 * time anything renders. The choice persists in localStorage and falls
 * back to the browser language on first visit.
 */
(() => {
  'use strict';

  const STRINGS = {

    // ————————————————————————————————————————————————————————— English —
    en: {
      htmlTitle: 'España · the Çelik plan',
      metaDesc: 'Seven days, two siblings: Barcelona and València, 8-14 August. Tick things off as you go.',
      dows: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      pill: '{dow} {dom}',

      static: {
        brand: 'España · the Çelik plan',
        navDates: '8-14 Aug 2026',
        pricesIn: 'Show prices in',
        langIn: 'Language',
        tagDays: '7 days',
        tagSiblings: '2 siblings',
        tagSea: 'Sea at 26 °C',
        heroText: 'Izem sketches the buildings, Ahmet rates the horchata. Three days of Gaudí, Montserrat and evening swims in Barcelona, then markets, Calatrava and lagoon sunsets in València. Planned the August way, straight from the vlogs: out early, shade at noon, alive after nine. Tick things off as you go, it remembers.',
        heroPlaceholder: 'Drop a photo of you two',
        homeKicker: 'Home base',
        homeNote: 'Kettle HQ, back by the 14th',
        flightLabel: '2h20 flight',
        bcnKicker: 'Nights 1-3',
        bcnNote: 'Gaudí, Montserrat, evening swims',
        trainLabel: '2h40 sea train',
        vlcKicker: 'Nights 4-6',
        vlcNote: 'Calatrava, Albufera lagoon, beach days',
        mapTitle: 'The map',
        mapOpen: 'Open full-screen ↗',
        mapIntro: 'Every stop, pinned — dashed line is the flight, solid sage the coast train. Hover a pin for its name, tap for the when; the buttons zoom straight to a city.',
        mapFrame: 'Trip route map',
        trackerKicker: 'Trip tracker',
        bookKicker: 'Book before you fly',
        walletKicker: 'Travel wallet',
        walletDesc: 'Boarding passes, booking PDFs, insurance — pin each one to its stop, or keep it general. Stored privately and shared across everyone’s devices.',
        travellersKicker: 'The travellers',
        izemDesc: 'Architect. Gaudí and Calatrava days are hers — sketchbook stops are flagged in sage.',
        ahmetDesc: 'Student. Carry the student ID everywhere: Picasso, the Oceanogràfic and half of València knock money off.',
        vlogsKicker: 'What the vlogs taught us',
        vlogsText: 'Distilled from 21 Barcelona and València vlogs: book Sagrada and Park Güell before flying (August sells out), treat La Rambla as pickpocket championship level, eat the menú del día at lunch and paella only at lunch, markets close at three, and horchata fixes everything else. August sea: 26 ° Barcelona, 27 ° València. Pack GHIC cards, real sunscreen, and one empty bag for market loot.',
        emptyMsg: 'Nothing in this category today — try another day, or set the filter back to Everything.'
      },

      ui: {
        navCount: '{done} of {total} ticked',
        trackerCount: '{done} of {total} moments ticked',
        free: 'Free',
        pp: 'pp',
        dayN: 'Day {n}',
        generalTrip: 'General — whole trip',
        attach: '+ ticket / doc',
        attachLocked: '+ ticket / doc (locked)',
        attachTitle: 'Unlock the travel wallet in the sidebar first',
        tick: 'Tick off {title}',
        untick: 'Untick {title}',
        download: 'Download',
        closePreview: 'Close preview',
        docPreview: 'Document preview',
        previewOf: 'Preview of {name}',
        noPreview: 'No inline preview for this file type — use Download to open it.',
        addDoc: 'Add a document',
        working: 'Working…',
        unlock: 'Unlock',
        passPlaceholder: 'Wallet passphrase',
        noPassphrase: 'This deployment has no WALLET_PASSPHRASE set yet.',
        walletUnreachable: 'Could not reach the wallet.',
        requestFailed: 'That did not work. Try again.',
        legacyNoteOne: '1 document saved on this device is waiting to be moved across — unlock to keep it.',
        legacyNoteMany: '{n} documents saved on this device are waiting to be moved across — unlock to keep them.',
        migrateOne: 'Move 1 document off this device',
        migrateMany: 'Move {n} documents off this device',
        overSize: '{name} is over 4 MB',
        tooBig: ' — too big for the wallet.',
        pinTo: 'Pin {name} to a stop',
        removeDoc: 'Remove {name}',
        confirmRemove: 'Remove {name} from the wallet?'
      },

      cats: {
        travel: 'Transit', sights: 'Sights', museum: 'Museum', boat: 'Boat trip',
        swim: 'Swim', food: 'Food & drink', event: 'Fiesta'
      },
      filters: {
        all: 'Everything', boat: 'Boat trips', swim: 'Swimming', sights: 'Sights',
        museum: 'Museums', food: 'Food', event: 'Fiestas'
      },

      days: [
        { city: 'Barcelona', title: 'Wigston → Barcelona', sub: 'Saturday 8 Aug · plane day, into the Gothic Quarter by dusk' },
        { city: 'Barcelona', title: 'Gaudí, all day', sub: 'Sunday 9 Aug · the full pilgrimage, paced for the heat' },
        { city: 'Barcelona', title: 'Montserrat, then the sea', sub: 'Monday 10 Aug · the vloggers’ unanimous day trip, salt water by evening' },
        { city: 'BCN → València', title: 'Born morning, then south', sub: 'Tuesday 11 Aug · Picasso and one brisk Rambla, then the coast train to city two' },
        { city: 'València', title: 'Old town + first swim', sub: 'Wednesday 12 Aug · market breakfast, Gothic noon, beach evening' },
        { city: 'València', title: 'Calatrava + the lagoon', sub: 'Thursday 13 Aug · white city morning, rice country evening' },
        { city: 'Home', title: 'Adiós, España', sub: 'Friday 14 Aug · last walk, fly home' }
      ],

      acts: {
        d1b1: { title: 'Fly EMA → Barcelona', desc: 'Taxi from Wigston at 07:30, East Midlands is 45 minutes up the M1. Wheels up 10:35, wheels down 13:55. One cabin bag each.' },
        d1b2: { title: 'Airport train + check-in', desc: 'R2 Nord train, every half hour, straight to Passeig de Gràcia. Ten-minute walk to the Eixample apartment, bags down, cold shower, out by six.', tip: 'From the vlogs: the airport train beats the August bus queue and costs about a fiver.' },
        d1b3: { title: 'Gothic Quarter first wander', desc: 'Cathedral cloister (say hi to the thirteen geese), Plaça Sant Felip Neri, then the lampposts of Plaça Reial.', tip: 'Izem: the Reial lamps are Gaudí’s first ever commission. Student work, pre-everything.' },
        d1b4: { title: 'Tapas crawl, Carrer de la Mercè', desc: 'Standing-room bars: bravas, pan con tomate, a vermut each. Order badly, point a lot, repeat.', tip: 'From the vlogs: locals eat after nine, and the old-town lanes are pickpocket turf. Phones zipped, bags worn in front.' },
        d2b1: { title: 'Sagrada Família', desc: 'First slot of the day, before the crowds and the worst of the sun. Nativity façade outside, then the stone forest and the stained-glass wall of fire and sea.', tip: 'Izem: add the Passion tower, the spiral stair down is the drawing of the day.' },
        d2b2: { title: 'Long shaded lunch, Eixample', desc: 'Casa Milà’s stone wave from across the street on the way there. Then the August rule the vlogs all land on: a slow indoor lunch while the city bakes, nobody moves before five.' },
        d2b3: { title: 'Park Güell', desc: 'The mosaic salamander, the wavy bench with the city behind it, the colonnade holding up a road. Timed entry, don’t be late.', tip: 'From the vlogs: go early or go late in August, never at two. The bench faces the evening light, and it’s metro L4 plus the escalators up.' },
        d2b4: { title: 'Casa Batlló Magic Nights', desc: 'Twilight visit through the dragon house, then live music and a drink up on the scaled rooftop.', tip: 'Ahmet: yes, the drink is included.' },
        d3b1: { title: 'R5 train + rack railway up', desc: 'R5 from Plaça d’Espanya, then the cremallera up the cliff face. About an hour and a quarter, door to mountain.', tip: 'From the vlogs: roughly €24 return, and the early train beats both the coach tours and the heat.' },
        d3b2: { title: 'Montserrat monastery + ridge walk', desc: 'The basilica and the Black Madonna, then the Sant Joan funicular to the ridge path: saw-tooth peaks with all of Catalonia below.', tip: 'From the vlogs: three separate creators called this the best thing they did near Barcelona, and all three gave the same advice. Early.' },
        d3b3: { title: 'Barceloneta evening swim', desc: 'The sea is 26 °C in August and evening is the local swim slot: cooler sand, golden light, croissant traded for a granizado.', tip: 'From the vlogs: never leave phones on the towel while you both swim. Take turns.' },
        d3b4: { title: 'Dinner at Can Solé', desc: 'Open since 1903, two streets back from the sand. Get the arròs negre, braver than it looks.', tip: 'From the vlogs: locals treat paella strictly as a lunch dish, so tonight is the squid-ink cousin. The real paella happens lakeside on Thursday, at two.' },
        d4b1: { title: 'Breakfast, Mercat de Santa Caterina', desc: 'The wavy-roofed market on the edge of El Born. Coffee, fruit and jamón at the counter.', tip: 'From the vlogs: same produce as La Boqueria, a fraction of the crush and the prices. One creator titled a whole chapter “a market BETTER than La Boqueria”. This is that market.' },
        d4b2: { title: 'Santa Maria del Mar + Born lanes', desc: 'The sailors’ basilica, one soaring stone room. Then the medieval lanes to the museum door.' },
        d4b3: { title: 'Museu Picasso', desc: 'Five Gothic palaces of early Picasso, ending in the room of Las Meninas he painted at seventy-six.', tip: 'Ahmet: student card = reduced entry.' },
        d4b4: { title: 'La Rambla, once, briskly', desc: 'Walk it once for the theatre of it, one fresh juice inside La Boqueria, done by one o’clock.', tip: 'From the vlogs: La Rambla has the highest pickpocket concentration in Barcelona, and Boqueria prices are tourist prices. Look, sip, move on.' },
        d4b5: { title: 'Euromed to València', desc: 'Bags from the apartment, then Sants → València Nord, around three hours down the coast. Sit on the left, the Mediterranean does the entertainment.' },
        d4b6: { title: 'Turia Gardens hello-walk', desc: 'Nine kilometres of park where the river used to be. Walk as far as the Gulliver playground and back.', tip: 'From the vlogs: the Turia is best by bike. If tonight’s walk wins you over, rent a pair on Thursday morning.' },
        d4b7: { title: 'Dinner in Russafa', desc: 'València’s liveliest barrio, the one the vlogs call the trendy stay. Agua de València comes by the jug. One jug, shared, that’s the rule.' },
        d5b1: { title: 'Mercat Central, early', desc: 'One of Europe’s great iron-and-glass markets. Horchata and fartons at the counter, jamón and manchego for later. Ahmet’s new personality.', tip: 'From the vlogs: the single most-filmed stop in every València vlog we mined. It shuts at three and sleeps on Sunday, so it has to be a morning.' },
        d5b2: { title: 'La Lonja de la Seda', desc: 'The UNESCO silk exchange, Gothic columns twisted like rope pulled tight. Two euros, somehow.', tip: 'Izem: the Sala de Contratación. Fifteen minutes of just looking.' },
        d5b3: { title: 'Cathedral + El Miguelete', desc: '207 steps up the bell tower for the whole city in one slow turn. The cathedral also claims the Holy Grail. Sure.' },
        d5b4: { title: 'Menú del día, old town', desc: 'Three courses and a glass of something cold for meal-deal money, the great weekday-lunch institution.', tip: 'From the vlogs: one creator called the menú del día the best thing about Spain, full stop. Look for the chalkboard, not the laminated menu.' },
        d5b5: { title: 'Malva-rosa beach', desc: 'The 1.50 € bus or a €10 taxi to the sand. Wide, flat, 27 °C water: proper swimming, then lying down professionally.' },
        d5b6: { title: 'Serranos Towers, golden hour', desc: 'Climb the medieval gate as the light goes honey-coloured over the old riverbed.' },
        d5b7: { title: 'Dinner in El Carmen', desc: 'Street-art lanes and tapas tables in the oldest corner of the city.', tip: 'From the vlogs (the comments, actually): viewers kept pushing bunyols, pumpkin fritters with hot chocolate. Field-tested local knowledge.' },
        d6b1: { title: 'City of Arts & Sciences', desc: 'The Hemisfèric eye, the Umbracle palm walk, white ribs against blue sky in every direction. By bike if Tuesday’s Turia walk converted you.', tip: 'Izem: sketchbook day. Morning light on the Hemisfèric is the shot.' },
        d6b2: { title: 'Oceanogràfic', desc: 'Europe’s biggest aquarium: the shark tunnel, belugas, and a jellyfish room built for standing very still in.', tip: 'From the vlogs: about €32 on the door, cheaper and queue-free booked online. The jellyfish room doubles as air conditioning at noon.' },
        d6b3: { title: 'Paella at its birthplace', desc: 'Bus 24 or 25 south through the rice paddies to El Palmar, where paella is actually from. Rabbit-and-bean valenciana, or all i pebre eel stew for the brave.', tip: 'From the vlogs: paella is a lunch dish that takes 25 minutes and is ordered for two or more. At two o’clock in El Palmar you are doing it exactly right.' },
        d6b4: { title: 'Albufera lagoon boat', desc: 'A flat-bottomed albuferenc glides you through reeds and rice paddies, Europe’s rice bowl from water level.' },
        d6b5: { title: 'Albufera sunset', desc: 'The sky show locals drive out for. Stay on the jetty until the last orange is gone.' },
        d7b1: { title: 'Last loop of the Turia', desc: 'Under Calatrava’s white bridges one more time. Buy the fartons that will not survive the flight.' },
        d7b2: { title: 'Fly València → East Midlands', desc: 'Metro to the airport in 25 minutes. Land at EMA, taxi to Wigston, kettle on by six.' }
      },

      bookings: {
        k1: 'Flights: EMA → Barcelona out, València → EMA home',
        k2: 'Sagrada Família 09:00 slot, Sun 9 (vlogs: August sells out weeks ahead)',
        k3: 'Park Güell timed entry, Sun 9 · 17:30',
        k4: 'Casa Batlló Magic Nights, Sun 9',
        k5: 'Montserrat: R5 + cremallera return, Mon 10',
        k6: 'Can Solé table, Mon 10 evening (arrocerías book out in August)',
        k7: 'Museu Picasso timed entry, Tue 11 (Ahmet: student rate)',
        k8: 'Euromed 14:05, Tue 11, left-side seats',
        k9: 'Oceanogràfic online tickets, Thu 13 (vlogs: skips the door queue)',
        k10: 'Albufera sunset boat, Thu 13'
      },

      map: {
        htmlTitle: 'España — the route',
        panelTitle: 'The route',
        panelDates: '8-14 August',
        viewAll: 'Full route',
        legendLabel: 'Legend ▾',
        flight: 'Flight, 2h20',
        train: 'Coast train, 2h40',
        catSights: 'Sights & museums',
        catSea: 'Boats & swims',
        catFood: 'Food & drink',
        catFiesta: 'Fiestas & nights out',
        wigstonLong: 'Wigston — home',
        bcnLong: 'Barcelona · nights 1-3',
        vlcLong: 'València · nights 4-6',
        lock: 'Tap to explore the map',
        spots: {
          gothic: 'Gothic Quarter wander',
          merce: 'Tapas, Carrer de la Mercè',
          sagrada: 'Sagrada Família',
          guell: 'Park Güell',
          batllo: 'Casa Batlló Magic Nights',
          montserrat: 'Montserrat monastery',
          barceloneta: 'Barceloneta evening swim',
          cansole: 'Dinner at Can Solé',
          caterina: 'Mercat de Santa Caterina',
          delmar: 'Santa Maria del Mar',
          picasso: 'Museu Picasso',
          rambla: 'La Rambla + Boqueria, briskly',
          turia: 'Turia Gardens',
          russafa: 'Dinner in Russafa',
          mercat: 'Mercat Central + horchata',
          lonja: 'La Lonja de la Seda',
          cathedral: 'Cathedral + El Miguelete',
          malvarosa: 'Malva-rosa beach',
          serranos: 'Serranos Towers, golden hour',
          carmen: 'Dinner in El Carmen',
          arts: 'City of Arts & Sciences',
          ocean: 'Oceanogràfic',
          palmar: 'Paella in El Palmar',
          albufera: 'Albufera boat + sunset'
        }
      },

      slot: {
        browseHtml: 'or <u>browse files</u>',
        replace: 'Replace',
        remove: 'Remove',
        badType: 'Drop a PNG, JPEG, WebP, or AVIF image.',
        readFail: 'Could not read that image.',
        storageFull: 'Storage is full — remove a wallet document to make room for the photo.',
        dropImage: 'Drop an image'
      }
    },

    // ————————————————————————————————————————————————————————— Türkçe —
    tr: {
      htmlTitle: 'España · Çelik planı',
      metaDesc: 'Yedi gün, iki kardeş: Barcelona ve València, 8-14 Ağustos. Yaptıkça işaretle.',
      dows: ['Cmt', 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum'],
      pill: '{dom} {dow}',

      static: {
        brand: 'España · Çelik planı',
        navDates: '8-14 Ağu 2026',
        pricesIn: 'Fiyat birimi',
        langIn: 'Dil',
        tagDays: '7 gün',
        tagSiblings: '2 kardeş',
        tagSea: 'Deniz 26 °C',
        heroText: 'Izem binaları çiziyor, Ahmet horchata’lara puan veriyor. Barcelona’da üç gün Gaudí, Montserrat ve akşam denize girmeler; sonra València’da pazarlar, Calatrava ve lagünde gün batımları. Ağustos usulü, doğrudan vloglardan planlandı: erken çık, öğlen gölgeye geç, dokuzdan sonra hayat başlar. Yaptıkça işaretle, sayfa unutmaz.',
        heroPlaceholder: 'İkinizin bir fotoğrafını bırakın',
        homeKicker: 'Ana üs',
        homeNote: 'Çaydanlık karargâhı, 14’ünde evdeyiz',
        flightLabel: '2 sa 20 dk uçuş',
        bcnKicker: '1-3. geceler',
        bcnNote: 'Gaudí, Montserrat, akşam denize girmeler',
        trainLabel: '2 sa 40 dk sahil treni',
        vlcKicker: '4-6. geceler',
        vlcNote: 'Calatrava, Albufera lagünü, plaj günleri',
        mapTitle: 'Harita',
        mapOpen: 'Tam ekran aç ↗',
        mapIntro: 'Her durak haritada iğneli — kesikli çizgi uçuş, düz adaçayı yeşili sahil treni. İmleci iğnenin üzerine getir adı, dokun zamanı çıksın; düğmeler doğruca şehre yakınlaşır.',
        mapFrame: 'Gezi rotası haritası',
        trackerKicker: 'Gezi sayacı',
        bookKicker: 'Uçmadan önce rezerve et',
        walletKicker: 'Seyahat cüzdanı',
        walletDesc: 'Biniş kartları, rezervasyon PDF’leri, sigorta — her birini bir durağa iğnele ya da genel bırak. Özel olarak saklanır, herkesin cihazından açılır.',
        travellersKicker: 'Yolcular',
        izemDesc: 'Mimar. Gaudí ve Calatrava günleri onun — eskiz defteri durakları adaçayı yeşiliyle işaretli.',
        ahmetDesc: 'Öğrenci. Öğrenci kimliğini her yere yanında taşı: Picasso, Oceanogràfic ve València’nın yarısı indirim yapıyor.',
        vlogsKicker: 'Vlogların öğrettikleri',
        vlogsText: '21 Barcelona ve València vlogundan damıtıldı: Sagrada’yı ve Park Güell’i uçmadan önce ayırt (ağustosta biletler tükenir), La Rambla’ya yankesicilik şampiyonası finali muamelesi yap, öğlen menú del día ye, paellayı yalnızca öğlen ye, pazarlar üçte kapanır, geri kalan her şeyi horchata çözer. Ağustos denizi: Barcelona 26°, València 27°. Yanına GHIC kartlarını, gerçek güneş kremini ve pazar ganimeti için bir boş çanta al.',
        emptyMsg: 'Bugün bu kategoride bir şey yok — başka bir güne bak ya da filtreyi Hepsi’ne geri al.'
      },

      ui: {
        navCount: '{done}/{total} işaretli',
        trackerCount: '{done} / {total} an işaretlendi',
        free: 'Ücretsiz',
        pp: 'kişi başı',
        dayN: '{n}. Gün',
        generalTrip: 'Genel — tüm gezi',
        attach: '+ bilet / belge',
        attachLocked: '+ bilet / belge (kilitli)',
        attachTitle: 'Önce yan paneldeki seyahat cüzdanının kilidini aç',
        tick: 'İşaretle: {title}',
        untick: 'İşareti kaldır: {title}',
        download: 'İndir',
        closePreview: 'Önizlemeyi kapat',
        docPreview: 'Belge önizleme',
        previewOf: '{name} önizlemesi',
        noPreview: 'Bu dosya türü için yerleşik önizleme yok — açmak için İndir’i kullan.',
        addDoc: 'Belge ekle',
        working: 'Çalışıyor…',
        unlock: 'Kilidi aç',
        passPlaceholder: 'Cüzdan parolası',
        noPassphrase: 'Bu kurulumda henüz WALLET_PASSPHRASE tanımlanmamış.',
        walletUnreachable: 'Cüzdana ulaşılamadı.',
        requestFailed: 'Olmadı. Bir daha dene.',
        legacyNoteOne: 'Bu cihazda kayıtlı 1 belge taşınmayı bekliyor — kaybetmemek için kilidi aç.',
        legacyNoteMany: 'Bu cihazda kayıtlı {n} belge taşınmayı bekliyor — kaybetmemek için kilidi aç.',
        migrateOne: '1 belgeyi bu cihazdan taşı',
        migrateMany: '{n} belgeyi bu cihazdan taşı',
        overSize: '{name} 4 MB’ın üzerinde',
        tooBig: ' — cüzdan için fazla büyük.',
        pinTo: 'Bir durağa iğnele: {name}',
        removeDoc: 'Kaldır: {name}',
        confirmRemove: '{name} cüzdandan kaldırılsın mı?'
      },

      cats: {
        travel: 'Ulaşım', sights: 'Gezilecek yer', museum: 'Müze', boat: 'Tekne turu',
        swim: 'Yüzme', food: 'Yeme içme', event: 'Fiesta'
      },
      filters: {
        all: 'Hepsi', boat: 'Tekne turları', swim: 'Yüzme', sights: 'Gezilecek yerler',
        museum: 'Müzeler', food: 'Yemek', event: 'Fiestalar'
      },

      days: [
        { city: 'Barcelona', title: 'Wigston → Barcelona', sub: '8 Ağustos Cumartesi · uçak günü, akşam alacasında Gotik Mahalle' },
        { city: 'Barcelona', title: 'Bütün gün Gaudí', sub: '9 Ağustos Pazar · tam Gaudí haccı, temposu sıcağa göre ayarlı' },
        { city: 'Barcelona', title: 'Montserrat, sonra deniz', sub: '10 Ağustos Pazartesi · vlogcuların oy birliğiyle seçtiği günübirlik tur, akşama tuzlu su' },
        { city: 'BCN → València', title: 'Sabah Born, sonra güney', sub: '11 Ağustos Salı · Picasso ve tempolu bir Rambla, sonra sahil treniyle ikinci şehre' },
        { city: 'València', title: 'Eski şehir + ilk yüzme', sub: '12 Ağustos Çarşamba · pazarda kahvaltı, Gotik öğle, akşam plaj' },
        { city: 'València', title: 'Calatrava + lagün', sub: '13 Ağustos Perşembe · sabah beyaz şehir, akşam pirinç diyarı' },
        { city: 'Ev', title: 'Adiós, España', sub: '14 Ağustos Cuma · son yürüyüş, eve uçuş' }
      ],

      acts: {
        d1b1: { title: 'EMA → Barcelona uçuşu', desc: '07:30’da Wigston’dan taksi; East Midlands, M1’den 45 dakika. 10:35’te havada, 13:55’te yerde. Herkese birer kabin çantası.' },
        d1b2: { title: 'Havalimanı treni + yerleşme', desc: 'R2 Nord treni, yarım saatte bir, doğruca Passeig de Gràcia’ya. Eixample’deki daireye on dakika yürüyüş; çantalar yere, soğuk bir duş, altıda dışarıdayız.', tip: 'Vloglardan: havalimanı treni ağustos otobüs kuyruğunu yener, üstelik beş euro civarı.' },
        d1b3: { title: 'Gotik Mahalle’de ilk tur', desc: 'Katedral avlusu (on üç kaza selam ver), Plaça Sant Felip Neri, sonra Plaça Reial’in sokak lambaları.', tip: 'Izem: Reial lambaları Gaudí’nin aldığı ilk sipariş. Öğrencilik işi, her şeyden önce.' },
        d1b4: { title: 'Tapas turu, Carrer de la Mercè', desc: 'Ayakta içilen barlar: bravas, pan con tomate, birer vermut. Kötü sipariş ver, bol bol işaret et, tekrarla.', tip: 'Vloglardan: yerliler dokuzdan sonra yemek yer, eski şehir sokakları da yankesici bölgesi. Telefonlar fermuarlı cepte, çantalar önde.' },
        d2b1: { title: 'Sagrada Família', desc: 'Günün ilk seansı — kalabalık ve öğle güneşi bastırmadan. Önce dışarıda Doğuş Cephesi, sonra içeride taş orman ile ateşin ve denizin vitray duvarı.', tip: 'Izem: Tutku kulesini de ekle; sarmal iniş merdiveni günün çizimi.' },
        d2b2: { title: 'Uzun gölgeli öğle yemeği, Eixample', desc: 'Yolda karşı kaldırımdan Casa Milà’nın taş dalgası. Sonra bütün vlogların birleştiği ağustos kuralı: şehir kavrulurken içeride ağır bir öğle yemeği; beşten önce kimse kıpırdamaz.' },
        d2b3: { title: 'Park Güell', desc: 'Mozaik semender, arkasına şehri almış dalgalı bank, bir yolu sırtında taşıyan sütunlu galeri. Girişler saatli, geç kalma.', tip: 'Vloglardan: ağustosta ya erken git ya geç git, asla ikide gitme. Bank akşam ışığına bakar; ulaşım metro L4 artı yukarı yürüyen merdivenler.' },
        d2b4: { title: 'Casa Batlló Sihirli Geceler', desc: 'Alacakaranlıkta ejderha evinde gezinti, sonra pullu çatıda canlı müzik ve birer içecek.', tip: 'Ahmet: evet, içecek fiyata dahil.' },
        d3b1: { title: 'R5 treni + dişli trenle yukarı', desc: 'Plaça d’Espanya’dan R5, sonra kayalıkları tırmanan cremallera. Kapıdan dağa bir saat çeyrek.', tip: 'Vloglardan: gidiş dönüş 24 € civarı; erken tren hem otobüs turlarını hem sıcağı yener.' },
        d3b2: { title: 'Montserrat manastırı + sırt yürüyüşü', desc: 'Bazilika ve Kara Madonna, sonra Sant Joan füniküleriyle sırt patikasına: testere dişli zirveler, aşağıda bütün Katalonya.', tip: 'Vloglardan: üç ayrı vlogcu buna Barcelona civarında yaptıkları en iyi şey dedi ve üçü de aynı tavsiyeyi verdi. Erken.' },
        d3b3: { title: 'Barceloneta’da akşam yüzmesi', desc: 'Ağustosta deniz 26 °C ve akşam, yerlilerin yüzme saati: serinlemiş kum, altın ışık, kruvasan yerine granizado.', tip: 'Vloglardan: ikiniz birden yüzerken telefonları asla havluda bırakmayın. Sırayla girin.' },
        d3b4: { title: 'Akşam yemeği: Can Solé', desc: '1903’ten beri açık, kumsaldan iki sokak içeride. Arròs negre söyle; göründüğünden daha cesur bir tabak.', tip: 'Vloglardan: yerliler paellayı kesinlikle öğle yemeği sayar; bu akşamki, mürekkep balıklı kuzeni. Gerçek paella perşembe saat ikide, göl kenarında.' },
        d4b1: { title: 'Kahvaltı, Mercat de Santa Caterina', desc: 'El Born’un kıyısındaki dalgalı çatılı pazar. Tezgâhta kahve, meyve ve jamón.', tip: 'Vloglardan: La Boqueria ile aynı ürünler, kalabalığın ve fiyatların çok altında. Bir vlogcu koca bir bölüme “La Boqueria’dan DAHA İYİ bir pazar” adını verdi. O pazar burası.' },
        d4b2: { title: 'Santa Maria del Mar + Born sokakları', desc: 'Denizcilerin bazilikası, göğe uzanan tek bir taş salon. Sonra ortaçağ sokaklarından müze kapısına.' },
        d4b3: { title: 'Museu Picasso', desc: 'Beş Gotik sarayda genç Picasso; final, yetmiş altısında yaptığı Las Meninas odası.', tip: 'Ahmet: öğrenci kartı = indirimli giriş.' },
        d4b4: { title: 'La Rambla, bir kez, hızlıca', desc: 'Şovu için bir kez yürü, La Boqueria’da bir taze meyve suyu, saat birde işin bitmiş olsun.', tip: 'Vloglardan: La Rambla, Barcelona’nın en yoğun yankesici noktası; Boqueria fiyatları da turist fiyatı. Bak, yudumla, yola devam.' },
        d4b5: { title: 'Euromed ile València’ya', desc: 'Daireden çantaları al, sonra Sants → València Nord; sahil boyunca üç saat kadar. Sola otur, eğlenceyi Akdeniz üstlenir.' },
        d4b6: { title: 'Turia Bahçeleri’ne merhaba yürüyüşü', desc: 'Eskiden nehir olan yerde dokuz kilometrelik park. Gulliver oyun parkına kadar yürü, geri dön.', tip: 'Vloglardan: Turia en güzel bisikletle gezilir. Bu akşamki yürüyüş seni kazanırsa perşembe sabahı iki bisiklet kirala.' },
        d4b7: { title: 'Akşam yemeği: Russafa', desc: 'València’nın en hareketli mahallesi; vlogların “trend semt” dediği yer. Agua de València sürahiyle gelir. Tek sürahi, paylaşarak — kural bu.' },
        d5b1: { title: 'Mercat Central, erkenden', desc: 'Avrupa’nın büyük demir-cam pazarlarından biri. Tezgâhta horchata ve fartons, sonrası için jamón ve manchego. Ahmet’in yeni kişiliği.', tip: 'Vloglardan: taradığımız her València vlogunun en çok çekilen durağı. Üçte kapanır, pazar günleri uyur; o yüzden mutlaka sabah.' },
        d5b2: { title: 'La Lonja de la Seda', desc: 'UNESCO listesindeki ipek borsası; gerilmiş halat gibi burulmuş Gotik sütunlar. Nasılsa iki euro.', tip: 'Izem: Sala de Contratación. On beş dakika sadece bakmak.' },
        d5b3: { title: 'Katedral + El Miguelete', desc: 'Çan kulesine 207 basamak; tek bir yavaş dönüşte bütün şehir. Katedral ayrıca Kutsal Kâse bende diyor. Tabii, tabii.' },
        d5b4: { title: 'Menú del día, eski şehir', desc: 'Menü parasına üç tabak ve bir bardak soğuk bir şey; hafta içi öğle yemeğinin büyük kurumu.', tip: 'Vloglardan: bir vlogcu menú del día için “İspanya’nın en iyi şeyi, nokta” dedi. Lamine menüyü değil, kara tahtayı ara.' },
        d5b5: { title: 'Malva-rosa plajı', desc: 'Kuma 1,50 €’luk otobüs ya da 10 €’luk taksi. Geniş, düz, 27 °C su: önce adamakıllı yüzme, sonra profesyonelce uzanma.' },
        d5b6: { title: 'Serranos Kuleleri, altın saat', desc: 'Işık eski nehir yatağının üzerinde bal rengine dönerken ortaçağ kapısına tırman.' },
        d5b7: { title: 'Akşam yemeği: El Carmen', desc: 'Şehrin en eski köşesinde grafitili sokaklar ve tapas masaları.', tip: 'Vloglardan (aslında yorumlardan): izleyiciler ısrarla bunyols dedi — sıcak çikolatayla balkabağı lokması. Sahada denenmiş yerel bilgi.' },
        d6b1: { title: 'Sanat ve Bilim Şehri', desc: 'Hemisfèric’in gözü, Umbracle palmiye yolu, her yönde mavi göğe karşı beyaz kaburgalar. Salı günkü Turia yürüyüşü seni ikna ettiyse bisikletle.', tip: 'Izem: eskiz defteri günü. Hemisfèric’e vuran sabah ışığı — kare tam olarak o.' },
        d6b2: { title: 'Oceanogràfic', desc: 'Avrupa’nın en büyük akvaryumu: köpekbalığı tüneli, belugalar ve içinde kıpırdamadan durmak için yapılmış bir denizanası odası.', tip: 'Vloglardan: kapıda 32 € civarı; internetten alınca hem daha ucuz hem kuyruksuz. Denizanası odası öğlen ayrıca klima görevi görür.' },
        d6b3: { title: 'Paella, doğduğu yerde', desc: '24 ya da 25 numaralı otobüsle çeltik tarlaları arasından güneye, paellanın gerçek memleketi El Palmar’a. Tavşanlı-fasulyeli valenciana, cesurlara da yılan balıklı all i pebre.', tip: 'Vloglardan: paella 25 dakikada pişen, en az iki kişilik söylenen bir öğle yemeğidir. Saat ikide El Palmar’daysan her şeyi tam doğru yapıyorsun.' },
        d6b4: { title: 'Albufera lagün teknesi', desc: 'Düz tabanlı bir albuferenc seni sazlıkların ve çeltik tarlalarının arasından süzerek geçirir; Avrupa’nın pirinç ambarı, su seviyesinden.' },
        d6b5: { title: 'Albufera gün batımı', desc: 'Yerlilerin arabayla gelip izlediği gökyüzü şovu. Son turuncu kaybolana dek iskelede kal.' },
        d7b1: { title: 'Turia’da son tur', desc: 'Calatrava’nın beyaz köprülerinin altından son bir kez. Uçuşu sağ atlatamayacak fartons’lardan al.' },
        d7b2: { title: 'València → East Midlands uçuşu', desc: 'Metroyla havalimanına 25 dakika. EMA’ya iniş, Wigston’a taksi, altıda çaydanlık ocakta.' }
      },

      bookings: {
        k1: 'Uçuşlar: gidiş EMA → Barcelona, dönüş València → EMA',
        k2: 'Sagrada Família 09:00 seansı, 9 Paz (vloglar: ağustos haftalar öncesinden tükenir)',
        k3: 'Park Güell saatli giriş, 9 Paz · 17:30',
        k4: 'Casa Batlló Sihirli Geceler, 9 Paz',
        k5: 'Montserrat: R5 + cremallera gidiş dönüş, 10 Pzt',
        k6: 'Can Solé masası, 10 Pzt akşamı (arrocería’lar ağustosta dolar)',
        k7: 'Museu Picasso saatli giriş, 11 Sal (Ahmet: öğrenci tarifesi)',
        k8: 'Euromed 14:05, 11 Sal, sol taraf koltuklar',
        k9: 'Oceanogràfic internet bileti, 13 Per (vloglar: kapı kuyruğunu atlatır)',
        k10: 'Albufera gün batımı teknesi, 13 Per'
      },

      map: {
        htmlTitle: 'España — rota',
        panelTitle: 'Rota',
        panelDates: '8-14 Ağustos',
        viewAll: 'Tüm rota',
        legendLabel: 'Lejant ▾',
        flight: 'Uçuş, 2 sa 20 dk',
        train: 'Sahil treni, 2 sa 40 dk',
        catSights: 'Geziler ve müzeler',
        catSea: 'Tekne ve yüzme',
        catFood: 'Yeme içme',
        catFiesta: 'Fiestalar ve geceler',
        wigstonLong: 'Wigston — ev',
        bcnLong: 'Barcelona · 1-3. geceler',
        vlcLong: 'València · 4-6. geceler',
        lock: 'Haritayı keşfetmek için dokun',
        spots: {
          gothic: 'Gotik Mahalle turu',
          merce: 'Tapas, Carrer de la Mercè',
          sagrada: 'Sagrada Família',
          guell: 'Park Güell',
          batllo: 'Casa Batlló Sihirli Geceler',
          montserrat: 'Montserrat manastırı',
          barceloneta: 'Barceloneta akşam yüzmesi',
          cansole: 'Akşam yemeği: Can Solé',
          caterina: 'Mercat de Santa Caterina',
          delmar: 'Santa Maria del Mar',
          picasso: 'Museu Picasso',
          rambla: 'La Rambla + Boqueria, hızlıca',
          turia: 'Turia Bahçeleri',
          russafa: 'Akşam yemeği: Russafa',
          mercat: 'Mercat Central + horchata',
          lonja: 'La Lonja de la Seda',
          cathedral: 'Katedral + El Miguelete',
          malvarosa: 'Malva-rosa plajı',
          serranos: 'Serranos Kuleleri, altın saat',
          carmen: 'Akşam yemeği: El Carmen',
          arts: 'Sanat ve Bilim Şehri',
          ocean: 'Oceanogràfic',
          palmar: 'Paella, El Palmar',
          albufera: 'Albufera teknesi + gün batımı'
        }
      },

      slot: {
        browseHtml: 'ya da <u>dosya seç</u>',
        replace: 'Değiştir',
        remove: 'Kaldır',
        badType: 'PNG, JPEG, WebP ya da AVIF bir görsel bırak.',
        readFail: 'Bu görsel okunamadı.',
        storageFull: 'Depolama dolu — fotoğrafa yer açmak için cüzdandan bir belge kaldır.',
        dropImage: 'Bir görsel bırak'
      },

      // The API answers in English; these map its known messages so a wrong
      // passphrase reads as Turkish too. Anything unrecognised passes through.
      server: {
        'Wrong passphrase.': 'Parola yanlış.',
        'Locked — unlock the wallet first.': 'Kilitli — önce cüzdanın kilidini aç.',
        'WALLET_PASSPHRASE is not set on this deployment.': 'Bu kurulumda WALLET_PASSPHRASE tanımlı değil.',
        'No file in the request.': 'İstekte dosya yok.',
        'That file is empty.': 'Bu dosya boş.',
        'Unknown document.': 'Bilinmeyen belge.',
        'The wallet is unreachable right now.': 'Cüzdana şu anda ulaşılamıyor.',
        'Method not allowed': 'Bu yönteme izin verilmiyor.'
      },
      serverPatterns: [
        [/^(.+) is over 4 MB — too big for the wallet\.$/, '$1 4 MB’ın üzerinde — cüzdan için fazla büyük.']
      ]
    }
  };

  const KEY = 'celik-spain-lang';
  const stored = (() => { try { return localStorage.getItem(KEY); } catch (e) { return null; } })();
  const lang = STRINGS[stored] ? stored
    : ((navigator.language || '').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en');

  document.documentElement.lang = lang;

  window.I18N = {
    lang,
    t: STRINGS[lang],
    // '{name}' placeholders — leaves unknown ones alone.
    fmt: (str, params) => str.replace(/\{(\w+)\}/g, (m, k) => (params && k in params) ? params[k] : m),
    // Server messages arrive in English; route them through the active
    // language's lookup table (and patterns) before showing them.
    server(msg) {
      const t = STRINGS[lang];
      if (t.server && t.server[msg]) return t.server[msg];
      for (const [re, out] of t.serverPatterns || []) {
        if (re.test(msg)) return msg.replace(re, out);
      }
      return msg;
    },
    set(next) {
      if (!STRINGS[next] || next === lang) return;
      try { localStorage.setItem(KEY, next); } catch (e) {}
      location.reload();
    }
  };
})();
