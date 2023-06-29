import type { Meta, StoryObj } from '@storybook/react';

import HeaderItem from './HeaderItem';

const meta: Meta<typeof HeaderItem> = {
  component: HeaderItem,
  title: 'common/HeaderItem',
  tags: ['autodocs'],
  argTypes: {
    isLink: {
      type: { name: 'boolean', required: true },
      description: 'リンクかどうか',
    },
    href: {
      type: { name: 'string', required: false },
      description: 'リンク先。`isLink`が`true`のときは必須。',
    },
    onClick: {
      type: { name: 'function', required: false },
      description: 'クリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeaderItem>;

export const Link: Story = {
  args: {
    isLink: true,
    href: 'https://tenkir.fly.dev',
    children: 'Link',
  },
};

export const NonLink: Story = {
  args: {
    isLink: false,
    children: 'Non Link',
    onClick: () => console.log('clicked!!'),
  },
};
