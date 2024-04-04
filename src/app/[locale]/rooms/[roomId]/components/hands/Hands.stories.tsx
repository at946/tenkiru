import { IFTableCardValue } from '@/interfaces/tableCardValue';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import Hands from './Hands';

const meta: Meta<typeof Hands> = {
  component: Hands,
  title: 'Room/Hands/Hands',
  tags: ['autodocs'],
  argTypes: {
    deckType: {
      type: { name: 'string', required: true },
      description: 'デッキの種類',
    },
    selectedValue: {
      type: { name: 'other', value: 'IFTableCard', required: true },
      description: '選択中のカード',
    },
    isDisabled: {
      type: { name: 'boolean', required: false },
      description: '手札からカードを選択できるかどうか',
    },
    onSelect: {
      type: { name: 'function', required: true },
      description: '手札からカードを選んだときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hands>;

export const Fibonacci: Story = {
  args: {
    deckType: 'fibonacci',
    selectedValue: 1,
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: args.selectedValue === value ? null : value });
      };
      return (
        <Hands
          {...args}
          deckType={args.deckType}
          selectedValue={args.selectedValue}
          onSelect={onSelect}
        />
      );
    },
  ],
};

export const Sequential: Story = {
  args: {
    deckType: 'sequential',
    selectedValue: 1,
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: value });
      };
      return (
        <Hands
          {...args}
          deckType={args.deckType}
          selectedValue={args.selectedValue}
          onSelect={onSelect}
        />
      );
    },
  ],
};

export const TShirtSize: Story = {
  args: {
    deckType: 'tShirtSize',
    selectedValue: 'S',
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: value });
      };
      return (
        <Hands
          {...args}
          deckType={args.deckType}
          selectedValue={args.selectedValue}
          onSelect={onSelect}
        />
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    deckType: 'fibonacci',
    selectedValue: null,
    isDisabled: true,
  },
};
