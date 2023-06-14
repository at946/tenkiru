import { NextPage } from 'next';

// interface
import { IFHandsCardValue } from '@/interfaces/handsCardValue';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

// class
import { Room } from '@/class/room';
import { User } from '@/class/user';
import { Table } from '@/class/table';

// interface
import { MemberType } from '@/interfaces/memberType';
import { IFHandsCardValue } from '@/interfaces/handsCardValue';

interface Props {
  value: IFHandsCardValue;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (value: IFTableCardValue) => void;
}

const HandsCard: NextPage<Props> = ({ value, isSelected, isDisabled, onClick }) => {
  const onClickHandler = () => {
    if (isDisabled) return;
    onClick(isSelected ? null : value);
  };
  return (
    <button
      onClick={onClickHandler}
      className={`
        flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 text-2xl font-bold shadow enabled:hover:-translate-y-2 enabled:hover:shadow-2xl enabled:focus:-translate-y-2 enabled:focus:shadow-2xl disabled:cursor-not-allowed
        ${isSelected ? 'bg-rose-500 text-white' : 'bg-white text-slate-900 disabled:opacity-50'}
      `}
      disabled={isDisabled}
      role='option'
      aria-label='手札カード'
      aria-disabled={isDisabled}
      aria-selected={isSelected}
    >
      {value}
    </button>
  );
};

export default HandsCard;
