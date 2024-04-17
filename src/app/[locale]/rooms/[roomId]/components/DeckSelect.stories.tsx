import { IFDeckType } from '@/interfaces/deckType';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import DeckSelect from './DeckSelect';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  argTypes: {
    deckType: {
      type: { name: 'string', required: true },
      description: 'Selected deck type',
      control: 'radio',
      options: ['fibonacci', 'sequential', 'tShirtSize'],
    },
    disabled: {
      type: { name: 'boolean', required: false },
      description: 'disabled attribute',
    },
    className: {
      type: { name: 'string', required: false },
      description: 'className',
    },
    onChange: {
      type: { name: 'function', required: true },
      description: 'Function called on change the value',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    deckType: 'fibonnaci',
    disabled: false,
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof DeckSelect>;

export const English: Story = {
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (newDeckType: IFDeckType) => {
        setArgs({ deckType: newDeckType });
      };
      return (
        <NextIntlClientProvider locale='en' messages={enMessages}>
          <DeckSelect {...args} deckType={args.deckType} onChange={onChange} />
        </NextIntlClientProvider>
      );
    },
  ],
};

export const Japanese: Story = {
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (newDeckType: IFDeckType) => {
        setArgs({ deckType: newDeckType });
      };
      return (
        <NextIntlClientProvider locale='ja' messages={jaMessages}>
          <DeckSelect {...args} deckType={args.deckType} onChange={onChange} />
        </NextIntlClientProvider>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    deckType: 'fibonacci',
    disabled: true,
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (newDeckType: IFDeckType) => {
        setArgs({ deckType: newDeckType });
      };
      return (
        <NextIntlClientProvider locale='en' messages={enMessages}>
          <DeckSelect {...args} deckType={args.deckType} onChange={onChange} />
        </NextIntlClientProvider>
      );
    },
  ],
};
