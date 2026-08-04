/* España · the Çelik plan: Google Maps links for place references in prose.
   One dictionary serves the whole site: the field guide's curated places
   (guide-data.js supplies name and search query) plus aliases for the
   spellings the itinerary text actually uses — Turkish included, since place
   names are proper nouns in both languages. Consumers call
   PlaceLinks.split(text) and turn the {text, href} parts into anchors with
   their own styling; PlaceLinks.url(query) builds a bare maps link. */
window.PlaceLinks = (() => {
  'use strict';

  const url = q => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);

  // What the prose calls a place when the guide calls it something else.
  // These override the guide on a name clash, so the itinerary's wording wins.
  const ALIASES = {
    'Plaça Sant Felip Neri': 'Plaça de Sant Felip Neri, Barcelona',
    'Santa Maria del Mar': 'Basílica de Santa Maria del Mar, Barcelona',
    'Santa Caterina': 'Mercat de Santa Caterina, Barcelona',
    'La Boqueria': 'Mercat de la Boqueria, Barcelona',
    'Boqueria': 'Mercat de la Boqueria, Barcelona',
    'Rambla': 'La Rambla, Barcelona',
    'Gotik Mahalle': 'Gothic Quarter (Barri Gòtic), Barcelona',
    'Eixample': 'Eixample, Barcelona',
    'Sagrada': 'Sagrada Família, Barcelona',
    'Park Güell': 'Park Güell, Barcelona',
    'Monistrol de Montserrat': 'Monistrol de Montserrat',
    'Barcelona Sants': 'Barcelona Sants railway station',
    'València Nord': 'Estació del Nord, València',
    'Joaquín Sorolla': 'Estació Joaquín Sorolla, València',
    'Turia': 'Túria Gardens, València',
    'Gulliver': 'Parque Gulliver, València',
    'Merkez Pazarı': 'Mercat Central, València',
    'Central Market': 'Mercat Central, València',
    'El Miguelete': 'El Miguelete, València',
    'Malva-rosa': 'Platja de la Malva-rosa, València',
    'Serranos': 'Torres dels Serrans, València',
    'Sanat ve Bilim Şehri': 'City of Arts and Sciences, València',
    'Sanat Şehri': 'City of Arts and Sciences, València',
    'City of Arts': 'City of Arts and Sciences, València',
    'Science Museum': 'Museu de les Ciències, València',
    'Bilim Müzesi': 'Museu de les Ciències, València',
    'Albufera': 'Albufera Natural Park, València',
    'East Midlands': 'East Midlands Airport',
    'Birmingham': 'Birmingham Airport',
    'Wigston': 'Wigston, Leicestershire'
  };

  // A trip that brings its own place table brings the whole of it: the field
  // guide and the aliases above are España's, and Spanish place names would
  // never match Sicilian prose anyway.
  const trip = window.TRIP && window.TRIP.data;
  const dictionary = (trip && trip.places) || ALIASES;

  const index = new Map();
  const add = (name, q) => { if (name.length >= 4 && !index.has(name)) index.set(name, q); };
  if (!trip) {
    (((window.GUIDE || {}).places) || []).forEach(p => {
      add(p.name, p.q);
      // "Casa Milà (La Pedrera)" is referred to by either half, so match both.
      const m = p.name.match(/^(.+?) \((.+)\)$/);
      if (m) { add(m[1], p.q); add(m[2], p.q); }
    });
  }
  for (const name in dictionary) index.set(name, dictionary[name]);

  // One alternation, longest name first, so "Mercat de Santa Caterina" beats
  // "Santa Caterina" when both could match at the same spot.
  const names = [...index.keys()].sort((a, b) => b.length - a.length);
  const re = names.length
    ? new RegExp(names.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gu')
    : null;
  const letter = ch => !!ch && /[\p{L}\p{N}]/u.test(ch);

  // split('dinner in El Born tonight') →
  //   ['dinner in ', { text: 'El Born', href: '…maps…' }, ' tonight']
  // Case-sensitive, and a hit inside a longer word doesn't count — Turkish
  // suffixes attach with an apostrophe ("El Palmar’da"), which still matches.
  function split(text) {
    text = String(text);
    if (!re || !text) return [text];
    const parts = [];
    let last = 0;
    for (const m of text.matchAll(re)) {
      if (letter(text[m.index - 1]) || letter(text[m.index + m[0].length])) continue;
      if (m.index > last) parts.push(text.slice(last, m.index));
      parts.push({ text: m[0], href: url(index.get(m[0])) });
      last = m.index + m[0].length;
    }
    if (last < text.length) parts.push(text.slice(last));
    return parts;
  }

  return { url, split };
})();
