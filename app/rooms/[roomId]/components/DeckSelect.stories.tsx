import type { Meta, StoryObj } from '@storybook/react';

import DeckSelect from './DeckSelect';
import { DeckType } from '@/interfaces/deckType';

import { Store } from '@reduxjs/toolkit';
import { setDeckType } from '@/store/roomSlice';
import { Provider } from 'react-redux';
import { MockState, mockState, mockStore } from '@/store/mocks/store';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeckSelect>;

const defaultMockState: MockState = {
  ...mockState,
  room: { ...mockState.room, cardsAreOpen: false },
};
const defaultMockStore: Store = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    extraClass: '',
    select: (deckType: DeckType) => {
      defaultMockStore.dispatch(setDeckType(deckType));
    },
  },
  decorators: [
    (story) => {
      return <Provider store={defaultMockStore}>{story()}</Provider>;
    },
  ],
};

const cardsAreOpenMockState: MockState = mockState;
const cardsAreOpenMockStore: Store = mockStore(cardsAreOpenMockState);
export const CardsAreOpen: Story = {
  args: {},
  decorators: [
    (story) => {
      return <Provider store={cardsAreOpenMockStore}>{story()}</Provider>;
    },
  ],
};
