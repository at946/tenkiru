import { Meta, StoryObj } from '@storybook/react';

import FaceUpCard from './FaceUpCard';

const meta: Meta<typeof FaceUpCard> = {
  component: FaceUpCard,
  title: 'Room/Table/Card/FaceUpCard',
  tags: ['autodocs'],
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof FaceUpCard>;

export const NumberValue: Story = {
  args: {
    value: 1,
  },
};

export const StringValue: Story = {
  args: {
    value: 'XS',
  },
};
