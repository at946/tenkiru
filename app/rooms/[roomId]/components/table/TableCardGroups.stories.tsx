import { Meta, StoryObj } from '@storybook/react';

import TableCardGroups from './TableCardGroups';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof TableCardGroups> = {
  component: TableCardGroups,
  title: 'Room/Table/TableCardGroups',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableCardGroups>;

const defaultMockState: MockState = mockState;
export const Default: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(defaultMockState)}>{story()}</Provider>],
};

const cardsAreCloseMockState: MockState = { ...defaultMockState, room: { ...defaultMockState.room, cardsAreOpen: false } };
export const CardsAreClose: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(cardsAreCloseMockState)}>{story()}</Provider>],
};
