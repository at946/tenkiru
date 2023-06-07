import { Meta, StoryObj } from '@storybook/react';

import TableButton from './TableButton';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof TableButton> = {
  component: TableButton,
  title: 'Room/Table/TableButton',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableButton>;

const cardsAreOpenMockState: MockState = {
  ...mockState,
  room: { ...mockState.room, cardsAreOpen: false },
};
export const AreCardsOpen: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreOpenMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: MockState = mockState;
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};

const noCardPutOnTableMockState: MockState = {
  ...mockState,
  room: { ...mockState.room, cardsAreOpen: false },
  members: { members: [] },
};
export const NoCardPutOnTable: Story = {
  args: {},
  decorators: [
    (story) => <Provider store={mockStore(noCardPutOnTableMockState)}>{story()}</Provider>,
  ],
};
