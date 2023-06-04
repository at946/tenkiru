import { NextPage } from 'next';

const BlankCard: NextPage = () => {
  return (
    <div
      className='aspect-card w-24 rounded-md border-2 border-dashed border-slate-900 bg-transparent'
      aria-label='未選択のテーブルカード'
    />
  );
};

export default BlankCard;
