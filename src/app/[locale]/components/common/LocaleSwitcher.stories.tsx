import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';

const meta: Meta<typeof LocaleSwitcher> = {
  component: LocaleSwitcher,
  title: 'Common/LocaleSwitcher',
  argTypes: {
    currentLocale: {
      description: '<b>Required</b><br />Current locale',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'radio' },
      options: ['en', 'ja'],
    },
    ariaLabel: {
      description: '<b>Required</b><br />aria-label attribute',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
  },
  args: {
    currentLocale: 'en',
    ariaLabel: 'switch language',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale='en'>
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LocaleSwitcher>;

export const Default: Story = {};
