import { NextPage } from 'next';
import { IFUserType } from '@/interfaces/userType';
import { event } from '@/lib/gtag';

import Select, { Option } from '@/app/components/common/Select';

interface Props {
  type: IFUserType;
  extraClass?: string;
  onChange: (userType: IFUserType) => void;
}

const UserTypeSelect: NextPage<Props> = ({ type, extraClass, onChange }) => {
  const options: Option[] = [
    { value: 'player', label: 'プレイヤー' },
    { value: 'audience', label: '観客' },
  ];

  const handleOnChange = (value: string): void => {
    onChange(value as IFUserType);
    event({ action: `change_member_type_${value}`, category: 'engagement', label: '' });
  };

  return (
    <div className={extraClass || ''}>
      <label>
        ユーザータイプ：
        <Select options={options} value={type} onChange={handleOnChange} />
      </label>
    </div>
  );
};

export default UserTypeSelect;