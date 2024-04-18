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
        'flex aspect-card w-24 items-center justify-center rounded-md border-2 border-text text-2xl font-bold shadow',
        'enabled:focus-visible:shadow-2xl disabled:cursor-not-allowed',
        'md:enabled:hover:-translate-y-2 md:enabled:hover:shadow-2xl md:enabled:focus-visible:-translate-y-2',
        isSelected
          ? 'bg-primary text-dark-text'
          : 'bg-background text-text disabled:opacity-25 disabled:dark:opacity-50',
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
