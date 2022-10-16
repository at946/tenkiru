import { NextPage } from 'next';
import React from 'react';
import Decks from '../data/deck';
import { Deck } from '../interfaces/deck';
import { DeckType } from '../interfaces/deckType';

interface Props {
  deckType: DeckType;
  select: (deckType: DeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ deckType, select }) => {
  const change: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
    select(e.target.value as DeckType);
  };

  return (
    <div className='select is-primary is-rounded mb-2'>
      <select data-testid='deckSelect' value={deckType} onChange={change}>
        {Decks.map((deck: Deck) => (
          <option key={deck.key} value={deck.key}>{ deck.displayName }</option>
        ))}
      </select>
    </div>
  );
};

export default DeckSelect;
