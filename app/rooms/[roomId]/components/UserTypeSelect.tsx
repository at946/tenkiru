import { NextPage } from 'next';
import { IFUserType } from '@/interfaces/userType';
import { event } from '@/lib/gtag';
import Select from '@/app/components/common/Select';

interface Props {
  type: IFUserType;
  extraClass: string;
  select: (userType: IFUserType) => void;
}

const UserTypeSelect: NextPage<Props> = ({ type, extraClass, select }) => {
  const change = (value: string): void => {
    event({ action: `change_member_type_${value}`, category: 'engagement', label: '' });
    select(value as IFUserType);
  };

  return (
    <div className={extraClass || ''}>
      <label>
        メンバータイプ：
        <Select
          options={[
            { value: 'player', label: 'プレイヤー' },
            { value: 'audience', label: '観客' },
          ]}
          value={type}
          onChange={change}
        />
      </label>
    </div>
  );
};

export default UserTypeSelect;
