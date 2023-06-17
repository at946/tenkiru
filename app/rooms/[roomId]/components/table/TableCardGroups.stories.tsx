import { Meta, StoryObj } from '@storybook/react';

import TableCardGroups from './TableCardGroups';
import { mockState, mockStore } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof TableCardGroups> = {
  component: TableCardGroups,
  title: 'Room/Table/TableCardGroups',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableCardGroups>;

const defaultMockState: IFRoomState = mockState;
export const Default: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(defaultMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: IFRoomState = {
  room: { ...defaultMockState.room, isOpenPhase: false },
};
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};
