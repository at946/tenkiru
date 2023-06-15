import { NextPage } from 'next';
import { IFUserType } from '@/interfaces/userType';
import { event } from '@/lib/gtag';
import { useAppSelector } from '@/store/hooks';
import { event } from '@/lib/gtag';

import { MemberType } from '@/interfaces/memberType';

import Select, { Option } from '@/app/components/common/Select';

interface Props {
  type: IFUserType;
  extraClass?: string;
  onChange: (memberType: MemberType) => void;
}

const MemberTypeSelect: NextPage<Props> = ({ type, extraClass, onChange }) => {

  const options: Option[] = [
    { value: 'player', label: 'プレイヤー' },
    { value: 'audience', label: '観客' },
  ];

  const handleOnChange = (value: string): void => {
    onChange(value as MemberType);
    event({ action: `change_member_type_${value}`, category: 'engagement', label: '' });

  return (
    <div className={extraClass || ''}>
      <label>
        メンバータイプ：
        <Select options={options} value={type} onChange={handleOnChange} />
      </label>
    </div>
  );
};

export default UserTypeSelect;
