import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Select from './Select';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
  decorators: [
    (story) => {
      const [args, setArgs] = useArgs();
      const onChange = (value: string): void => {
        setArgs({ value: value });
      };
      return <Select {...args} options={args.options} onChange={onChange} />;
    },
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      { value: 'option1', label: 'オプション1' },
      { value: 'option2', label: 'オプション2' },
      { value: 'option3', label: 'オプション3' },
    ],
    value: 'option1',
    disabled: false,
    ariaLabel: 'Select box',
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    await userEvent.selectOptions(canvas.getByRole('combobox'), 'オプション1');
    await waitFor(() => {
      expect(canvas.getByRole('option', { name: 'オプション1' }).selected).toBe(true);
      expect(canvas.getByRole('option', { name: 'オプション2' }).selected).toBe(false);
      expect(canvas.getByRole('option', { name: 'オプション3' }).selected).toBe(false);
    });

    // Action
    await userEvent.selectOptions(canvas.getByRole('combobox'), 'オプション2');

    // Assert
    await waitFor(() => {
      expect(canvas.getByRole('option', { name: 'オプション1' }).selected).toBe(false);
      expect(canvas.getByRole('option', { name: 'オプション2' }).selected).toBe(true);
      expect(canvas.getByRole('option', { name: 'オプション3' }).selected).toBe(false);
    });
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    // Arrange
    const canvas = within(canvasElement);
    await waitFor(() => {
      expect(canvas.getByRole('option', { name: 'オプション1' }).selected).toBe(true);
      expect(canvas.getByRole('option', { name: 'オプション2' }).selected).toBe(false);
      expect(canvas.getByRole('option', { name: 'オプション3' }).selected).toBe(false);
    });

    // Action
    await userEvent.selectOptions(canvas.getByRole('combobox'), 'オプション2');

    // Assert
    await waitFor(() => {
      expect(canvas.getByRole('option', { name: 'オプション1' }).selected).toBe(true);
      expect(canvas.getByRole('option', { name: 'オプション2' }).selected).toBe(false);
      expect(canvas.getByRole('option', { name: 'オプション3' }).selected).toBe(false);
    });
  },
};
