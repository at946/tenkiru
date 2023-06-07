import type { Meta, StoryObj } from '@storybook/react';

import FooterItem from './FooterItem';

export default {
  component: FooterItem,
  title: 'common/FooterItem',
  tags: ['autodocs'],
} as Meta<typeof FooterItem>;

export const Default: StoryObj<typeof FooterItem> = {
  args: {
    href: '/',
    text: 'Internal Link',
  },
};

export const External: StoryObj<typeof FooterItem> = {
  args: {
    href: 'https://tenkir.fly.dev',
    text: 'External Link',
  },
};
