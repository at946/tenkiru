import { Meta, StoryObj } from '@storybook/react';

import TableButtons from './TableButtons';
import {
  closePhaseMockState,
  defaultMockState,
  mockStore,
  openPhaseMockState,
} from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof TableButtons> = {
  component: TableButtons,
  title: 'Room/Table/TableButtons',
  tags: ['autodocs'],
  argTypes: {
    clickOpenButton: {
      type: { name: 'function', required: true },
      description: '開くボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    clickRequestToSelectButton: {
      type: { name: 'function', required: true },
      description: '早く選んでボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    clickReplayButton: {
      type: { name: 'function', required: true },
      description: 'もう一度ボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    clickOpenButton: () => {
      console.log('Click the open button!!');
    },
    clickRequestToSelectButton: () => {
      console.log('Click the request to select button!!');
    },
    clickReplayButton: () => {
      console.log('Click the replay button!!');
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableButtons>;

export const ClosePhase: Story = {
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};

export const OpenPhase: Story = {
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhaseWithOnlyBlankCards: Story = {
  decorators: [(story) => <Provider store={mockStore(defaultMockState)}>{story()}</Provider>],
};

const closePhaseWithNoBlankCard: IFRoomState = {
  room: {
    ...defaultMockState.room,
    users: [
      {
        id: '11111',
        type: 'player',
        selectedCardValue: 2,
      },
    ],
  },
};
export const ClosePhaseWithNoBlankCard: Story = {
  decorators: [
    (story) => <Provider store={mockStore(closePhaseWithNoBlankCard)}>{story()}</Provider>,
  ],
};
