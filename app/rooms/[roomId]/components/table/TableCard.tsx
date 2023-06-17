import { NextPage } from 'next';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

interface Props {
  value: IFTableCardValue;
  isOpen?: boolean;
}

const TableCard: NextPage<Props> = ({ value, isOpen }) => {
  const isBlank: boolean = value === null;

  return (
    <div
      className={`flex aspect-card w-24 items-center justify-center rounded-md border-slate-900 text-2xl font-bold shadow-md transition-all duration-1000 ease-out
        ${isBlank ? 'border-2 border-dashed' : 'border'}
        ${isBlank ? 'bg-transparent' : isOpen ? 'bg-white' : 'bg-purple-600'}
        `}
      style={isOpen ? {} : { transform: 'rotateY(-180deg)' }}
      aria-label={
        isBlank
          ? '未選択のテーブルカード'
          : isOpen
          ? `めくられたテーブルカード ${value}`
          : '伏せられたテーブルカード'
      }
    >
      {isOpen && value}
    </div>
  );
};

export default TableCard;
