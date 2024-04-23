import ClipboardCopyLink from '@/app/[locale]/components/common/ClipboardCopyLink';
import MyToaster from '@/app/[locale]/components/common/MyToaster';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ClipboardCopyLink> = {
  component: ClipboardCopyLink,
  title: 'Common/ClipboardCopyLink',
  argTypes: {
    children: {
      description: '<b>Required</b><br />Children',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    copiedText: {
      type: { name: 'string' },
      description: '<b>Required</b><br />Text copied when this component is clicked',
      control: { type: 'text' },
    },
    messageOnSuccess: {
      type: { name: 'string' },
      description: '<b>Required</b><br />Message displayed when text copying is complete',
      control: { type: 'text' },
    },
    gaAction: {
      type: { name: 'string' },
      description: 'Google Analytics Action sent when this component is clicked',
      control: { type: 'text' },
    },
    className: {
      type: { name: 'string' },
      description: 'className',
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
type Story = StoryObj<typeof ClipboardCopyLink>;

export const Default: Story = {};
