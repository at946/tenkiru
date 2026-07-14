import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import Select from '@/app/[locale]/components/common/Select';
import type { IFUser } from '@/interfaces/user';
import type { IFUserType } from '@/interfaces/userType';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'select'>;
type TOption = { value: IFUserType; displayValue: string };

const UserTypeSelect: NextPage<Props> = ({ ...props }: Props) => {
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
      {...props}
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
