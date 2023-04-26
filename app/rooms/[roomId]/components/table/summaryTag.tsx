import { NextPage } from 'next';

interface Props {
  name: string;
  value: number;
  ariaLabel?: string;
}

const SummaryTag: NextPage<Props> = ({ name, value, ariaLabel }) => {
  return (
    <div className='control'>
      <div className='tags has-addons' aria-label={ariaLabel}>
        <span className='tag is-dark'>{name}</span>
        <span className='tag is-white'>{value}</span>
      </div>
    </div>
  );
};

export default SummaryTag;
