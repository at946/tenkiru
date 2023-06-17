import { Meta, StoryObj } from '@storybook/react';

import TableButton from './TableButton';
import { mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof TableButton> = {
  component: TableButton,
  title: 'Room/Table/TableButton',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableButton>;

const cardsAreOpenMockState: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false },
};
export const AreCardsOpen: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreOpenMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: IFRoomState = mockState;
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};

const noCardPutOnTableMockState: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false },
};
export const NoCardPutOnTable: Story = {
  args: {},
  decorators: [
    (story) => <Provider store={mockStore(noCardPutOnTableMockState)}>{story()}</Provider>,
  ],
};
