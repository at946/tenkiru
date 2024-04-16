import { Meta, StoryObj } from '@storybook/react';
import LinkInNewTab from './LinkInNewTab';

const meta: Meta<typeof LinkInNewTab> = {
  component: LinkInNewTab,
  title: 'Common/LinkInNewTab',
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
    href: {
      type: { required: true },
      description: 'href attribute',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
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
  },
  args: {
    children: 'Click me',
    href: 'https://tenkir.fly.dev',
    title: 'This is a link',
    ariaLabel: 'Link',
    className: '',
  },
};

export default meta;
type Story = StoryObj<typeof LinkInNewTab>;

export const Default: Story = {};
