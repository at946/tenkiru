import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import { closePhaseMockState, mockStore, openPhaseMockState } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
  argTypes: {
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加で適用するクラス名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

export const OpenPhase: Story = {
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhase: Story = {
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};

const openPhaseWithNoNumberCardMockState: IFRoomState = {
  room: {
    ...openPhaseMockState.room,
    users: [
      {
        id: '11111',
        type: 'player',
        selectedCardValue: 'M',
      },
      {
        id: '22222',
        type: 'player',
        selectedCardValue: null,
      },
      {
        id: '33333',
        type: 'audience',
        selectedCardValue: null,
      },
    ],
  },
};
export const OpenPhaseWithNoNumberCard: Story = {
  decorators: [
    (story) => <Provider store={mockStore(openPhaseWithNoNumberCardMockState)}>{story()}</Provider>,
  ],
};
