import { IFHandsCardValue } from '@/interfaces/handsCardValue';
import { IFTableCardValue } from '@/interfaces/tableCardValue';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface Props {
  value: IFHandsCardValue;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (value: IFTableCardValue) => void;
}

const HandsCard: NextPage<Props> = ({ value, isSelected, isDisabled, onClick }) => {
  const t = useTranslations('Room.Hands');

  const onClickHandler = () => {
    if (isDisabled) return;
    onClick(isSelected ? null : value);
  };

  return (
    <button
      onClick={onClickHandler}
      className={clsx(
        'flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 text-2xl font-bold shadow enabled:focus:shadow-2xl disabled:cursor-not-allowed md:enabled:hover:-translate-y-2 md:enabled:hover:shadow-2xl md:enabled:focus:-translate-y-2',
        isSelected ? 'bg-rose-500 text-white' : 'bg-white text-slate-900 disabled:opacity-50',
      )}
      disabled={isDisabled}
      role='option'
      aria-label={t('Hands card')}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
    >
      {value}
    </button>
  );
};

export default HandsCard;
