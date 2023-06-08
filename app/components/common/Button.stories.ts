import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import { faCircleDot } from '@fortawesome/free-solid-svg-icons';

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
    isOutlined: false,
    isDisabled: false,
    onClick: () => {
      alert('Clicked');
    },
  },
};

export const ButtonWithIcon: Story = {
  args: {
    label: 'Button with icon',
    icon: faCircleDot,
    isOutlined: false,
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    isDisabled: true,
  },
};

export const Outlined: Story = {
  args: {
    label: 'Outlined',
    isOutlined: true,
  },
};

export const DisabledOutlined: Story = {
  args: {
    label: 'Disabled Outlined',
    isOutlined: true,
    isDisabled: true,
  },
};
