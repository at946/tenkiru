import { NextPage } from 'next';
import { Card } from '../../../interfaces/card';
import { Member } from '../../../interfaces/member';
import { useAppSelector } from '../../../store/hooks';
import SummaryTag from './summaryTag';

const SummaryTags: NextPage = () => {
  const members: Member[] = useAppSelector(state => state.members.members)
  const players: Member[] = members.filter(v => v.type === 'player')
  const cards: Card[] = players.map(v => v.selectedCard)
  const numberCards: number[] = cards.filter<number>((v): v is number => typeof v === 'number')
  const minCard: number = Math.min(...numberCards);
  const maxCard: number = Math.max(...numberCards);
  const avgValue: number =
    Math.round((numberCards.reduce((a, b) => a + b, 0) / numberCards.length) * 10) / 10;
  
  const cardsAreOpen = useAppSelector(state => state.room.cardsAreOpen)
  const isVisible = cardsAreOpen && numberCards.length > 0

  return (
    <div>
      {
        isVisible && (
          <div className='field is-grouped is-grouped-multiline is-grouped-centered'>
            <SummaryTag name='Min' value={minCard} testid='min' />
            <SummaryTag name='Avg' value={avgValue} testid='avg' />
            <SummaryTag name='Max' value={maxCard} testid='max' />
          </div>
        )
      }
    </div>
  );
};

export default SummaryTags;
