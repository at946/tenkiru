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

  const change: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
    const memberType: MemberType = e.target.value as MemberType;
    event({ action: `change_member_type_${memberType}`, category: 'engagement', label: '' });
    select(memberType);
  };

  return (
    <div className={extraClass || ''}>
      <span>メンバータイプ：</span>
      <Select
        options={[
          { value: 'player', label: 'プレイヤー' },
          { value: 'audience', label: '観客' },
        ]}
        value={type}
        ariaLabel='メンバータイプの選択'
        onChange={select}
      />
    </div>
  );
};

export default MemberTypeSelect;
