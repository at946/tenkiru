import type { Meta, StoryObj } from '@storybook/react';

import DeckSelect from './DeckSelect';

import { IFDeckType } from '@/interfaces/deckType';

import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { mockState, mockStateWithUsers, mockStore } from '@/mocks/store/store';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeckSelect>;

const defaultMockState: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false },
};
const defaultMockStore: Store = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    extraClass: '',
    select: (newDeckType: IFDeckType) => {},
  },
  decorators: [
    (story) => {
      return <Provider store={defaultMockStore}>{story()}</Provider>;
    },
  ],
};

const cardsAreOpenMockState: IFRoomState = mockStateWithUsers;
const cardsAreOpenMockStore: Store = mockStore(cardsAreOpenMockState);
export const CardsAreOpen: Story = {
  args: {},
  decorators: [
    (story) => {
      return <Provider store={cardsAreOpenMockStore}>{story()}</Provider>;
    },
  ],
};
