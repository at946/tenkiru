import { Meta, StoryObj } from '@storybook/react';

import TableCard from './TableCard';

const meta: Meta<typeof TableCard> = {
  component: TableCard,
  title: 'Room/Table/Card/TableCard',
  tags: ['autodocs'],
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof TableCard>;

export const FaceUpCardWithNumber: Story = {
  args: {
    value: 1,
    isOpen: true,
  },
};

export const FaceUpCardWithString: Story = {
  args: {
    value: 'XS',
    isOpen: true,
  },
};

export const FaceDownCard: Story = {
  args: {
    value: 1,
    isOpen: false,
  },
};
