import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { NextIntlClientProvider } from 'next-intl';
import Footer from './Footer';

const meta: Meta<typeof Footer> = {
  component: Footer,
  title: 'common/Footer',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  decorators: [
    (story) => {
      <NextIntlClientProvider>{story()}</NextIntlClientProvider>;
    },
  ],
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const tosLink = canvas.getByRole('link', { name: '利用規約' });
    const ppLink = canvas.getByRole('link', { name: 'プライバシーポリシー' });
    const inquiryLink = canvas.getByRole('link', { name: 'お問い合わせ' });
    const copyright = canvas.getByRole('link', { name: '@asato' });
    // Action
    // Assert
    expect(tosLink.getAttribute('href')).toBe('/tos');
    expect(ppLink.getAttribute('href')).toBe('/pp');
    expect(inquiryLink.getAttribute('href')).toBe('https://twitter.com/at_946');
    expect(inquiryLink.getAttribute('target')).toBe('_blank');
    expect(copyright.getAttribute('href')).toBe('https://twitter.com/at_946');
    expect(copyright.getAttribute('target')).toBe('_blank');
  },
};
