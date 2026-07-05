import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const TableBoard = ({ children, className, ...props }: Props) => {
  const t = useTranslations('Room.Table');

  return (
    <div
      {...props}
      role='img'
      aria-label={t('Table')}
      className={clsx(
        'rounded-sm py-5 text-center shadow-xl',
        'bg-radial from-emerald-500 via-emerald-700 to-emerald-900',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default TableBoard;
