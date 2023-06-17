import { NextPage } from 'next';

interface Props {
  name: string;
  value: number | string;
}

const SummaryTag: NextPage<Props> = ({ name, value }) => {
  return (
    <div className='text-sm' aria-label={`${name} ${value}`}>
      <span className='rounded-l border border-slate-900 bg-slate-900 px-2 py-1 text-white'>
        {name}
      </span>
      <span className='rounded-r border border-slate-900 bg-white px-2 py-1'>
        { value }
      </span>
    </div>
  );
};

export default SummaryTag;
