import type { NextPage } from 'next';

interface Props {
  name: string;
  value: number | string;
}

const SummaryTag: NextPage<Props> = ({ name, value }) => {
  return (
    <div className='text-sm' title={`${name} ${value}`}>
      <span className='border-dark-background bg-dark-background text-dark-text rounded-l border-2 px-2 py-1'>
        {name}
      </span>
      <span className='border-dark-background bg-background text-text rounded-r border-2 px-2 py-1'>{value}</span>
    </div>
  );
};

export default SummaryTag;
