import type { Meta, StoryObj } from '@storybook/react';

import RoomPage from './RoomPage';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof RoomPage> = {
  component: RoomPage,
  title: 'Pages/RoomPage',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RoomPage>;

export const Default: Story = {
  args: {
    roomId: 'xxxxx-xxxxx-xxxxx',
  },
  decorators: [
    (story) => <Provider store={mockStore(mockState)}>{story()}</Provider>
  ]
};
