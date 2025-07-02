import clsx from 'clsx';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false }) => {
  const t = useTranslations('Room.Table');

  const isBlank: boolean = value === null;

  return (
    <button
      type='button'
      className={clsx(
        'flex aspect-card w-24 items-center justify-center rounded-md border-2 border-text font-bold text-2xl shadow-md',
        isBlank && 'border-dashed',
        !isBlank && !isOpen && 'bg-secondary',
        !isBlank && isOpen && 'bg-background text-text transition-all duration-1000 ease-out',
      )}
      style={!isBlank && !isOpen ? { transform: 'rotateY(-180deg)' } : {}}
      aria-label={
        isBlank
          ? t('Unselected table card')
          : isOpen
            ? `${t('Face-up table card')} ${value}`
            : t('Face-down table card')
      }
    >
      {isOpen && value}
    </button>
  );
};

export default TableCard;
