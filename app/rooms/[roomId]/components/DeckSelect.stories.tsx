import type { Meta, StoryObj } from '@storybook/react';

import DeckSelect from './DeckSelect';
import { DeckType } from '@/interfaces/deckType';

import { configureStore } from '@reduxjs/toolkit';
import { roomSlice, setCardsAreOpen, setDeckType } from '@/store/roomSlice';
import { Provider } from 'react-redux';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DeckSelect>;

const mockState = {
  cardsAreOpen: false,
  deckType: 'fibonacci',
};

const mockStore = (state) =>
  configureStore({
    reducer: {
      room: roomSlice.reducer,
    },
    preloadedState: {
      room: state,
    },
  });

const defaultMockStore = mockStore(mockState);
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

const cardsAreOpenMockStore = mockStore({ ...mockState, cardsAreOpen: true });
export const CardsAreOpen: Story = {
  args: {},
  decorators: [
    (story) => {
      return <Provider store={cardsAreOpenMockStore}>{story()}</Provider>;
    },
  ],
};
