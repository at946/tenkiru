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
    <div
      className='relative aspect-card w-24'
      role='img'
      aria-label={
        isBlank
          ? t('Unselected table card')
          : isOpen
            ? `${t('Face-up table card')} ${value}`
            : t('Face-down table card')
      }
    >
      <div className='absolute inset-0 rounded-md border-2 border-text border-dashed' aria-hidden='true' />

      {!isBlank && (
        <div
          className={clsx(
            'absolute inset-0 flex aspect-card w-24 items-center justify-center rounded-md border-2 border-text font-bold text-2xl shadow-md',
            !isOpen && 'bg-secondary',
            isOpen && 'bg-background text-text transition-all duration-1000 ease-out',
          )}
          style={!isBlank && !isOpen ? { transform: 'rotateY(-180deg)' } : {}}
          aria-hidden='true'
        >
          {isOpen && value}
        </div>
      )}
    </div>
  );
};

export default TableCard;
