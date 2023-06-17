import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import {
  closePhaseMockState,
  defaultMockState,
  mockStore,
  openPhaseMockState,
} from '@/mocks/store/store';
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
  args: {},
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhase: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};

const NoNumberValueExistsOnOpenPhaseMockState: IFRoomState = {
  room: {
    ...defaultMockState,
    isOpenPhase: true,
    users: [
      {
        id: 'aaaaa',
        type: 'player',
        selectedCardValue: 'XS',
      },
    ],
  },
};
export const NoNumberValueExistsOnOpenPhase: Story = {
  args: {},
  decorators: [
    (story) => (
      <Provider store={mockStore(NoNumberValueExistsOnOpenPhaseMockState)}>{story()}</Provider>
    ),
  ],
};
