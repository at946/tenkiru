import { NextPage } from 'next';
import { Card } from '@/interfaces/card';

interface Props {
  value: Card;
}

const FaceUpCard: NextPage<Props> = ({ value }) => {
  return (
    <div
      className='flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 bg-white text-2xl font-bold shadow-md duration-1000'
      style={{ transform: 'rotateY(0)' }}
      aria-label={`めくられたテーブルカード ${value}`}
    >
      {value}
    </div>
  );
};

export default FaceUpCard;
