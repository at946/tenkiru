import { Meta, StoryObj } from '@storybook/react';
import CreateRoomButton from './CreateRoomButton';

const meta: Meta<typeof CreateRoomButton> = {
  component: CreateRoomButton,
  title: 'Top/CreateRoomButton',
  description: 'https://react-hot-toast.com/',
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    name: {
      type: { required: true },
      description: 'Text on the button',
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
