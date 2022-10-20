import { Deck } from '../interfaces/deck';

const fibonacci: Deck = {
  key: 'fibonacci',
  displayName: 'Fibonacci',
  cards: [1, 2, 3, 5, 8, 13, 21, '?'],
};

const sequential: Deck = {
  key: 'sequential',
  displayName: '1 to 10',
  cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '?'],
};

const tShirtSize: Deck = {
  key: 'tShirtSize',
  displayName: 'T shirt size',
  cards: ['XS', 'S', 'M', 'L', 'XL', '?'],
};

const custom: Deck = {
  key: 'custom',
  displayName: 'Custom',
  cards: [],
};

const Decks: Deck[] = [fibonacci, sequential, tShirtSize, custom];

export default Decks;
