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
        heroText: 'Izem is here for the architecture, Ahmet for the horchata. Three days of Gaudí, Montserrat and evening swims in Barcelona, then markets, Calatrava and lagoon sunsets in València. Planned the August way, straight from the vlogs: out early, shade at noon, alive after nine. Tick things off as you go, it remembers.',
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
        izemDesc: 'Architect. The Gaudí and Calatrava days are planned around her.',
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
        d1b1: { title: 'Fly EMA → Barcelona', desc: 'Taxi from Wigston at 07:30; East Midlands airport is about 45 minutes up the M1. The flight leaves at 10:35 and lands in Barcelona at 13:55 local time. One cabin bag each, so there is no hold luggage to wait for.' },
        d1b2: { title: 'Airport train + check-in', desc: 'From the airport, take the R2 Nord train (it runs every half hour) straight to Passeig de Gràcia station. From there it is a ten-minute walk to the apartment in the Eixample district. Drop the bags, take a cold shower, and head back out around six when the heat starts to ease.', tip: 'From the vlogs: the airport train is faster than queueing for the bus in August, and a ticket costs about five euros.' },
        d1b3: { title: 'Gothic Quarter first wander', desc: 'A first easy walk through the medieval old town. See the cathedral cloister, home to thirteen resident geese, then the small quiet square of Plaça Sant Felip Neri, and finish under the ornate lampposts of Plaça Reial.', tip: 'Izem: the lampposts on Plaça Reial were Gaudí’s first ever commission, designed while he was still a student.' },
        d1b4: { title: 'Tapas crawl, Carrer de la Mercè', desc: 'Dinner is a crawl along Carrer de la Mercè, a street lined with small stand-up tapas bars. In each one, order patatas bravas, pan con tomate (toasted bread rubbed with tomato and olive oil) and a glass of vermut, then move on to the next bar.', tip: 'From the vlogs: locals do not sit down to dinner before nine, and the old-town lanes are known pickpocket territory. Keep phones zipped away and wear bags at the front.' },
        d2b1: { title: 'Sagrada Família', desc: 'Gaudí’s basilica, booked for the first entry slot of the day so you are inside before the crowds and the worst of the sun arrive. Look at the Nativity façade from outside first, then go in for the forest of stone columns and the stained-glass windows that glow orange on one side of the church and blue-green on the other.', tip: 'Izem: add the Passion tower ticket. A lift takes you up and you walk down a spiral staircase, with the whole city visible between the spires.' },
        d2b2: { title: 'Long shaded lunch, Eixample', desc: 'On the walk back, stop across the street from Casa Milà (La Pedrera) to look at its wave-shaped stone facade. Then follow the local August rule: a long, slow lunch somewhere air-conditioned while the city is at its hottest. Nobody goes back out before five.' },
        d2b3: { title: 'Park Güell', desc: 'Gaudí’s hillside park: the mosaic salamander at the entrance, the long wavy bench covered in broken-tile mosaic with the whole city spread out behind it, and the colonnade that carries a road on leaning stone pillars. Entry is by timed ticket, so do not be late for the slot.', tip: 'From the vlogs: in August go early in the morning or in the evening, never mid-afternoon. The famous bench faces west, so the evening light is the good light. Take metro line L4, then the outdoor escalators up the hill.' },
        d2b4: { title: 'Casa Batlló Magic Nights', desc: 'Casa Batlló’s summer evening event: a twilight visit through the whole dragon-themed house, ending on the scaled rooftop terrace with a live concert and a drink under the chimneys.', tip: 'Ahmet: yes, the drink is included in the ticket.' },
        d3b1: { title: 'R5 train + rack railway up', desc: 'Take the R5 train from Plaça d’Espanya station towards Manresa and get off at Monistrol de Montserrat. From there the cremallera, a rack railway, climbs the cliff face up to the monastery. Door to mountain takes about an hour and a quarter.', tip: 'From the vlogs: the return trip costs about 24 euros. Take the earliest train you can manage; it beats both the tour coaches and the heat.' },
        d3b2: { title: 'Montserrat monastery + ridge walk', desc: 'Montserrat is a Benedictine monastery built into a wall of saw-toothed rock an hour from Barcelona. Visit the basilica and the Black Madonna statue, then take the Sant Joan funicular up to the ridge path for views over the whole of Catalonia. Bring water and something for a picnic.', tip: 'From the vlogs: three separate creators called this the best thing they did around Barcelona, and every one of them gave the same advice: arrive before the tour buses, which turn up around eleven.' },
        d3b3: { title: 'Barceloneta evening swim', desc: 'Back in the city, join the locals for the evening swim at Barceloneta beach. In August the sea is around 26 °C, and by six the sand has cooled and the light has turned golden. Get a granizado, a crushed-ice drink, from the promenade afterwards.', tip: 'From the vlogs: never leave phones or wallets on the towel while you are both in the water. Swim in turns.' },
        d3b4: { title: 'Dinner at Can Solé', desc: 'Dinner at Can Solé, a seafood restaurant two streets behind the beach that has been open since 1903. Order the arròs negre: rice cooked jet black in squid ink, which tastes far milder than it looks.', tip: 'From the vlogs: Spaniards eat paella only at lunchtime, so tonight is the squid-ink cousin instead. The proper paella comes on Thursday at two o’clock, beside the lagoon where the dish was invented.' },
        d4b1: { title: 'Breakfast, Mercat de Santa Caterina', desc: 'Breakfast at Santa Caterina market, the food hall with the wavy multicoloured roof on the edge of the El Born quarter. Have coffee, fruit and a plate of jamón standing at the counter bar.', tip: 'From the vlogs: it sells the same produce as the famous La Boqueria, but without the tourist crush or the tourist prices. One creator titled a whole chapter of his video “a market BETTER than La Boqueria”, and he meant this one.' },
        d4b2: { title: 'Santa Maria del Mar + Born lanes', desc: 'Two minutes away is Santa Maria del Mar, the sailors’ basilica. It looks plain from outside, but inside it is one vast bare stone hall, and many people’s favourite church in the city. Afterwards, wander the narrow medieval streets of El Born towards the Picasso museum.' },
        d4b3: { title: 'Museu Picasso', desc: 'The Picasso museum fills five joined Gothic palaces and focuses on his early work, so you watch him learn to paint room by room. It ends with the series of Las Meninas variations he painted at seventy-six.', tip: 'Ahmet: bring the student card, it gets you reduced entry.' },
        d4b4: { title: 'La Rambla, once, briskly', desc: 'Walk La Rambla, the famous tree-lined promenade, exactly once for the spectacle of it. Step into La Boqueria market for a fresh fruit juice, and be done by one o’clock so there is time to collect the bags.', tip: 'From the vlogs: La Rambla has the highest concentration of pickpockets in Barcelona, and the Boqueria stalls charge tourist prices. So look, drink the juice, and move on.' },
        d4b5: { title: 'Euromed to València', desc: 'Collect the bags, then take the Euromed train from Barcelona Sants to València Nord, about three hours down the Mediterranean coast. Sit on the left-hand side of the carriage: that side has the sea views for most of the ride.' },
        d4b6: { title: 'Turia Gardens hello-walk', desc: 'The Turia is a nine-kilometre park laid in an old riverbed that curls around the city centre; the river itself was diverted after a flood in 1957. Walk a first stretch of it, as far as the Gulliver playground (a giant climbable Gulliver figure) and back.', tip: 'From the vlogs: the Turia is best explored by bike. If tonight’s walk wins you over, rent a pair on Thursday morning and ride to the City of Arts.' },
        d4b7: { title: 'Dinner in Russafa', desc: 'Dinner in Russafa, the neighbourhood the vlogs call València’s liveliest: bars, terraces and restaurants that fill up from nine onwards. Order agua de València, the local cocktail of cava, orange juice, gin and vodka. It arrives by the jug; one jug between two is the rule.' },
        d5b1: { title: 'Mercat Central, early', desc: 'Start at the Central Market, one of the largest and prettiest iron-and-glass market halls in Europe, with nearly a thousand stalls. Breakfast at the counter: horchata, the local tiger-nut drink, with fartons, soft sugared pastries made for dunking. Buy jamón and manchego for later.', tip: 'From the vlogs: this was the single most-filmed stop across every València vlog we mined. It closes at three and is shut on Sundays, which is why it opens the day.' },
        d5b2: { title: 'La Lonja de la Seda', desc: 'Across the street stands La Lonja de la Seda, the fifteenth-century silk exchange and a UNESCO World Heritage site. Its main hall is a room of tall Gothic columns twisted like rope. Entry costs two euros.', tip: 'Izem’s pick: stand in the Sala de Contratación, the main trading hall, and give it a proper quarter of an hour.' },
        d5b3: { title: 'Cathedral + El Miguelete', desc: 'València cathedral, a five-minute walk away, claims to keep the Holy Grail in one of its side chapels. Climb the 207 steps of El Miguelete, its bell tower, and you get the whole city in one slow turn at the top.' },
        d5b4: { title: 'Menú del día, old town', desc: 'Lunch is a menú del día: the fixed-price weekday menu that nearly every Spanish restaurant serves, three courses plus a drink for around fifteen euros. It is the best-value meal in the country.', tip: 'From the vlogs: one creator called the menú del día the best thing about Spain, full stop. Look for the handwritten chalkboard outside, not the laminated tourist menu.' },
        d5b5: { title: 'Malva-rosa beach', desc: 'In the late afternoon, once the sun has softened, head to Malva-rosa, the city beach: a 1.50 € bus ride or a ten-euro taxi from the centre. The sand is wide and flat and the water is around 27 °C, warm enough to stay in as long as you like.' },
        d5b6: { title: 'Serranos Towers, golden hour', desc: 'Back in town for golden hour, climb the Serranos Towers, the huge medieval gate that once guarded the city walls. From the top, the light turns honey-coloured over the old riverbed park below.' },
        d5b7: { title: 'Dinner in El Carmen', desc: 'Dinner in El Carmen, the oldest quarter of the old town, where the medieval lanes are covered in street art and the tapas tables spill out onto the pavement.', tip: 'From the vlogs (the comment sections, actually): viewers kept recommending bunyols, fried pumpkin fritters dipped in thick hot chocolate. Field-tested local knowledge.' },
        d6b1: { title: 'City of Arts & Sciences', desc: 'Morning at the City of Arts and Sciences, Calatrava’s complex of white futuristic buildings set in the Turia park: the eye-shaped Hemisfèric, the ribbed Science Museum, and the Umbracle palm walk. Come early: the white buildings look their best in morning light, and the shade runs out by eleven. Go by bike if Tuesday’s walk converted you.' },
        d6b2: { title: 'Oceanogràfic', desc: 'Next door is the Oceanogràfic, the biggest aquarium in Europe, laid out as a walk through the world’s oceans: an underwater shark tunnel, beluga whales, and a darkened room of slowly drifting jellyfish.', tip: 'From the vlogs: about €32 at the door, cheaper and queue-free if booked online. The jellyfish room doubles as air conditioning at noon.' },
        d6b3: { title: 'Paella at its birthplace', desc: 'Take bus 24 or 25 south through the rice paddies to El Palmar, the lagoon village where paella was invented. Order paella valenciana, the original recipe with rabbit, chicken and beans, or all i pebre, the local eel stew, if you are feeling brave.', tip: 'From the vlogs: paella is a lunch dish. It takes about 25 minutes because it is cooked fresh, and it is ordered for two people minimum. At two o’clock in El Palmar you are doing all of it exactly right.' },
        d6b4: { title: 'Albufera lagoon boat', desc: 'From the village jetty, a flat-bottomed wooden boat called an albuferenc takes you out across the Albufera lagoon, gliding through reed beds and past the rice fields that supply half of Spain. The trip takes about 45 minutes.' },
        d6b5: { title: 'Albufera sunset', desc: 'The Albufera sunset is the one locals drive out of the city to watch: the sky turns orange over the flat water of the lagoon. Stay on the jetty until the last of the colour is gone, then catch the bus back.' },
        d7b1: { title: 'Last loop of the Turia', desc: 'One last easy walk through the Turia park, under Calatrava’s white bridges. Stop at a bakery on the way back and buy a box of fartons, knowing full well they will not survive the flight home.' },
        d7b2: { title: 'Fly València → East Midlands', desc: 'The metro runs from the city centre to València airport in about 25 minutes. Land at East Midlands, taxi back to Wigston, and have the kettle on by six.' }
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
        heroText: 'Izem mimari için burada, Ahmet horchata için. Barcelona’da üç gün Gaudí, Montserrat ve akşam denize girmeler; sonra València’da pazarlar, Calatrava ve lagünde gün batımları. Ağustos usulü, doğrudan vloglardan planlandı: erken çık, öğlen gölgeye geç, dokuzdan sonra hayat başlar. Yaptıkça işaretle, sayfa unutmaz.',
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
        izemDesc: 'Mimar. Gaudí ve Calatrava günleri ona göre planlandı.',
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
        d1b1: { title: 'EMA → Barcelona uçuşu', desc: '07:30’da Wigston’dan taksiyle çıkış; East Midlands havalimanı M1 üzerinden yaklaşık 45 dakika. Uçak 10:35’te kalkıyor, yerel saatle 13:55’te Barcelona’ya iniyor. Herkese birer kabin çantası; bekleyecek valiz yok.' },
        d1b2: { title: 'Havalimanı treni + yerleşme', desc: 'Havalimanından R2 Nord treni (yarım saatte bir kalkıyor) doğruca Passeig de Gràcia istasyonuna götürüyor. Oradan Eixample semtindeki daireye on dakikalık yürüyüş. Çantaları bırak, soğuk bir duş al; sıcak gevşemeye başladığında, altı gibi, yeniden dışarı çık.', tip: 'Vloglardan: ağustosta havalimanı treni otobüs kuyruğundan daha hızlı, bileti de beş euro civarı.' },
        d1b3: { title: 'Gotik Mahalle’de ilk tur', desc: 'Ortaçağdan kalma eski şehirde ilk rahat yürüyüş. On üç kazın yaşadığı katedral avlusunu ve küçük, sessiz Plaça Sant Felip Neri meydanını gör; yürüyüşü Plaça Reial’in süslü sokak lambaları altında bitir.', tip: 'Izem: Plaça Reial’deki lambalar Gaudí’nin aldığı ilk sipariş; henüz öğrenciyken tasarlamış.' },
        d1b4: { title: 'Tapas turu, Carrer de la Mercè', desc: 'Akşam yemeği, küçük ayakta tapas barlarıyla dolu Carrer de la Mercè boyunca bar bar gezerek. Her birinde patatas bravas, pan con tomate (domates ve zeytinyağı sürülmüş kızarmış ekmek) ve birer bardak vermut söyle, sonra bir sonrakine geç.', tip: 'Vloglardan: yerliler dokuzdan önce sofraya oturmaz; eski şehir sokakları da bilinen yankesici bölgesi. Telefonlar fermuarlı cepte, çantalar önde.' },
        d2b1: { title: 'Sagrada Família', desc: 'Gaudí’nin bazilikası, günün ilk giriş seansına ayırtıldı; kalabalık ve öğle güneşi gelmeden içeride oluyorsunuz. Önce dışarıdan Doğuş Cephesi’ne bak, sonra içeride taştan sütun ormanına ve kilisenin bir yanında turuncu, öbür yanında mavi-yeşil parlayan vitray pencerelere.', tip: 'Izem: bilete Tutku Kulesi’ni de ekle. Asansörle çıkıyorsun, sarmal merdivenle iniyorsun; kuleler arasından bütün şehir görünüyor.' },
        d2b2: { title: 'Uzun gölgeli öğle yemeği, Eixample', desc: 'Dönüş yolunda Casa Milà’nın (La Pedrera) karşısında dur ve dalga biçimli taş cephesine bak. Sonra yerlilerin ağustos kuralı: şehir en sıcak saatlerindeyken klimalı bir yerde uzun, yavaş bir öğle yemeği. Beşten önce kimse dışarı çıkmaz.' },
        d2b3: { title: 'Park Güell', desc: 'Gaudí’nin tepedeki parkı: girişteki mozaik semender, kırık çini kaplı ve arkasında bütün şehrin uzandığı dalgalı bank, bir yolu eğik taş sütunlarla sırtlayan galeri. Giriş saatli biletle; seansa geç kalma.', tip: 'Vloglardan: ağustosta ya sabah erken ya akşam git, asla öğlen ortası değil. Meşhur bank batıya bakıyor; güzel ışık akşam ışığı. Metro L4, sonra tepeye çıkan açık hava yürüyen merdivenleri.' },
        d2b4: { title: 'Casa Batlló Sihirli Geceler', desc: 'Casa Batlló’nun yaz akşamı etkinliği: alacakaranlıkta ejderha temalı evin tamamını geziyorsunuz; final, pul pul çatı terasında, bacaların altında canlı konser ve birer içecek.', tip: 'Ahmet: evet, içecek bilete dahil.' },
        d3b1: { title: 'R5 treni + dişli trenle yukarı', desc: 'Plaça d’Espanya istasyonundan Manresa yönüne giden R5 trenine bin, Monistrol de Montserrat’ta in. Oradan cremallera denen dişli tren, kayalıkları tırmanıp manastıra çıkarıyor. Kapıdan dağa yaklaşık bir saat çeyrek.', tip: 'Vloglardan: gidiş dönüş 24 € civarı. Binebildiğin en erken trene bin; hem tur otobüslerini hem sıcağı yener.' },
        d3b2: { title: 'Montserrat manastırı + sırt yürüyüşü', desc: 'Montserrat, Barcelona’ya bir saat mesafede, testere dişli bir kaya duvarına kurulmuş Benedikten manastırı. Bazilikayı ve Kara Madonna heykelini gör, sonra Sant Joan füniküleriyle sırt patikasına çık: bütün Katalonya ayaklarının altında. Yanına su ve piknik için bir şeyler al.', tip: 'Vloglardan: üç ayrı vlogcu buna Barcelona civarında yaptıkları en iyi şey dedi ve hepsinin tavsiyesi aynıydı: on bir civarında gelen tur otobüslerinden önce orada ol.' },
        d3b3: { title: 'Barceloneta’da akşam yüzmesi', desc: 'Şehre dönünce Barceloneta plajında akşam yüzmesi için yerlilere katıl. Ağustosta deniz 26 °C civarı; altıdan sonra kum serinlemiş, ışık altına dönmüş oluyor. Çıkışta sahil yolundan bir granizado (buz kırığı içecek) al.', tip: 'Vloglardan: ikiniz birden sudayken telefon ve cüzdanı asla havluda bırakmayın. Sırayla yüzün.' },
        d3b4: { title: 'Akşam yemeği: Can Solé', desc: 'Akşam yemeği Can Solé’de: kumsalın iki sokak gerisinde, 1903’ten beri açık bir deniz ürünleri lokantası. Arròs negre söyle: mürekkep balığı mürekkebiyle simsiyah pişen pilav; tadı göründüğünden çok daha yumuşak.', tip: 'Vloglardan: İspanyollar paellayı yalnızca öğlen yer; bu akşamki, mürekkepli kuzeni. Gerçek paella perşembe günü saat ikide, icat edildiği lagünün kıyısında.' },
        d4b1: { title: 'Kahvaltı, Mercat de Santa Caterina', desc: 'Kahvaltı Santa Caterina pazarında: El Born semtinin kıyısında, rengârenk dalgalı çatısıyla tanınan kapalı hal. Tezgâh barında ayakta kahve, meyve ve bir tabak jamón.', tip: 'Vloglardan: ünlü La Boqueria ile aynı ürünler, ama turist izdihamı ve turist fiyatları yok. Bir vlogcu videosunun koca bir bölümüne “La Boqueria’dan DAHA İYİ bir pazar” adını verdi; kastettiği burasıydı.' },
        d4b2: { title: 'Santa Maria del Mar + Born sokakları', desc: 'İki dakika ötede denizcilerin bazilikası Santa Maria del Mar var. Dışarıdan sade görünüyor; içeriye girince tek, dev, çıplak bir taş salon; birçok kişinin şehirdeki en sevdiği kilise. Sonra El Born’un dar ortaçağ sokaklarından Picasso müzesine yürü.' },
        d4b3: { title: 'Museu Picasso', desc: 'Picasso müzesi birbirine bağlı beş Gotik sarayı dolduruyor ve erken dönem işlerine odaklanıyor; salon salon, resim yapmayı öğrenişini izliyorsun. Final, yetmiş altı yaşında yaptığı Las Meninas çeşitlemeleri odası.', tip: 'Ahmet: öğrenci kartını getir, girişte indirim yaptırıyor.' },
        d4b4: { title: 'La Rambla, bir kez, hızlıca', desc: 'Meşhur ağaçlı bulvar La Rambla’yı, şovu için tam bir kez yürü. La Boqueria pazarına girip bir taze meyve suyu al; çantaları almaya vakit kalsın diye saat birde işini bitir.', tip: 'Vloglardan: La Rambla, Barcelona’nın en yoğun yankesici noktası; Boqueria tezgâhları da turist fiyatı yazıyor. Bak, suyunu iç, yola devam et.' },
        d4b5: { title: 'Euromed ile València’ya', desc: 'Çantaları al, Barcelona Sants’tan València Nord’a giden Euromed trenine bin; Akdeniz kıyısı boyunca yaklaşık üç saat. Vagonun sol tarafına otur: yolun büyük kısmında deniz manzarası o tarafta.' },
        d4b6: { title: 'Turia Bahçeleri’ne merhaba yürüyüşü', desc: 'Turia, şehir merkezini dolanan eski nehir yatağına kurulmuş dokuz kilometrelik bir park; nehrin kendisi 1957’deki selden sonra başka yatağa alınmış. İlk etabı yürü: tırmanılabilen dev Gulliver figürlü oyun parkına kadar gidip dön.', tip: 'Vloglardan: Turia en güzel bisikletle gezilir. Bu akşamki yürüyüş seni kazanırsa perşembe sabahı iki bisiklet kiralayıp Sanat Şehri’ne kadar sür.' },
        d4b7: { title: 'Akşam yemeği: Russafa', desc: 'Akşam yemeği Russafa’da; vlogların València’nın en hareketli mahallesi dediği semt: dokuzdan itibaren dolan barlar, teraslar ve lokantalar. Agua de València söyle: cava, portakal suyu, cin ve votkayla yapılan yerel kokteyl. Sürahiyle geliyor; iki kişiye bir sürahi, kural bu.' },
        d5b1: { title: 'Mercat Central, erkenden', desc: 'Güne Merkez Pazarı’nda başla: Avrupa’nın en büyük ve en güzel demir-cam hallerinden biri, bine yakın tezgâh. Kahvaltı tezgâhta: yer bademinden yapılan yerel içecek horchata ve yanında, batırmak için yapılmış yumuşak şekerli çörekler fartons. Sonrası için jamón ve manchego al.', tip: 'Vloglardan: taradığımız her València vlogunun en çok çekilen durağı burasıydı. Üçte kapanıyor, pazar günleri hiç açılmıyor; güne bu yüzden pazarla başlıyoruz.' },
        d5b2: { title: 'La Lonja de la Seda', desc: 'Caddenin karşısında on beşinci yüzyıldan kalma ipek borsası La Lonja de la Seda duruyor; UNESCO Dünya Mirası listesinde. Ana salonu, halat gibi burulmuş uzun Gotik sütunlarla dolu bir oda. Giriş iki euro.', tip: 'Izem’in seçimi: ana ticaret salonu Sala de Contratación’da dur ve ona hakkını vererek bir çeyrek saat ayır.' },
        d5b3: { title: 'Katedral + El Miguelete', desc: 'Beş dakika yürüme mesafesindeki València katedrali, yan şapellerinden birinde Kutsal Kâse’yi sakladığını iddia ediyor. Çan kulesi El Miguelete’nin 207 basamağını tırman; tepede tek bir yavaş dönüşle bütün şehri görüyorsun.' },
        d5b4: { title: 'Menú del día, eski şehir', desc: 'Öğle yemeği bir menú del día: İspanya’da neredeyse her lokantanın hafta içi sunduğu sabit fiyatlı menü; üç tabak artı içecek, aşağı yukarı on beş euro. Ülkedeki en hesaplı yemek.', tip: 'Vloglardan: bir vlogcu menú del día için “İspanya’nın en iyi şeyi, nokta” dedi. Dışarıdaki el yazısı kara tahtayı ara, lamine turist menüsünü değil.' },
        d5b5: { title: 'Malva-rosa plajı', desc: 'Öğleden sonra güneş yumuşayınca şehir plajı Malva-rosa’ya geç: merkezden 1,50 €’luk otobüs ya da on euroluk taksi. Kum geniş ve düz, su 27 °C civarı; istediğin kadar içinde kalabileceğin sıcaklıkta.' },
        d5b6: { title: 'Serranos Kuleleri, altın saat', desc: 'Altın saat için şehre dön ve bir zamanlar surları koruyan dev ortaçağ kapısı Serranos Kuleleri’ne tırman. Tepeden bakınca ışık, aşağıdaki eski nehir yatağı parkının üzerinde bal rengine dönüyor.' },
        d5b7: { title: 'Akşam yemeği: El Carmen', desc: 'Akşam yemeği El Carmen’de, eski şehrin en eski köşesi: ortaçağ sokakları grafitiyle kaplı, tapas masaları kaldırıma taşmış.', tip: 'Vloglardan (aslında yorum bölümlerinden): izleyiciler ısrarla bunyols önerdi; koyu sıcak çikolataya batırılan kızarmış balkabağı lokması. Sahada denenmiş yerel bilgi.' },
        d6b1: { title: 'Sanat ve Bilim Şehri', desc: 'Sabah Sanat ve Bilim Şehri’nde: Calatrava’nın Turia parkına kurulu beyaz fütürist yapılar kompleksi; göz biçimli Hemisfèric, kaburgalı Bilim Müzesi ve palmiyeli Umbracle yolu. Erken gel: beyaz yapılar en iyi sabah ışığında görünüyor ve on birden sonra gölge kalmıyor. Salı günkü yürüyüş seni ikna ettiyse bisikletle git.' },
        d6b2: { title: 'Oceanogràfic', desc: 'Hemen yanında Avrupa’nın en büyük akvaryumu Oceanogràfic var; dünya okyanuslarında bir yürüyüş gibi kurgulanmış: su altında köpekbalığı tüneli, beluga balinaları ve yavaşça süzülen denizanalarıyla dolu karanlık bir oda.', tip: 'Vloglardan: kapıda 32 € civarı; internetten alınca hem daha ucuz hem kuyruksuz. Denizanası odası öğlen ayrıca klima görevi görüyor.' },
        d6b3: { title: 'Paella, doğduğu yerde', desc: 'Şehirden 24 ya da 25 numaralı otobüsle çeltik tarlalarının arasından güneye, paellanın icat edildiği lagün köyü El Palmar’a in. Orijinal tarif paella valenciana’yı söyle (tavşanlı, tavuklu, fasulyeli); cesaretin varsa yerel yılan balığı yahnisi all i pebre.', tip: 'Vloglardan: paella bir öğle yemeğidir. Taze piştiği için 25 dakika sürer ve en az iki kişilik söylenir. Saat ikide El Palmar’daysan hepsini tam doğru yapıyorsun.' },
        d6b4: { title: 'Albufera lagün teknesi', desc: 'Köy iskelesinden albuferenc denen düz tabanlı ahşap tekne seni Albufera lagününe açıyor; sazlıkların içinden, İspanya’nın pirincinin yarısını yetiştiren tarlaların yanından süzülüyorsunuz. Tur yaklaşık 45 dakika.' },
        d6b5: { title: 'Albufera gün batımı', desc: 'Albufera gün batımı, yerlilerin izlemek için şehirden arabayla geldiği şov: gökyüzü lagünün düz suyunun üzerinde turuncuya dönüyor. Renk tamamen kaybolana dek iskelede kal, sonra otobüsle dön.' },
        d7b1: { title: 'Turia’da son tur', desc: 'Turia parkında, Calatrava’nın beyaz köprülerinin altından son bir rahat yürüyüş. Dönüşte bir fırına uğrayıp bir kutu fartons al; uçuşu sağ atlatamayacaklarını bile bile.' },
        d7b2: { title: 'València → East Midlands uçuşu', desc: 'Metro, şehir merkezinden València havalimanına yaklaşık 25 dakikada gidiyor. East Midlands’a iniş, Wigston’a taksi, altıda çaydanlık ocakta.' }
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
