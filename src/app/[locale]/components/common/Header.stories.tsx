import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { within } from '@storybook/testing-library';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'common/Header',
  argTypes: {
    currentLocale: {
      description: '<b>Required</b><br />Current locale',
      table: {
        type: {
          summary: 'string',
        },
        DefaultValue: 'en',
      },
      control: { type: 'radio' },
      options: ['en', 'ja'],
    },
  },
  args: {
    currentLocale: 'en',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story, context) => (
      <NextIntlClientProvider
        locale={context.args.currentLocale}
        messages={context.args.currentLocale === 'ja' ? jaMessages : enMessages}
      >
        <Story />
      </NextIntlClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const English: Story = {
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const logo: HTMLElement = canvas.getByRole('link', { name: 'Tenkiru' });
    const twitterLink: HTMLElement = canvas.getByRole('link', {
      name: 'Share to X',
    });
    const BMCLink: HTMLElement = canvas.getByRole('link', {
      name: 'Sponser',
    });
    // Action
    // Assert
    expect(logo.getAttribute('href')).toBe('/');
    expect(BMCLink.getAttribute('href')).toBe('https://www.buymeacoffee.com/at946');
    expect(BMCLink.getAttribute('target')).toBe('_blank');
    expect(twitterLink.getAttribute('href')).toContain('https://twitter.com/intent/tweet');
    expect(twitterLink.getAttribute('target')).toBe('_blank');
  },
};

export const Japanese: Story = {
  args: {
    currentLocale: 'ja',
  },
  render: () => {
    return (
      <NextIntlClientProvider locale='ja' messages={jaMessages}>
        <Header currentLocale='ja' />
      </NextIntlClientProvider>
    );
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const logo: HTMLElement = canvas.getByRole('link', { name: 'Tenkiru' });
    const twitterLink: HTMLElement = canvas.getByRole('link', {
      name: 'Xでシェア',
    });
    const BMCLink: HTMLElement = canvas.getByRole('link', {
      name: 'Sponser',
    });
    // Action
    // Assert
    expect(logo.getAttribute('href')).toBe('/');
    expect(BMCLink.getAttribute('href')).toBe('https://www.buymeacoffee.com/at946');
    expect(BMCLink.getAttribute('target')).toBe('_blank');
    expect(twitterLink.getAttribute('href')).toContain('https://twitter.com/intent/tweet');
    expect(twitterLink.getAttribute('target')).toBe('_blank');
  },
};
