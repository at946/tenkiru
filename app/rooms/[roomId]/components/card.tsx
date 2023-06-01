import { NextPage } from 'next';
import { Card as IFCard } from '@/interfaces/card';

interface Props {
  value?: IFCard;
  extraClass?: string;
  role?: string;
  ariaLabel?: string;
  ariaDisabled?: boolean;
  ariaSelected?: boolean;
}

const Card: NextPage<Props> = ({
  value,
  extraClass,
  role,
  ariaLabel,
  ariaDisabled,
  ariaSelected,
}) => {
  return (
    <div
      className={`m-2 flex aspect-card w-24 items-center justify-center rounded-md border border-slate-900 text-2xl font-bold shadow-md ${extraClass}`}
      role={role}
      aria-label={ariaLabel}
      aria-disabled={ariaDisabled}
      aria-selected={ariaSelected}
    >
      {value}
    </div>
  );
};

export default Card;
