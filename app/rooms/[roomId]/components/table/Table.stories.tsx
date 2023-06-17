import { Meta, StoryObj } from '@storybook/react';

import Table from './Table';
import { mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Room/Table/Table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const defaultMockState: IFRoomState = mockState;
export const Default: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(defaultMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: IFRoomState = {
  room: { ...defaultMockState.room, isOpenPhase: false },
};
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};

const deckIsTShirtSizeMockState: IFRoomState = {
  room: { ...defaultMockState.room, isOpenPhase: true, deckType: 'tShirtSize' },
};
export const DeckIsTShirtSize: Story = {
  args: {},
  decorators: [
    (story) => <Provider store={mockStore(deckIsTShirtSizeMockState)}>{story()}</Provider>,
  ],
};
