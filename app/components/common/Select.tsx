import { NextPage } from 'next';

export interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onChange?: (value: string) => void;
}

const Select: NextPage<Props> = ({ options, value, disabled, ariaLabel, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      disabled={disabled}
      aria-label={ariaLabel}
      className='rounded-lg border px-2 py-1 outline-none enabled:hover:border-purple-600 enabled:hover:text-purple-600 enabled:focus:border-purple-600 enabled:focus:text-purple-600 disabled:opacity-50'
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
