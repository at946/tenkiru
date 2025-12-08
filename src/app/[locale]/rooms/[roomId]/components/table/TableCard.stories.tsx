import type { Meta, StoryObj } from '@storybook/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';
import TableCard from './TableCard';

const meta: Meta<typeof TableCard> = {
  component: TableCard,
  title: 'Room/Table/TableCard',
  argTypes: {
    value: {
      description: '<b>Required</b><br />Card display value',
      table: {
        type: {
          summary: 'string | number | null',
        },
      },
    },
    isOpen: {
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
