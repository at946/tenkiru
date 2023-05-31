import { NextPage } from 'next';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  ariaLabel: string;
  extraClass: string;
  onChange: (value: string) => void;
}

const Select: NextPage<Props> = ({ options, value, ariaLabel, extraClass, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
      className={`border-2 rounded-lg px-2 py-1 outline-none hover:border-purple-600 focus:border-purple-600 ${extraClass || ''}`}
    >
      { options.map((option) => (
        <option key={option.value} value={option.value}>{ option.label }</option>
      ))}
    </select>
  );
};

export default Select;
