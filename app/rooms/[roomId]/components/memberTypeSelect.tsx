import { NextPage } from 'next';
import { MemberType } from '@/interfaces/memberType';
import { event } from '@/lib/gtag';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';

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
      <select
        value={type}
        onChange={change}
        aria-label='メンバータイプの選択'
        className='border-b-2 text-center outline-none hover:border-purple-600 focus:border-purple-600'
      >
        <option value='player'>プレイヤー</option>
        <option value='audience'>観客</option>
      </select>
    </div>
  );
};

export default MemberTypeSelect;
