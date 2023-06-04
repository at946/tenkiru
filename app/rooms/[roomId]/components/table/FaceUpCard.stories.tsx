import { Meta, StoryObj } from '@storybook/react';

import FaceUpCard from './FaceUpCard';

const meta: Meta<typeof FaceUpCard> = {
  component: FaceUpCard,
  title: 'Room/Table/FaceUpCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FaceUpCard>;

export const Default: Story = {
  args: {
    value: 1,
  },
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};
