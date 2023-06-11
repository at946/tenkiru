import { Meta, StoryObj } from '@storybook/react';

import TableCardGroup from './TableCardGroup';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof TableCardGroup> = {
  component: TableCardGroup,
  title: 'Room/Table/TableCardGroup',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableCardGroup>;

const defaultMockState: MockState = mockState;
export const Default: Story = {
  args: {
    player: { ...defaultMockState.user, id: '1' },
  },
  decorators: [
    (story) => (
      <Provider store={mockStore(defaultMockState)}>
        <div className='w-60 bg-green-400 p-5'>{story()}</div>
      </Provider>
    ),
  ],
};

const cardsAreCloseMockState: MockState = {
  ...defaultMockState,
  room: { ...defaultMockState.room, areCardsOpen: false },
};
export const CardsAreClose: Story = {
  args: {
    player: { ...cardsAreCloseMockState.user, id: '1' },
  },
  decorators: [
    (story) => (
      <Provider store={mockStore(cardsAreCloseMockState)}>
        <div className='w-60 bg-green-400 p-5'>{story()}</div>
      </Provider>
    ),
  ],
};
