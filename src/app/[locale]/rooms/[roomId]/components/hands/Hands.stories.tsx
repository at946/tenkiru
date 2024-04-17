import { IFTableCardValue } from '@/interfaces/tableCardValue';
import enMessages from '@/messages/en.json';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import Hands from './Hands';

const meta: Meta<typeof Hands> = {
  component: Hands,
  title: 'Room/Hands/Hands',
  argTypes: {
    deckType: {
      type: { name: 'string', required: true },
      description: 'Deck type',
      control: 'radio',
      options: ['fibonacci', 'sequential', 'tShirtSize'],
    },
    selectedValue: {
      type: { required: true },
      table: {
        type: {
          summary: 'number | string | null',
        },
      },
      description: 'Selected card value',
    },
    isDisabled: {
      type: { name: 'boolean', required: false },
      description: 'Whether to be able to select a card',
      defaultValue: false,
    },
    onSelect: {
      type: { name: 'function', required: true },
      description: 'Function called on selecting a card',
      table: {
        category: 'Events',
      },
    },
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: args.selectedValue === value ? null : value });
      };
      return (
        <NextIntlClientProvider locale='en' messages={enMessages}>
          <Hands
            {...args}
            deckType={args.deckType}
            selectedValue={args.selectedValue}
            onSelect={onSelect}
          />
        </NextIntlClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Hands>;

export const Fibonacci: Story = {
  args: {
    deckType: 'fibonacci',
    selectedValue: 1,
    isDisabled: false,
  },
};

export const Sequential: Story = {
  args: {
    deckType: 'sequential',
    selectedValue: 1,
    isDisabled: false,
  },
};

export const TShirtSize: Story = {
  args: {
    deckType: 'tShirtSize',
    selectedValue: 'S',
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    deckType: 'fibonacci',
    selectedValue: 1,
    isDisabled: true,
  },
};
