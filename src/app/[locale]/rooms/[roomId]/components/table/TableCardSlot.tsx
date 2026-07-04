import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const TableCardSlot = ({ children, className, ...props }: Props) => {
  const t = useTranslations('Room.Table');
  return (
    <div
      {...props}
      className={clsx('perspective-distant relative aspect-card w-24', className)}
      role='img'
      aria-label={t('Table card slot')}
    >
      <div aria-hidden='true' className='absolute inset-0 rounded-xl border-2 border-white' />
      <div className='absolute inset-0'>{children}</div>
    </div>
  );
};

export default TableCardSlot;
