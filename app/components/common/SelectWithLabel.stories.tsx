import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import SelectWithLabel from './SelectWithLabel';

const meta: Meta<typeof SelectWithLabel> = {
  component: SelectWithLabel,
  title: 'Common/SelectWithLabel',
  tags: ['autodocs'],
  argTypes: {
    label: {
      type: { name: 'string', required: true },
      description: 'Label',
    },
    options: {
      name: 'options',
      type: { name: 'other', value: 'array object', required: true },
      description: 'selectboxの選択肢（`value`, `label`の配列）',
    },
    value: {
      name: 'value',
      type: { name: 'string', required: false },
      description: '親コンポーネントから`value`を指定する場合に使用',
      control: 'select',
      options: ['option1', 'option2', 'option3'],
    },
    disabled: {
      name: 'disabled',
      type: { name: 'boolean', required: false },
      description: 'Selectboxが利用不可かどうか',
      control: 'boolean',
    },
    onChange: {
      name: 'onChange',
      type: { name: 'function', required: false },
      description: '選択時の動作',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectWithLabel>;

export const Default: Story = {
  args: {
    label: 'Label',
    options: [
      { value: 'option1', label: 'オプション1' },
      { value: 'option2', label: 'オプション2' },
      { value: 'option3', label: 'オプション3' },
    ],
    value: 'option1',
    disabled: false,
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (value: string): void => {
        setArgs({ value: value });
      };
      return (
        <SelectWithLabel {...args} label={args.label} options={args.options} onChange={onChange} />
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
