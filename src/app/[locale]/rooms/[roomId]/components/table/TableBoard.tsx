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
      className={clsx('rounded-sm bg-green-400 py-5 text-center shadow-md', className)}
    >
      {children}
    </div>
  );
};

export default TableBoard;
