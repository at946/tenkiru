import { NextPage } from 'next';
import DeckSelect from './deckSelect';
import TefudaCards from './tefudaCards';
import { Card } from '../../../interfaces/card';
import { DeckType } from '../../../interfaces/deckType';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';

interface Props {
  deckType: DeckType;
  canSelected: boolean;
  putDownCard: (card: Card) => void;
  changeDeckType: (newDeckType: DeckType) => void;
}

const Tefuda: NextPage<Props> = ({
  deckType,
  canSelected,
  putDownCard,
  changeDeckType,
}) => {
  const type = useAppSelector(state => state.user.type)

  const selectCard = (card: Card): void => {
    putDownCard(card);
  };

  return (
    <div className='box has-background-warning is-shadowless'>
      <DeckSelect deckType={deckType} select={changeDeckType} />
      <TefudaCards
        deckType={deckType}
        canSelected={canSelected && type === 'player'}
        select={selectCard}
      />
    </div>
  );
};

export default Tefuda;
