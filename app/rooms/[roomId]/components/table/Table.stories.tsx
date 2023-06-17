import { Meta, StoryObj } from '@storybook/react';

import Table from './Table';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Room/Table/Table',
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: { name: 'other', value: 'ReactNode', required: false },
      description: 'children',
    },
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加のクラス',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Default: Story = {};
