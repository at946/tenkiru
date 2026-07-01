import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';

const PokerCardBack = ({ className, ...props }: ComponentPropsWithoutRef<'div'>) => {
  const t = useTranslations('Room.Table');
  return (
    <div
      role='img'
      className={clsx(
        'relative flex aspect-card items-center justify-center overflow-hidden rounded-xl border-2 border-white/90 bg-[#B11C1C] shadow-lg',
        className,
      )}
      {...props}
      aria-label={t('Face-down table card')}
    >
      {/* Pattern */}
      <div
        aria-hidden='true'
        className='absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_12px,rgba(255,255,255,.25)_13px,transparent_14px),repeating-linear-gradient(-45deg,transparent_0,transparent_12px,rgba(255,255,255,.25)_13px,transparent_14px)] opacity-20'
      />

      {/* Inner frame */}
      <div aria-hidden='true' className='absolute inset-2 rounded-lg border border-white/40' />

      {/* Brand */}
      <div className='relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/5'>
        <div className='icon-[mdi--cards-playing-outline] h-8 w-8 text-white' />
      </div>

      {/* Highlight */}
      <div aria-hidden='true' className='absolute inset-0 bg-linear-to-br from-white/15 via-transparent to-black/10' />
    </div>
  );
};

export default PokerCardBack;
