import MyToaster from '@/app/[locale]/components/common/MyToaster';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import RoomInfo from './RoomInfo';

const meta: Meta<typeof RoomInfo> = {
  component: RoomInfo,
  title: 'Room/RoomInfo',
  argTypes: {
    roomId: {
      type: { name: 'string', required: true },
      description: 'Room ID',
      control: { type: 'text' },
    },
    className: {
      type: { name: 'string', required: false },
      description: 'className',
      control: { type: 'text' },
    },
  },
  args: {
    roomId: 'xxxxx-xxxxx-xxxxx-xxxxx',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof RoomInfo>;

export const English: Story = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale='en' messages={enMessages}>
        <Story />
        <MyToaster />
      </NextIntlClientProvider>
    ),
  ],
};

export const Japanese: Story = {
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale='ja' messages={jaMessages}>
        <Story />
        <MyToaster />
      </NextIntlClientProvider>
    ),
  ],
};
