import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'common/Header',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    const logo = canvas.getByRole('link', { name: 'Tenkir' });
    const supportLink = canvas.getByRole('link', { name: '開発者を支援' });
    // Action
    // Assert
    expect(logo.getAttribute('href')).toBe('/');
    expect(supportLink.getAttribute('href')).toBe('https://note.com/_at_946/n/nb84babf02d87');
    expect(supportLink.getAttribute('target')).toBe('_blank');
  },
};
