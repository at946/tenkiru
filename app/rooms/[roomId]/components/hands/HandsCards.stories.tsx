import { Meta, StoryObj } from '@storybook/react';

import HandsCards from './HandsCards';
import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/store/mocks/store';
import { DeckType } from '@/interfaces/deckType';

const meta: Meta<typeof HandsCards> = {
  component: HandsCards,
  title: 'Room/Hands/HandsCards',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HandsCards>;

const mockStateOfFibonacci = {
  ...mockState,
  room: { areCardsOpen: false, deckType: 'fibonacci' as DeckType },
};
export const Fibonacci: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfFibonacci)}>{story()}</Provider>],
};

const mockStateOfSequential = {
  ...mockState,
  room: { areCardsOpen: false, deckType: 'sequential' as DeckType },
};
export const Sequential: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfSequential)}>{story()}</Provider>],
};

const mockStateOfTShirtSize = {
  ...mockState,
  room: { areCardsOpen: false, deckType: 'tShirtSize' as DeckType },
};
export const TShirtSize: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfTShirtSize)}>{story()}</Provider>],
};
