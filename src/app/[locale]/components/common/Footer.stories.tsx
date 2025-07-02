import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { NextIntlClientProvider } from 'next-intl';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'common/Footer',
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const English: Story = {
  render: () => {
    return (
      <NextIntlClientProvider locale='en' messages={enMessages}>
        <Footer />
      </NextIntlClientProvider>
    );
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const tosLink = canvas.getByRole('link', { name: 'Terms of Use' });
    const ppLink = canvas.getByRole('link', { name: 'Privacy Policy' });
    const inquiryLink = canvas.getByRole('link', { name: 'Contact Us' });
    const copyright = canvas.getByRole('link', { name: '@asato' });
    // Action
    // Assert
    expect(tosLink.getAttribute('href')).toBe('/en/tos');
    expect(ppLink.getAttribute('href')).toBe('/en/pp');
    expect(inquiryLink.getAttribute('href')).toBe('https://twitter.com/at_946');
    expect(inquiryLink.getAttribute('target')).toBe('_blank');
    expect(copyright.getAttribute('href')).toBe('https://twitter.com/at_946');
    expect(copyright.getAttribute('target')).toBe('_blank');
  },
};

export const Japanese: Story = {
  render: () => {
    return (
      <NextIntlClientProvider locale='ja' messages={jaMessages}>
        <Footer />
      </NextIntlClientProvider>
    );
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const tosLink = canvas.getByRole('link', { name: '利用規約' });
    const ppLink = canvas.getByRole('link', { name: 'プライバシーポリシー' });
    const inquiryLink = canvas.getByRole('link', { name: 'お問い合わせ' });
    const copyright = canvas.getByRole('link', { name: '@asato' });
    // Action
    // Assert
    expect(tosLink.getAttribute('href')).toBe('/ja/tos');
    expect(ppLink.getAttribute('href')).toBe('/ja/pp');
    expect(inquiryLink.getAttribute('href')).toBe('https://twitter.com/at_946');
    expect(inquiryLink.getAttribute('target')).toBe('_blank');
    expect(copyright.getAttribute('href')).toBe('https://twitter.com/at_946');
    expect(copyright.getAttribute('target')).toBe('_blank');
  },
};
