import { Meta, StoryObj } from '@storybook/react';

import HandsCards from './HandsCards';
import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/mocks/store/store';
import { DeckType } from '@/interfaces/deckType';

const meta: Meta<typeof HandsCards> = {
  component: HandsCards,
  title: 'Room/Hands/HandsCards',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HandsCards>;

const mockStateOfFibonacci = {
  room: {
    ...mockState.room,
    DeckType: 'fibonacci',
  },
};
export const Fibonacci: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfFibonacci)}>{story()}</Provider>],
};

const mockStateOfSequential = {
  ...mockState,
  room: { cardsAreOpen: false, deckType: 'sequential' as DeckType },
};
export const Sequential: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfSequential)}>{story()}</Provider>],
};

const mockStateOfTShirtSize = {
  ...mockState,
  room: { cardsAreOpen: false, deckType: 'tShirtSize' as DeckType },
};
export const TShirtSize: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfTShirtSize)}>{story()}</Provider>],
};
