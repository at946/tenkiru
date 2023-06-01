import { Meta, StoryObj } from '@storybook/react';

import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Room/Card',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    value: '1',
    extraClass: '',
    role: '',
    ariaLabel: '',
    ariaDisabled: false,
    ariaSelected: false,
  },
};
