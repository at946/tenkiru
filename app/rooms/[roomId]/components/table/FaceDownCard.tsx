import { NextPage } from 'next';

const FaceDownCard: NextPage = () => {
  return (
    <div
      className='aspect-card w-24 rounded-md border border-slate-900 bg-purple-600 shadow-md'
      style={{ transform: 'rotateY(-180deg)' }}
      aria-label='伏せられたテーブルカード'
    />
  );
};

export default FaceDownCard;
