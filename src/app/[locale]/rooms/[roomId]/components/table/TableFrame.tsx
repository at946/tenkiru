import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type Props = ComponentPropsWithoutRef<'div'>;

const TableFrame = ({ children, className, ...props }: Props) => {
  return (
    <div
      {...props}
      className={clsx(
        'relative rounded-sm p-4 shadow',
        // 木の色
        'bg-linear-to-br from-amber-950 via-amber-700 to-amber-950',
        className,
      )}
    >
      {/* 木目 */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 rounded-[inherit] opacity-25 mix-blend-overlay'
        style={{
          background: `
            repeating-linear-gradient(
              8deg,
              transparent 0px,
              transparent 8px,
              rgba(255,255,255,.10) 9px,
              transparent 10px,
              transparent 18px,
              rgba(0,0,0,.08) 19px
            ),
            repeating-linear-gradient(
              -5deg,
              transparent 0px,
              transparent 12px,
              rgba(255,255,255,.06) 13px,
              transparent 14px
            )
          `,
        }}
      />

      {/* ニスっぽいハイライト */}
      <div
        aria-hidden
        className={clsx(
          'pointer-events-none absolute inset-0 rounded-[inherit]',
          'shadow-[inset_0_2px_2px_rgba(255,255,255,.18),inset_0_-5px_10px_rgba(0,0,0,.35)]',
        )}
      />

      <div className='relative z-10'>{children}</div>
    </div>
  );
};

export default TableFrame;
