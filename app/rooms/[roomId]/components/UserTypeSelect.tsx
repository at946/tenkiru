import { NextPage } from 'next';
import { IFUserType } from '@/interfaces/userType';
import { event } from '@/lib/gtag';

import { IFOption } from '@/app/components/common/Select';
import SelectWithLabel from '@/app/components/common/SelectWithLabel';

interface Props {
  type: IFUserType;
  extraClass?: string;
  onChange: (userType: IFUserType) => void;
}

const UserTypeSelect: NextPage<Props> = ({ type, extraClass, onChange }) => {
  const options: IFOption[] = [
    { value: 'player', label: 'プレイヤー' },
    { value: 'audience', label: '観客' },
  ];

  const handleOnChange = (value: string): void => {
    onChange(value as IFUserType);
    event({ action: `change_member_type_${value}`, category: 'engagement', label: '' });
  };

  return (
    <div className={extraClass || ''}>
      <SelectWithLabel
        label='ユーザータイプ'
        options={options}
        value={type}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default UserTypeSelect;
