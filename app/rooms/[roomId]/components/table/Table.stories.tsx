import { Meta, StoryObj } from '@storybook/react';

import Table from './Table';
import { MockState, mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Room/Table/Table',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const defaultMockState: MockState = mockState;
export const Default: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(defaultMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: MockState = {
  ...defaultMockState,
  room: { ...defaultMockState.room, cardsAreOpen: false },
};
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};

const deckIsTShirtSizeMockState: MockState = {
  ...defaultMockState,
  room: { cardsAreOpen: true, deckType: 'tShirtSize' },
};
export const DeckIsTShirtSize: Story = {
  args: {},
  decorators: [
    (story) => <Provider store={mockStore(deckIsTShirtSizeMockState)}>{story()}</Provider>,
  ],
};
