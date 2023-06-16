import { Meta, StoryObj } from '@storybook/react';

import HandsCard from './HandsCard';
import { Provider } from 'react-redux';
import { MockState, mockState, mockStore } from '@/mocks/store/store';
import { MemberType } from '@/interfaces/userType';

const meta: Meta<typeof HandsCard> = {
  component: HandsCard,
  title: 'Room/Hands/HandsCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HandsCard>;

const mockStateOfDefault: MockState = {
  ...mockState,
  room: { ...mockState.room, cardsAreOpen: false },
};
export const Default: Story = {
  args: {
    card: 1,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDefault)}>{story()}</Provider>],
};

export const Text: Story = {
  args: {
    card: 'XS',
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDefault)}>{story()}</Provider>],
};

const mockStateOfSelected = {
  ...mockState,
  user: { selectedCard: 1, type: 'player' as MemberType },
  room: { ...mockState.room, cardsAreOpen: false },
};
export const Selected: Story = {
  args: {
    card: 1,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfSelected)}>{story()}</Provider>],
};

const mockStateOfDisabled = mockState;
export const Disabled: Story = {
  args: {
    card: 1,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDisabled)}>{story()}</Provider>],
};

const mockStateOfSelectedAndDisabled = {
  ...mockState,
  user: { selectedCard: 1, type: 'player' as MemberType },
};
export const SelectedAndDisabled: Story = {
  args: {
    card: 1,
  },
  decorators: [
    (story) => <Provider store={mockStore(mockStateOfSelectedAndDisabled)}>{story()}</Provider>,
  ],
};
