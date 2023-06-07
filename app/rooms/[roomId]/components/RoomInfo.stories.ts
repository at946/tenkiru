import type { Meta, StoryObj } from '@storybook/react';

import RoomInfo from './RoomInfo';

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
};
