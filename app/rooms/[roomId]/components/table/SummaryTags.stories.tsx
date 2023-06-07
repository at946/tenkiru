import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

const CardsAreOpenMockState: MockState = mockState;
export const CardsAreOpen: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(CardsAreOpenMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: MockState = { ...mockState, room: { ...mockState.room, cardsAreOpen: false } };
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};
