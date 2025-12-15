import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkInNewTab from './LinkInNewTab';

const meta: Meta<typeof LinkInNewTab> = {
  component: LinkInNewTab,
  title: 'Common/LinkInNewTab',
  argTypes: {
    children: {
      description: '<b>Required</b><br />Children',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    href: {
      description: '<b>Required</b><br />href attribute',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    title: {
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
