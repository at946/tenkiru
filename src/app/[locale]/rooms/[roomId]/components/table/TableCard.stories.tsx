import enMessages from '@/messages/en.json';
import { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import TableCard from './TableCard';

const meta: Meta<typeof TableCard> = {
  component: TableCard,
  title: 'Room/Table/TableCard',
  argTypes: {
    value: {
      type: { name: 'string | number | null', required: true },
      description: 'Card display value',
    },
    isOpen: {
      type: { required: false },
      table: {
        type: {
          summary: 'boolean',
        },
      },
      description: 'Whether to be open or close',
    },
  },
  args: {
    value: 1,
    isOpen: true,
  },
  decorators: [
    (story) => (
      <NextIntlClientProvider locale='en' messages={enMessages}>
        {story()}
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TableCard>;

export const NotBlankAndOpen: Story = {};

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
