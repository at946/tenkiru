import type { Meta, StoryObj } from '@storybook/react';

import Select from './Select';

export default {
  component: Select,
  title: 'Common/Select',
  tags: ['autodocs'],
} as Meta<typeof Select>;

export const Default: StoryObj<typeof Select> = {
  args: {
    options: [
      { value: 'option1', label: 'オプション1' },
      { value: 'option2', label: 'オプション2' },
      { value: 'option3', label: 'オプション3' },
    ],
    value: 'option2',
    ariaLabel: 'Select',
    extraClass: '',
    onChange: (value: string) => { console.log('selectedValue:', value) },
  }
};
