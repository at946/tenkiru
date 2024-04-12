import { IFTableCardValue } from '@/interfaces/tableCardValue';
import clsx from 'clsx';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen = false }) => {
  const t = useTranslations('Room.Table');

  const isBlank: boolean = value === null;

  return (
    <div
      className={clsx(
        'flex aspect-card w-24 items-center justify-center rounded-md border-2 border-text text-2xl font-bold shadow-md',
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
    </div>
  );
};

export default TableCard;
