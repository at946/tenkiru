import { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Common/Button',
  argTypes: {
    children: {
      type: { required: true },
      description: 'Children',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    color: {
      type: { required: false },
      description: 'Color',
      table: {
        type: {
          summary: 'string',
        },
        DefaultValue: 'primary',
      },
      control: { type: 'radio' },
      options: ['primary', 'secondary'],
    },
    isOutlined: {
      type: { required: false },
      description: 'Whether to apply the outline style',
      table: {
        type: {
          summary: 'boolean',
        },
        DefaultValue: false,
      },
      control: { type: 'boolean' },
    },
    disabled: {
      type: { required: false },
      description: 'Whether to be disabled or not',
      table: {
        type: {
          summary: 'boolean',
        },
        DefaultValue: false,
      },
      control: { type: 'boolean' },
    },
    title: {
      type: { required: false },
      description: 'title attribute',
      table: {
        type: {
          summary: 'string',
        },
        DefaultValue: '',
      },
      control: { type: 'text' },
    },
    ariaLabel: {
      type: { required: false },
      description: 'aria-label attribute',
      table: {
        type: {
          summary: 'string',
        },
        DefaultValue: '',
      },
      control: { type: 'text' },
    },
    className: {
      type: { required: false },
      description: 'className',
      table: {
        type: {
          summary: 'string',
        },
        DefaultValue: '',
      },
      control: { type: 'text' },
    },
    onClick: {
      type: { required: false },
      description: 'Function called when a user clicked',
      table: {
        type: {
          summary: 'function',
        },
        category: 'Events',
        DefaultValue: '',
      },
    },
  },
  args: {
    children: 'Button',
    color: 'primary',
    isOutlined: false,
    disabled: false,
    title: 'This is a button',
    ariaLabel: 'A button',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Colors: Story = {
  render: () => {
    return (
      <div className='flex gap-2'>
        <Button color='primary'>Primary</Button>
        <Button color='secondary'>Secondary</Button>
      </div>
    );
  },
};

export const Outlined: Story = {
  render: () => {
    return (
      <div className='flex gap-2'>
        <Button color='primary' isOutlined>
          Primary
        </Button>
        <Button color='secondary' isOutlined>
          Secondary
        </Button>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <div className='flex flex-row gap-2'>
        <div className='flex gap-2'>
          <Button color='primary' disabled>
            Primary
          </Button>
          <Button color='secondary' disabled>
            Secondary
          </Button>
        </div>
        <div className='flex gap-2'>
          <Button color='primary' isOutlined disabled>
            Primary
          </Button>
          <Button color='secondary' isOutlined disabled>
            Secondary
          </Button>
        </div>
      </div>
    );
  },
};
