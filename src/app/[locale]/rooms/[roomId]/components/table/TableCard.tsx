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
    <div className='relative aspect-card w-24'>
      <div
        className='absolute inset-0 rounded-md border-2 border-dashed border-text'
        aria-hidden='true'
        aria-label={isBlank && t('Unselected table card')}
      />

      {!isBlank && (
        <button
          type='button'
          className={clsx(
            'absolute inset-0 flex aspect-card w-24 items-center justify-center rounded-md border-2 border-text font-bold text-2xl shadow-md',
            !isOpen && 'bg-secondary',
            isOpen && 'bg-background text-text transition-all duration-1000 ease-out',
          )}
          style={!isBlank && !isOpen ? { transform: 'rotateY(-180deg)' } : {}}
          aria-label={
            isOpen
              ? `${t('Face-up table card')} ${value}`
              : t('Face-down table card')
          }
        >
          {isOpen && value}
        </button>
      )}
    </div>
  );
};

export default TableCard;
