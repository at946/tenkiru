import { NextPage } from 'next';
import { Card as IFCard } from '@/interfaces/card';

interface Props {
  value: IFCard;
  disabled?: boolean;
  selected?: boolean;
  onSelect: (value: IFCard) => void;
}

const HandsCard: NextPage<Props> = ({ disabled, selected, value, onSelect }) => {
  const handleOnSelect = () => {
    onSelect(value);
  };
  return (
    <button
      onClick={handleOnSelect}
      className={`
        flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 text-2xl font-bold shadow enabled:hover:-translate-y-2 enabled:hover:shadow-2xl enabled:focus:-translate-y-2 enabled:focus:shadow-2xl disabled:cursor-not-allowed
        ${selected ? 'bg-rose-500 text-white' : 'bg-white text-slate-900 disabled:opacity-50'}
      `}
      disabled={disabled}
      role='option'
      aria-label='手札カード'
      aria-disabled={disabled}
      aria-selected={selected}
    >
      {value}
    </button>
  );
};

export default HandsCard;
