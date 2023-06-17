import { Meta, StoryObj } from '@storybook/react';
import RoomInfo from './RoomInfo';
import MyToaster from '@/app/components/common/MyToaster';

const meta: Meta<typeof RoomInfo> = {
  component: RoomInfo,
  title: 'Room/RoomInfo',
  tags: ['autodocs'],
  argTypes: {
    roomId: {
      type: { name: 'string', required: true },
      description: '部屋番号。この値はクリップボードにコピーするテキストに利用します。',
    },
    extraClass: {
      type: { name: 'string', required: false },
      description: 'コンポーネント外からclassを適用します。',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoomInfo>;

export const Default: Story = {
  args: {
    roomId: 'xxxxx-xxxxx-xxxxx-xxxxx',
  },
  decorators: [
    (story) => (
      <div>
        {story()}
        <MyToaster />
      </div>
    ),
  ],
};
