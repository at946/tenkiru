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
      className={`flex aspect-card w-24 items-center justify-center rounded-md border-slate-900 text-2xl font-bold shadow-md
        ${isBlank ? 'border-2 border-dashed' : 'border'}
        ${
          isBlank
            ? 'bg-transparent'
            : isOpen
            ? 'bg-white transition-all duration-1000 ease-out'
            : 'bg-purple-600'
        }
        `}
      style={!isBlank && !isOpen ? { transform: 'rotateY(-180deg)' } : {}}
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
