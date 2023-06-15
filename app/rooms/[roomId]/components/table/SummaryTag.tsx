import { NextPage } from 'next';

interface Props {
  name: string;
  value: number | string;
  isOpen: boolean;
  ariaLabel?: string;
}

const SummaryTag: NextPage<Props> = ({ name, value, isOpen, ariaLabel }) => {
  return (
    <div className='text-sm' aria-label={ariaLabel}>
      <span className='rounded-l border border-slate-900 bg-slate-900 px-2 py-1 text-white'>
        {name}
      </span>
      <span className='rounded-r border border-slate-900 bg-white px-2 py-1'>
        {isOpen ? value : '?'}
      </span>
    </div>
  );
};

export default SummaryTag;
