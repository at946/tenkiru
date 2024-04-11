import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import Select from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Common/Select',
  tags: ['autodocs'],
  argTypes: {
    options: {
      name: 'options',
      type: { name: 'other', value: 'array object', required: true },
      description: '選択肢（`value`, `label`の配列）',
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
      description: '利用不可かどうか',
      control: 'boolean',
    },
    ariaLabel: {
      name: 'ariaLabel',
      type: { name: 'string', required: false },
      description: 'aria-label属性',
      control: 'text',
      table: {
        category: 'a11y',
      },
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
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', displayValue: 'オプション1' },
      { value: 'option2', displayValue: 'オプション2' },
      { value: 'option3', displayValue: 'オプション3' },
    ],
    value: 'option1',
    disabled: false,
    ariaLabel: 'Select box',
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (value: string): void => {
        setArgs({ value: value });
      };
      return <Select {...args} options={args.options} onChange={onChange} />;
    },
  ],
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};
