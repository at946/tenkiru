import { NextPage } from 'next';
import { MemberType } from '@/interfaces/memberType';
import { event } from '@/lib/gtag';
import { useAppSelector } from '@/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserSlash } from '@fortawesome/free-solid-svg-icons';

interface Props {
  changeMemberType: (memberType: MemberType) => void;
}

const MemberTypeToggle: NextPage<Props> = ({ changeMemberType }) => {
  const type = useAppSelector((state) => state.user.type);

  const clickMemberType = (memberType: MemberType): void => {
    event({ action: `change_member_type_${memberType}`, category: 'engagement', label: '' });
    changeMemberType(memberType);
  };

  return (
    <div className='tabs is-centered is-boxed'>
      <ul aria-label='メンバータイプの選択'>
        <li
          className={type === 'player' ? 'is-active' : ''}
          onClick={() => clickMemberType('player')}
          aria-label={`プレイヤー${type === 'player' ? ' 選択中' : ''}`}
        >
          <a>
            <FontAwesomeIcon icon={faUser} className='mr-1' />
            <span>プレイヤー</span>
          </a>
        </li>
        <li
          className={type === 'audience' ? 'is-active' : ''}
          onClick={() => clickMemberType('audience')}
          aria-label={`観客${type === 'audience' ? ' 選択中' : ''}`}
        >
          <a>
            <FontAwesomeIcon icon={faUserSlash} className='mr-1' />
            <span>観客</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default MemberTypeToggle;
