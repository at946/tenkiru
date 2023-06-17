import { Meta, StoryObj } from '@storybook/react';

import TableButton from './TableButton';
import { closePhaseMockState, mockState, mockStore, openPhaseMockState } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof TableButton> = {
  component: TableButton,
  title: 'Room/Table/TableButton',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableButton>;

export const AreCardsOpen: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
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
