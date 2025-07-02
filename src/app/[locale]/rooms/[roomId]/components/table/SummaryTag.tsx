import type { NextPage } from 'next';

interface Props {
  name: string;
  value: number | string;
}

const SummaryTag: NextPage<Props> = ({ name, value }) => {
  return (
    <div className='text-sm' title={`${name} ${value}`}>
      <span className='rounded-l border-2 border-dark-background bg-dark-background px-2 py-1 text-dark-text'>
        {name}
      </span>
      <span className='rounded-r border-2 border-dark-background bg-background px-2 py-1 text-text'>{value}</span>
    </div>
  );
};

export default SummaryTag;
