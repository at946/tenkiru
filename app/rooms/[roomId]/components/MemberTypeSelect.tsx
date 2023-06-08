import { NextPage } from 'next';
import { MemberType } from '@/interfaces/memberType';
import { event } from '@/lib/gtag';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from '@/app/components/common/Select';

interface Props {
  extraClass: string;
  select: (memberType: MemberType) => void;
}

const MemberTypeSelect: NextPage<Props> = ({ extraClass, select }) => {
  const type = useAppSelector((state) => state.user.type);

  const change = (value: string): void => {
    event({ action: `change_member_type_${value}`, category: 'engagement', label: '' });
    select(value as MemberType);
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

export default MemberTypeSelect;
