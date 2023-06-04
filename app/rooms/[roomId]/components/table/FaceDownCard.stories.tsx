import { Meta, StoryObj } from '@storybook/react';

import FaceDownCard from './FaceDownCard';

const meta: Meta<typeof FaceDownCard> = {
  component: FaceDownCard,
  title: 'Room/Table/FaceDownCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FaceDownCard>;

export const Default: Story = {
  args: {},
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};
