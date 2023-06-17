import { Meta, StoryObj } from '@storybook/react';

import TableCard from './TableCard';

const meta: Meta<typeof TableCard> = {
  component: TableCard,
  title: 'Room/Table/TableCard',
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: { name: 'string', required: true },
      description: 'カードの値',
    },
    isOpen: {
      type: { name: 'boolean', required: false },
      description: 'カードがオープンかどうか',
    },
  },
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof TableCard>;

export const NotBlankAndOpen: Story = {
  args: {
    value: 1,
    isOpen: true,
  },
};

export const NotBlankAndClose: Story = {
  args: {
    value: 1,
    isOpen: false,
  },
};

export const BlankAndOpen: Story = {
  args: {
    value: null,
    isOpen: true,
  },
};

export const BlankAndClose: Story = {
  args: {
    value: null,
    isOpen: false,
  },
};
