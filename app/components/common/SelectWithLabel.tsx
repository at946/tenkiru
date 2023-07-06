import { NextPage } from 'next';
import Select, { IFOption } from './Select';

interface Props {
  label: string;
  options: IFOption[];
  value?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
}

const SelectWithLabel: NextPage<Props> = ({ label, options, value, disabled, onChange }) => {
  return (
    <label>
      <span className='dark:text-white'>{label}：</span>
      <Select options={options} value={value} disabled={disabled} onChange={onChange} />
    </label>
  );
};

export default SelectWithLabel;
