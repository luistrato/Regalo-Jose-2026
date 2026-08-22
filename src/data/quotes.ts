import { QuoteModalData } from '../types';

export const SIMPSONS_QUOTES: Omit<QuoteModalData, 'isOpen'>[] = [
  {
    character: 'Homer',
    quote: 'Mmmmm, el país de la chocolata',
    source: 'Los Simpson (España)',
    emoji: '🍩',
    soundType: 'homer',
  },
  {
    character: 'Homer',
    quote: 'A la grande le llamo Mordiscos.',
    source: 'Los Simpson (España)',
    emoji: '🐀',
    soundType: 'homer',
  },
  {
    character: 'Homer',
    quote: 'Ohh Mírame Marge, estoy haciendo feliz a la gente.',
    source: 'Los Simpson (España)',
    emoji: '🙏',
    soundType: 'homer',
  },
  {
    character: 'Bart',
    quote: '¡Multiplícate por cero!',
    source: 'Los Simpson (España)',
    emoji: '🛹',
    soundType: 'buzz',
  },
  {
    character: 'Flanders',
    quote: '¡Estúpido y sensual Flanders! ¡Hola, holita, vecinito!',
    source: 'Los Simpson (España)',
    emoji: '⛷️',
    soundType: 'buzz',
  },
  {
    character: 'Homer',
    quote: '¡Cállaos hipoglúcidos!',
    source: 'Los Simpson (España)',
    emoji: '🧠',
    soundType: 'homer',
  },
  {
    character: 'Homer',
    quote: 'Sin tele y sin cerveza Homer pierde la cabeza...',
    source: 'Los Simpson (España)',
    emoji: '🍺',
    soundType: 'klaxon',
  },
  {
    character: 'Homer',
    quote: 'Era mi primerito día',
    source: 'Los Simpson (España)',
    emoji: '📞',
    soundType: 'buzz',
  },
  {
    character: 'Homer',
    quote: '¡Nucelar! La palabra es nu-ce-lar.',
    source: 'Los Simpson (España)',
    emoji: '☢️',
    soundType: 'homer',
  },
  {
    character: 'Burns',
    quote: '¡Excelente...! Smithers, suelte a los perros.',
    source: 'Los Simpson (España)',
    emoji: '🐕',
    soundType: 'buzz',
  },
  {
    character: 'Homer',
    quote: 'Me duele el bolsillo.',
    source: 'Los Simpson (España)',
    emoji: '🧖‍♂️',
    soundType: 'homer',
  },
];

export const SEINFELD_QUOTES: Omit<QuoteModalData, 'isOpen'>[] = [
  {
    character: 'George',
    quote: '¡Serenidad!',
    source: 'Seinfeld',
    emoji: '👓',
    soundType: 'serenity',
  },
  {
    character: 'SoupNazi',
    quote: '¡Se queda sin sopa!)',
    source: 'Seinfeld',
    emoji: '🍲',
    soundType: 'buzz',
  },
  {
    character: 'George',
    quote: '¿Art Vandelay? Importador y exportador de látex',
    source: 'Seinfeld',
    emoji: '💼',
    soundType: 'click',
  },
  {
    character: 'George',
    quote: '¡Estas galletitas me están dando una sed!',
    source: 'Seinfeld',
    emoji: '🥨',
    soundType: 'serenity',
  },
  {
    character: 'Kramer',
    quote: '¡Festivus for the rest of us! ¡Es un milagro del Festivus!',
    source: 'Seinfeld',
    emoji: '💈',
    soundType: 'chime',
  },
  {
    character: 'George',
    quote: 'Bla bla bla y olé',
    source: 'Seinfeld',
    emoji: '🗣️',
    soundType: 'click',
  },
  {
    character: 'George',
    quote: '¡Twiiiiiiiixxx!',
    source: 'Seinfeld',
    emoji: '🌊',
    soundType: 'serenity',
  },
  {
    character: 'Kramer',
    quote: 'Sé como darle a esos botones macho',
    source: 'Seinfeld',
    emoji: '🎗️',
    soundType: 'buzz',
  },
];

export function getRandomQuote(): Omit<QuoteModalData, 'isOpen'> {
  const all = [...SIMPSONS_QUOTES, ...SEINFELD_QUOTES];
  const idx = Math.floor(Math.random() * all.length);
  return all[idx];
}
