import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Common/Select',
  tags: ['autodocs'],
  args: {
    options: [
      { value: 'option1', label: 'オプション1' },
      { value: 'option2', label: 'オプション2' },
      { value: 'option3', label: 'オプション3' },
    ],
  },
  argTypes: {
    value: {
      control: {
        type: 'select',
      },
      options: ['option1', 'option2', 'option3'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    value: 'option1',
    ariaLabel: 'Select',
    disabled: false,
    extraClass: '',
    onChange: (value: string) => {
      console.log('selectedValue:', value);
    },
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
