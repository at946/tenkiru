import { NextPage } from 'next';
import { MemberType } from '../../interfaces/memberType';
import { useAppSelector } from '../../store/hooks';

interface Props {
  changeMemberType: (memberType: MemberType) => void;
}

const MemberTypeToggle: NextPage<Props> = ({ changeMemberType }) => {
  const type = useAppSelector(state => state.user.type)
  
  const click = (memberType: MemberType): void => {
    changeMemberType(memberType);
  };

  return (
    <div className='tabs is-toggle is-centered'>
      <ul>
        <li
          className={type === 'player' ? 'is-active' : ''}
          onClick={() => click('player')}
          data-testid='memberTypePlayer'
        >
          <a>Player</a>
        </li>
        <li
          className={type === 'audience' ? 'is-active' : ''}
          onClick={() => click('audience')}
          data-testid='memberTypeAudience'
        >
          <a>Audience</a>
        </li>
      </ul>
    </div>
  );
};

export default MemberTypeToggle;
