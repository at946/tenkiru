import type { Meta, StoryObj } from '@storybook/react';

import CreateRoomButton from './CreateRoomButton';

export default {
  component: CreateRoomButton,
  title: 'Home/CreateRoomButton',
  tags: ['autodocs'],
} as Meta<typeof CreateRoomButton>;

export const Default: StoryObj<typeof CreateRoomButton> = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
