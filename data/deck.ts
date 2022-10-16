import { Decks } from '../interfaces/decks';

const Decks: Decks = [
  {
    key: 'fibonacci',
    displayName: 'Fibonacci',
    cards: [1, 2, 3, 5, 8, 13, 21, '?'],
  },
  {
    key: 'sequential',
    displayName: '1 to 10',
    cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '?'],
  },
  {
    key: 'tShirtSize',
    displayName: 'T shirt size',
    cards: ['XS', 'S', 'M', 'L', 'XL', '?'],
  },
];

export default Decks;
