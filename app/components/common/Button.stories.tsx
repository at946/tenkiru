import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Common/Button',
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: { name: 'other', value: 'ReactNode', required: true },
      description: 'children',
    },
    isOutlined: {
      type: { name: 'boolean', required: false },
      description: 'Outlined styleを適用するかどうか',
    },
    disabled: {
      type: { name: 'boolean', required: false },
      description: '操作可能かどうか',
    },
    onClick: {
      type: { name: 'function', required: false },
      description: 'クリック時の動作',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    isOutlined: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    isOutlined: false,
    disabled: true,
  },
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    isOutlined: true,
    disabled: false,
  },
};

export const DisabledOutlined: Story = {
  args: {
    children: 'Button',
    isOutlined: true,
    disabled: true,
  },
};
