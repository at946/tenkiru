import { Meta, StoryObj } from '@storybook/react';

import BlankCard from './BlankCard';

const meta: Meta<typeof BlankCard> = {
  component: BlankCard,
  title: 'Room/Table/Card/BlankCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BlankCard>;

export const Default: Story = {
  args: {},
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};
