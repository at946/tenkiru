import type { Meta, StoryObj } from '@storybook/react';

import Footer from './Footer';
import '@/styles/globals.css';

export default {
  component: Footer,
  title: 'common/Footer',
  tags: ['autodocs'],
} as Meta<typeof Footer>;

export const Default: StoryObj<typeof Footer> = {};
