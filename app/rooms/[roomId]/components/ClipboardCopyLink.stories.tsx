import type { Meta, StoryObj } from '@storybook/react';

import ClipboardCopyLink from './ClipboardCopyLink';
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof ClipboardCopyLink> = {
  component: ClipboardCopyLink,
  title: 'Room/ClipboardCopyLink',
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
        <ClipboardCopyLink copiedText='http://localhost:3000/rooms/xxxxx-xxxxx-xxxxx-xxxxx'>
          <span>部屋番号：xxxxx-xxxxx-xxxxx-xxxxx</span>
          <FontAwesomeIcon icon={faLink} className='ml-2' />
        </ClipboardCopyLink>
      </div>
    ),
  ],
};
