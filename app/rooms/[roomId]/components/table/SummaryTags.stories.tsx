import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import { MockState, mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

const AreCardsOpenMockState: MockState = mockState;
export const AreCardsOpen: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(AreCardsOpenMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: MockState = {
  ...mockState,
  room: { ...mockState.room, areCardsOpen: false },
};
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};
