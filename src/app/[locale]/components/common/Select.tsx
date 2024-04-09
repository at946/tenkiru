import { NextPage } from 'next';

export interface IFOption {
  value: string;
  displayValue: string;
}

interface Props {
  options: IFOption[];
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
      className=' border-0 border-b-2 border-text bg-transparent py-0 pl-2 pr-10 outline-none focus:ring-0 enabled:hover:border-primary enabled:hover:text-primary enabled:focus:border-primary enabled:focus:text-primary disabled:opacity-50 dark:border-dark-text'
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </select>
  );
};

export default Select;
