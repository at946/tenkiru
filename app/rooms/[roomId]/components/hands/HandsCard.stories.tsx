import { Meta, StoryObj } from '@storybook/react';

import HandsCard from './HandsCard';
import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/mocks/store/store';
import { IFRoomState } from '@/store/roomSlice';

const meta: Meta<typeof HandsCard> = {
  component: HandsCard,
  title: 'Room/Hands/HandsCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HandsCard>;

const mockStateOfDefault: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false },
};
export const Default: Story = {
  args: {
    value: 1,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDefault)}>{story()}</Provider>],
};

export const Text: Story = {
  args: {
    value: 'XS',
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDefault)}>{story()}</Provider>],
};

const mockStateOfSelected: IFRoomState = {
  room: { ...mockState.room, isOpenPhase: false },
};
export const Selected: Story = {
  args: {
    value: 1,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfSelected)}>{story()}</Provider>],
};

const mockStateOfDisabled = mockState;
export const Disabled: Story = {
  args: {
    value: 1,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDisabled)}>{story()}</Provider>],
};

const mockStateOfSelectedAndDisabled: IFRoomState = mockStateOfDefault;
export const SelectedAndDisabled: Story = {
  args: {
    value: 1,
  },
  decorators: [
    (story) => <Provider store={mockStore(mockStateOfSelectedAndDisabled)}>{story()}</Provider>,
  ],
};
