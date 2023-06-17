import { Meta, StoryObj } from '@storybook/react';

import TableCardGroup from './TableCardGroup';
import { mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof TableCardGroup> = {
  component: TableCardGroup,
  title: 'Room/Table/TableCardGroup',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableCardGroup>;

const defaultMockState: IFRoomState = mockState;
export const Default: Story = {
  args: {},
  decorators: [
    (story) => (
      <Provider store={mockStore(defaultMockState)}>
        <div className='w-60 bg-green-400 p-5'>{story()}</div>
      </Provider>
    ),
  ],
};

const cardsAreCloseMockState: IFRoomState = {
  room: { ...defaultMockState.room, isOpenPhase: false },
};
export const CardsAreClose: Story = {
  args: {},
  decorators: [
    (story) => (
      <Provider store={mockStore(cardsAreCloseMockState)}>
        <div className='w-60 bg-green-400 p-5'>{story()}</div>
      </Provider>
    ),
  ],
};
