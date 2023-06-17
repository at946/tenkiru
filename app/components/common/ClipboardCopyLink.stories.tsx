import type { Meta, StoryObj } from '@storybook/react';

import ClipboardCopyLink from './ClipboardCopyLink';

const meta: Meta<typeof ClipboardCopyLink> = {
  component: ClipboardCopyLink,
  title: 'Common/ClipboardCopyLink',
  tags: ['autodocs'],
  argTypes: {
    children: {
      type: { name: 'other', value: 'ReactNode', required: false },
      description: 'children',
    },
    copiedText: {
      type: { name: 'string', required: true },
      description: 'テキストをクリックしたときにクリップボードにコピーされるテキスト',
    },
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加のクラス名',
    },
    onCopied: {
      type: { name: 'function', required: false },
      description: 'コピーされたあとに親コンポーネントで行う処理',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ClipboardCopyLink>;

export const Default: Story = {
  args: {
    extraClass: '',
  },
  decorators: [
    () => (
      <div>
        <ClipboardCopyLink copiedText='Thank you!!'>Click me</ClipboardCopyLink>
      </div>
    ),
  ],
};
