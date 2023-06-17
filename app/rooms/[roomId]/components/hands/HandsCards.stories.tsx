import { Meta, StoryObj } from '@storybook/react';

import HandsCards from './HandsCards';
import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/mocks/store/store';
import { IFDeckType } from '@/interfaces/deckType';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof HandsCards> = {
  component: HandsCards,
  title: 'Room/Hands/HandsCards',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HandsCards>;

const mockStateOfFibonacci: IFRoomState = {
  room: {
    ...mockState.room,
    deckType: 'fibonacci',
  },
};
export const Fibonacci: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfFibonacci)}>{story()}</Provider>],
};

const mockStateOfSequential: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false, deckType: 'sequential' },
};
export const Sequential: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfSequential)}>{story()}</Provider>],
};

const mockStateOfTShirtSize: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false, deckType: 'tShirtSize' as IFDeckType },
};
export const TShirtSize: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(mockStateOfTShirtSize)}>{story()}</Provider>],
};
