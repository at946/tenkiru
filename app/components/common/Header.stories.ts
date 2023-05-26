import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';
import '@/styles/globals.css';

export default {
  component: Header,
  title: 'common/Header',
  tags: ['autodocs'],
} as Meta<typeof Header>;

export const Default: StoryObj<typeof Header> = {
  args: {},
};
