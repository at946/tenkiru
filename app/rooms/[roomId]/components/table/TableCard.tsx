import { NextPage } from 'next';
import { Card } from '@/interfaces/card';

interface Props {
  value: Card;
  isOpen: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen }) => {
  return (
    <div
      className={`flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 text-2xl font-bold shadow-md transition-all duration-1000 ease-out ${
        isOpen ? 'bg-white' : 'bg-purple-600'
      }`}
      style={isOpen ? {} : { transform: 'rotateY(-180deg)' }}
      aria-label={isOpen ? `めくられたテーブルカード ${value}` : '伏せられたテーブルカード'}
    >
      {isOpen && value}
    </div>
  );
};

export default TableCard;
