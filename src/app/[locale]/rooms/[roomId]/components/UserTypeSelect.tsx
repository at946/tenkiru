import type { IFUserType } from '@/interfaces/userType';
import { event } from '@/lib/gtag';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';

interface Props {
  type: IFUserType;
  className?: string;
  onChange: (userType: IFUserType) => void;
}

const UserTypeSelect: NextPage<Props> = ({ type, className, onChange }) => {
  const t = useTranslations('Room.Settings');

  type option = { value: string; displayValue: string };
  const options: option[] = [
    { value: 'player', displayValue: t('Player') },
    { value: 'audience', displayValue: t('Audience') },
  ];

  const handleOnChange = (value: string): void => {
    onChange(value as IFUserType);
    event({
      action: `change_member_type_${value}`,
      category: 'engagement',
      label: '',
    });
  };

  return (
    <div className={className}>
      <div className='inline-flex gap-4'>
        {options.map((option) => (
          <label key={option.value} className='inline-flex cursor-pointer items-center'>
            <input
              className='mr-1 text-primary accent-primary checked:bg-primary dark:text-dark-primary dark:checked:bg-dark-primary'
              type='radio'
              value={option.value}
              checked={type === option.value}
              onChange={(e) => handleOnChange(e.target.value)}
            />
            <span>{option.displayValue}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelect;
