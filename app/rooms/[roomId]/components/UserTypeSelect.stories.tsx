import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import UserTypeSelect from './UserTypeSelect';
import { IFUserType } from '@/interfaces/userType';

const meta: Meta<typeof UserTypeSelect> = {
  component: UserTypeSelect,
  title: 'Room/UserTypeSelect',
  tags: ['autodocs'],
  argTypes: {
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加で適用するクラス名',
    },
    onChange: {
      type: { name: 'function', required: true },
      description: '選択肢の変更時に呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserTypeSelect>;

export const Default: Story = {
  args: {
    type: 'player',
    extraClass: '',
    onChange: (userType: IFUserType) => {},
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (userType: IFUserType) => {
        setArgs({ type: userType });
      };
      return <UserTypeSelect {...args} type={args.type} onChange={onChange} />;
    },
  ],
};
