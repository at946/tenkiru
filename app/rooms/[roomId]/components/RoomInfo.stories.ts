import type { Meta, StoryObj } from '@storybook/react';

import RoomInfo from './RoomInfo';
import '@/styles/globals.css';

export default {
  component: RoomInfo,
  title: 'Room/RoomInfo',
  tags: ['autodocs'],
} as Meta<typeof RoomInfo>;

export const Default: StoryObj<typeof RoomInfo> = {
  args: {
    roomId: 'xxxxx-xxxxx-xxxxx',
    extraClass: '',
  },
};
