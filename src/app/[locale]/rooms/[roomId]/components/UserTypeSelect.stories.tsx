import { IFUserType } from '@/interfaces/userType';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import UserTypeSelect from './UserTypeSelect';

const meta: Meta<typeof UserTypeSelect> = {
  component: UserTypeSelect,
  title: 'Room/UserTypeSelect',
  argTypes: {
    type: {
      type: { name: 'string', required: true },
      description: 'User type. If a use chooses "audience", that user can only view the game.',
      control: 'radio',
      options: ['player', 'audience'],
    },
    className: {
      type: { name: 'string', required: false },
      description: 'className',
    },
    onChange: {
      type: { name: 'function', required: true },
      description: 'Function called on change the type',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    type: 'player',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof UserTypeSelect>;

export const English: Story = {
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (userType: IFUserType) => {
        setArgs({ type: userType });
      };
      return (
        <NextIntlClientProvider locale='en' messages={enMessages}>
          <UserTypeSelect type={args.type} className={args.className} onChange={onChange} />
        </NextIntlClientProvider>
      );
    },
  ],
};

export const Japanese: Story = {
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (userType: IFUserType) => {
        setArgs({ type: userType });
      };
      return (
        <NextIntlClientProvider locale='ja' messages={jaMessages}>
          <UserTypeSelect type={args.type} className={args.className} onChange={onChange} />
        </NextIntlClientProvider>
      );
    },
  ],
};
