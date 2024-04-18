import { Meta, StoryObj } from '@storybook/react';
import CreateRoomButton from './CreateRoomButton';

const meta: Meta<typeof CreateRoomButton> = {
  component: CreateRoomButton,
  title: 'Top/CreateRoomButton',
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    name: {
      description: '<b>Required</b><br />Text on the button',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
  args: {
    name: 'Create a room',
  },
};

export default meta;
type Story = StoryObj<typeof CreateRoomButton>;

export const Default: Story = {};
