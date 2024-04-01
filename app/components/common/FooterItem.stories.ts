import type { Meta, StoryObj } from '@storybook/react';
import FooterItem from './FooterItem';

const meta: Meta<typeof FooterItem> = {
  component: FooterItem,
  title: 'common/FooterItem',
  tags: ['autodocs'],
  argTypes: {
    href: {
      type: { name: 'string', required: true },
      description: '遷移先。内部リンクは`/`から始まる。',
    },
  },
};

export default meta;
type Story = StoryObj<typeof FooterItem>;

export const Internal: Story = {
  args: {
    href: '/',
    children: 'Internal Link',
  },
};

export const External: Story = {
  args: {
    href: 'https://tenkir.fly.dev',
    children: 'External Link',
  },
};
