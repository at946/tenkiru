import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import type { ComponentPropsWithoutRef } from 'react';
import type { IFUser } from '@/interfaces/user';
import type { IFUserType } from '@/interfaces/userType';
import roomAtom from '@/jotai/atoms/roomAtom';
import { socketAtom } from '@/jotai/atoms/socketAtom';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'div'>;
type TOption = { value: IFUserType; displayValue: string };

const UserTypeSelect: NextPage<Props> = ({ className, ...props }: Props) => {
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
    <div className={className}>
      <div className='inline-flex gap-4'>
        {options.map((option) => (
          <label key={option.value} className='inline-flex cursor-pointer items-center'>
            <input
              className='mr-1 text-primary accent-primary checked:bg-primary dark:text-dark-primary dark:checked:bg-dark-primary'
              type='radio'
              value={option.value}
              checked={user.type === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <span>{option.displayValue}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelect;
