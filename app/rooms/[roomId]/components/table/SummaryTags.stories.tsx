import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import { mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

const CardsAreOpenMockState: IFRoomState = mockState;
export const CardsAreOpen: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(AreCardsOpenMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false },
};
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};
