import { Meta, StoryObj } from '@storybook/react';

import Button from './Button';
import { faA, faB, faC } from '@fortawesome/free-solid-svg-icons';

const icons = { faA, faB, faC };

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Common/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      type: { name: 'string', required: true },
      description: '表示文字列',
      control: 'text',
    },
    icon: {
      type: { name: 'other', value: 'fontawesome icon', required: false },
      description: 'ボタン右に表示するFontawesome Icon',
      options: Object.keys(icons),
      mapping: icons,
      control: {
        type: 'select',
        labels: {
          faA: 'A',
          faB: 'B',
          faC: 'C',
        },
      },
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
    label: 'Button',
  },
};

export const ButtonWithIcon: Story = {
  args: {
    label: 'Button with icon',
    icon: faA,
    isOutlined: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
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
    disabled: true,
  },
};
