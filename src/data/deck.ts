import { IFDeck } from '../interfaces/deck';

const fibonacci: IFDeck = {
  key: 'fibonacci',
  displayName: 'Fibonacci',
  cardValues: [0, 1, 2, 3, 5, 8, 13, 21, '?'],
};

const sequential: IFDeck = {
  key: 'sequential',
  displayName: '0 - 10',
  cardValues: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '?'],
};

const tShirtSize: IFDeck = {
  key: 'tShirtSize',
  displayName: 'T-Shirt Size',
  cardValues: ['XS', 'S', 'M', 'L', 'XL', '?'],
};

const Decks: IFDeck[] = [fibonacci, sequential, tShirtSize];

export default Decks;
