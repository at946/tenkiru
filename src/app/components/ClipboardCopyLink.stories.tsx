import MyToaster from '@/app/[locale]/components/common/MyToaster';
import Button from '@/app/components/Button';
import ClipboardCopyLink from '@/app/components/ClipboardCopyLink';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ClipboardCopyLink> = {
  component: ClipboardCopyLink,
  title: 'Common/ClipboardCopyLink',
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
    copiedText: {
      type: { required: true },
      description: 'Text copied when this component is clicked',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    messageOnSuccess: {
      type: { required: true },
      description: 'Message displayed when text copying is complete',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    gaAction: {
      type: { required: false },
      description: 'Google Analytics Action sent when this component is clicked',
      table: {
        type: {
          summary: 'string',
        },
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
      },
      control: { type: 'text' },
    },
  },
  args: {
    children: 'Click me',
    copiedText: 'Hello world',
    messageOnSuccess: 'Copied',
    gaAction: 'ClipboardCopy',
    className: '',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <MyToaster />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};
