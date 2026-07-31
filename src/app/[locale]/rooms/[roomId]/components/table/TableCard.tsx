import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { type HTMLMotionProps, motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import PokerCardBack from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardBack';
import PokerCardFront from '@/app/[locale]/rooms/[roomId]/components/poker-card/PokerCardFront';
import type { IFTableCardValue } from '@/interfaces/tableCardValue';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

type Props = HTMLMotionProps<'button'> & {
  cardValue: IFTableCardValue;
  playerId: string;
  isOpen?: boolean;
  delay?: number;
};

const TableCard = ({ cardValue, playerId, isOpen = false, delay = 0, className, ...rest }: Props) => {
  const t = useTranslations('Room.Table');
  const room = useAtomValue(roomAtom);
  const socket = useAtomValue(socketAtom);

  const isSelected: boolean = room.selectedPlayerId === playerId;
  const isYours: boolean = playerId === socket?.id;

  const nominate = (): void => {
    socket?.emit('nominate', room.id, playerId);
    event({ action: 'nominate', category: 'engagement', label: '' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 1.2, filter: 'blur(3px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
      className={clsx(
        'size-full rounded-xl transition duration-300 ease-in-out',
        room.isOpenPhase ? 'cursor-pointer hover:-translate-y-2' : 'cursor-not-allowed',
        isSelected ? 'selected ring-8 ring-orange-500' : '',
        className,
      )}
      disabled={!isOpen}
      onClick={nominate}
      role='img'
      aria-label={isOpen ? `${t('Face-up table card')} ${cardValue}` : t('Face-down table card')}
      {...rest}
    >
      {isSelected && isYours && (
        <div
          className={clsx(
            'absolute -top-6 left-1/2 z-10 -translate-x-1/2 animate-[bounce_1s_ease-in-out_5.5] rounded-full bg-orange-500 px-3 py-2 text-sm text-white',
          )}
        >
          <p className='flex items-center'>
            <span className='mr-1'>You</span>
            <span className='icon-[mdi--speak-outline] text-lg' />
          </p>
        </div>
      )}
      <motion.div
        initial={false}
        animate={{ rotateY: isOpen ? 180 : 0, y: isOpen ? [0, -16, 0] : 0 }}
        transition={{
          rotateY: { duration: 0.5, delay, ease: 'easeInOut' },
          y: { duration: 0.5, delay, ease: 'easeInOut' },
        }}
        className='transform-3d relative size-full h-full w-hull'
      >
        <PokerCardBack className='backface-hidden absolute inset-0' />
        <PokerCardFront value={cardValue} className='backface-hidden absolute inset-0 rotate-y-180' />
      </motion.div>
    </motion.button>
  );
};

export default TableCard;
