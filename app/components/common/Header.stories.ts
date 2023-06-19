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
    const logo: HTMLElement = canvas.getByRole('link', { name: 'Tenkir' });
    const noteLink: HTMLElement = canvas.getByRole('link', { name: 'コーヒーで支援' });
    const twitterLink: HTMLElement = canvas.getByRole('link', { name: 'シェアで支援' });
    // Action
    // Assert
    expect(logo.getAttribute('href')).toBe('/');
    expect(noteLink.getAttribute('href')).toBe('https://note.com/_at_946/n/nb84babf02d87');
    expect(noteLink.getAttribute('target')).toBe('_blank');
    expect(twitterLink.getAttribute('href')).toContain('https://twitter.com/intent/tweet');
    expect(twitterLink.getAttribute('target')).toBe('_blank');
  },
};
