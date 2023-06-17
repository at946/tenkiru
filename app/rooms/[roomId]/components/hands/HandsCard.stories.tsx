import { Meta, StoryObj } from '@storybook/react';

import HandsCard from './HandsCard';

const meta: Meta<typeof HandsCard> = {
  component: HandsCard,
  title: 'Room/Hands/HandsCard',
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: { name: 'other', value: 'card', required: true },
      description: 'カードの値',
    },
    disabled: {
      type: { name: 'boolean', required: false },
      description: '選択可能かどうか',
    },
    selected: {
      type: { name: 'boolean', required: false },
      description: '選択中のカードかどうか',
    },
    onSelect: {
      type: { name: 'function', required: true },
      description: 'カードを選択したときに呼び出される親コンポーネントの関数',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HandsCard>;

export const Default: Story = {
  args: {
    value: 1,
    selected: false,
    disabled: false,
    onSelect: (value: Card) => {
      console.log(value);
    },
  },
};

export const Text: Story = {
  args: {
    ...Default.args,
    value: 'XS',
  },
};

export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const SelectedAndDisabled: Story = {
  args: {
    ...Default.args,
    selected: true,
    disabled: true,
  },
};
