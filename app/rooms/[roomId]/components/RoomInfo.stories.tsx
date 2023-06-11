import type { Meta, StoryObj } from '@storybook/react';

import RoomInfo from './RoomInfo';
import { Toaster } from 'react-hot-toast';

const meta: Meta<typeof RoomInfo> = {
  component: RoomInfo,
  title: 'Room/RoomInfo',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RoomInfo>;

export const Default: Story = {
  args: {
    roomId: 'xxxxx-xxxxx-xxxxx',
    extraClass: '',
  },
  decorators: [
    (story) => <div>{story()}<Toaster toastOptions={{ success: { className: 'border border-lime-500' }}} /></div>
  ]
};
