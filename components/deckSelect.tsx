import { NextPage } from 'next';
import React from 'react';
import { DeckType } from '../interfaces/card';

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
        <option value='fibonacci'>
          Fibonacci
        </option>
        <option value='sequential'>
          1 to 10
        </option>
      </select>
    </div>
  );
};

export default DeckSelect;
