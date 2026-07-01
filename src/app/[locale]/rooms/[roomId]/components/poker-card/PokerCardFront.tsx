import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';

type Props = ComponentPropsWithoutRef<'div'> & {
  value: IFTableCardValue;
};

const PokerCardFront = ({ value, className, ...props }: Props) => {
  const t = useTranslations('Room.Table');

  return (
    <div
      role='img'
      {...props}
      className={clsx(
        'relative flex aspect-card items-center justify-center rounded-xl border-2 border-white/40 bg-white shadow-lg',
        className,
      )}
      aria-label={`${t('Face-up table card')} ${value}`}
    >
      <span className='absolute top-2 left-2 font-bold text-rose-700 text-xs'>{value}</span>
      <span className='font-bold text-3xl text-rose-700'>{value}</span>
      <span className='absolute right-2 bottom-2 rotate-180 font-bold text-rose-700 text-xs'>{value}</span>
    </div>
  );
};

export default PokerCardFront;
