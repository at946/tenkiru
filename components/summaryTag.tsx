import { NextPage } from 'next';

interface Props {
  name: string;
  value: number;
  testid: string;
}

const SummaryTag: NextPage<Props> = ({ name, value, testid }) => {
  return (
    <div className='control'>
      <div className='tags has-addons' data-testid={testid}>
        <span className='tag'>{name}</span>
        <span className='tag is-primary'>{value}</span>
      </div>
    </div>
  );
};

export default SummaryTag;
