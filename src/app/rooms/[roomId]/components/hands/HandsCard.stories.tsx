import { IFTableCardValue } from '@/interfaces/tableCardValue';
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
    isDisabled: {
      type: { name: 'boolean', required: false },
      description: '選択可能かどうか',
    },
    isSelected: {
      type: { name: 'boolean', required: false },
      description: '選択中のカードかどうか',
    },
    onClick: {
      type: { name: 'function', required: true },
      description: 'カードを選択したときに呼び出される親コンポーネントの関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HandsCard>;

export const Default: Story = {
  args: {
    value: 1,
    isSelected: false,
    isDisabled: false,
    onClick: (value: IFTableCardValue) => {
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
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
  },
};

export const SelectedAndDisabled: Story = {
  args: {
    ...Default.args,
    isSelected: true,
    isDisabled: true,
  },
};
