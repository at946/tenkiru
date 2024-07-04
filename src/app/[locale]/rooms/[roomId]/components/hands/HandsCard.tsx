import type { IFHandsCardValue } from '@/interfaces/handsCardValue';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import clsx from 'clsx';
import type { NextPage } from 'next';
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
      type='button'
      role='option'
      disabled={isDisabled}
      aria-label={t('Hands card')}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      className={clsx(
        'flex aspect-card w-24 items-center justify-center rounded-md border-2 border-text font-bold text-2xl shadow',
        'enabled:focus-visible:shadow-2xl disabled:cursor-not-allowed',
        'md:enabled:hover:-translate-y-2 md:enabled:focus-visible:-translate-y-2 md:enabled:hover:shadow-2xl',
        isSelected
          ? 'bg-primary text-dark-text'
          : 'bg-background text-text disabled:opacity-25 disabled:dark:opacity-50',
      )}
      onClick={onClickHandler}
    >
      {value}
    </button>
  );
};

export default HandsCard;
