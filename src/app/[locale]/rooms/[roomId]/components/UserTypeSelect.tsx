import { useAtomValue } from 'jotai';
import { useTranslations } from 'next-intl';
import Select from '@/app/[locale]/components/common/Select';
import type { IFUser } from '@/interfaces/user';
import type { IFUserType } from '@/interfaces/userType';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

type TOption = { value: IFUserType; displayValue: string };

const UserTypeSelect = () => {
  const t = useTranslations('Room.Settings');
  const socket = useAtomValue(socketAtom);
  const room = useAtomValue(roomAtom);
  const user: IFUser | undefined = room.users.find((user) => user.id === socket?.id);

  const options: TOption[] = [
    { value: 'player', displayValue: t('Player') },
    { value: 'audience', displayValue: t('Audience') },
  ];

  const onChange = (value: IFUserType): void => {
    if (socket && room) {
      socket.emit('change-user-type', room.id, value);
    }
    event({
      action: `change_member_type_${value}`,
      category: 'engagement',
      label: '',
    });
  };

  return (
    <Select
      label={<span className='icon-[mdi--user-circle] text-2xl' />}
      value={user?.type}
      onChange={(e) => onChange(e.target.value as IFUserType)}
      className='uppercase'
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.displayValue}
        </option>
      ))}
    </Select>
  );
};

export default UserTypeSelect;
