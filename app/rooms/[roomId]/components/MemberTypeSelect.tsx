import { NextPage } from 'next';
import { useAppSelector } from '@/store/hooks';
import { event } from '@/lib/gtag';

import { MemberType } from '@/interfaces/memberType';

import Select, { Option } from '@/app/components/common/Select';

interface Props {
  extraClass?: string;
  onChange: (memberType: MemberType) => void;
}

const MemberTypeSelect: NextPage<Props> = ({ extraClass, onChange }) => {
  const type: MemberType = useAppSelector((state) => state.user.type);

  const options: Option[] = [
    { value: 'player', label: 'プレイヤー' },
    { value: 'audience', label: '観客' },
  ];

  const handleOnChange = (value: string): void => {
    onChange(value as MemberType);
    event({ action: `change_member_type_${value}`, category: 'engagement', label: '' });
  };

  return (
    <div className={extraClass || ''}>
      <label>
        メンバータイプ：
        <Select options={options} value={type} onChange={handleOnChange} />
      </label>
    </div>
  );
};

export default MemberTypeSelect;
