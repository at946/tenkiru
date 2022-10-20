import { faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NextPage } from 'next';
import React from 'react';
import Decks from '../../../data/deck';
import { Deck } from '../../../interfaces/deck';
import { DeckType } from '../../../interfaces/deckType';
import { useAppSelector } from '../../../store/hooks';

interface Props {
  select: (deckType: DeckType) => void;
}

const DeckSelect: NextPage<Props> = ({ select }) => {
  const deckType: DeckType = useAppSelector((state) => state.room.deckType);

  const change: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
    select(e.target.value as DeckType);
  };

  return (
    <div className="is-flex is-justify-content-center is-align-items-center mb-2">
      <div className='select is-primary is-rounded'>
        <select data-testid='deckSelect' value={deckType} onChange={change}>
          {Decks.map((deck: Deck) => (
            <option key={deck.key} value={deck.key}>
              {deck.displayName}
            </option>
          ))}
        </select>
      </div>
      { deckType === 'custom' && (
        <button className="button is-rounded is-inverted is-primary ml-2" data-testid="customDeckSettingIcon">
          <FontAwesomeIcon icon={faScrewdriverWrench} />
        </button>
      )}
    </div>
  );
};

export default DeckSelect;
