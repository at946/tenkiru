import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import HandCard from '@/app/[locale]/rooms/[roomId]/components/hands/HandCard';
import Decks from '@/data/deck';
import type { IFDeck } from '@/interfaces/deck';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

interface Props {
  deckType: IFDeckType;
  selectedValue: IFTableCardValue;
  isDisabled?: boolean;
}

const Hands: NextPage<Props> = ({ deckType, selectedValue, isDisabled }) => {
  const t = useTranslations('Room.Hands');
  const deck: IFDeck | undefined = Decks.find((deck: IFDeck) => deck.key === deckType);

  return (
    <fieldset>
      <legend className='sr-only'>{t('Hands')}</legend>
      <div className='mt-10 flex flex-wrap justify-center gap-3'>
        {deck?.cardValues.map((value: IFHandsCardValue) => {
          return <HandCard key={value} value={value} selected={value === selectedValue} disabled={isDisabled} />;
        })}
      </div>
    </fieldset>
  );
};

export default Hands;
