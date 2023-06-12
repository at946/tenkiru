import type { Meta, StoryObj } from '@storybook/react';

import RoomUrlCopyLink from './RoomUrlCopyLink';
import { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const meta: Meta<typeof RoomUrlCopyLink> = {
  component: RoomUrlCopyLink,
  title: 'Room/RoomUrlCopyLink',
  tags: ['autodocs'],
  argTypes: {
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加のクラス名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomUrlCopyLink>;

export const Default: Story = {
  args: {
    extraClass: '',
  },
  decorators: [
    () => (
      <div>
        <RoomUrlCopyLink>
          <span>部屋番号：xxxxx-xxxxx-xxxxx-xxxxx</span>
          <FontAwesomeIcon icon={faLink} className='ml-2' />
        </RoomUrlCopyLink>
        <Toaster toastOptions={{ success: { className: 'border border-lime-500' } }} />
      </div>
    ),
  ],
};
