import { NextPage } from 'next';
import { MemberType } from '../interfaces/member';

interface Props {
  type: MemberType;
  changeMemberType: (memberType: MemberType) => void;
}

const memberTypeToggle: NextPage<Props> = ({ type, changeMemberType }) => {
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

export default memberTypeToggle;
