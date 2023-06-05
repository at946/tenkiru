import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import { faCircleDot, faXmark } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Common/Button',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: 'Button',
    icon: faCircleDot,
    onClick: () => { alert('Clicked') },
  },
};

export const ButtonWithIcon: Story = {
  args: {
    label: 'Button without icon',
  }
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    icon: faXmark,
    isDisabled: true,
  }
}