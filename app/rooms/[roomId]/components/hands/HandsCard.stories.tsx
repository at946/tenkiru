import { Meta, StoryObj } from '@storybook/react';

import HandsCard from './HandsCard';
import { Provider } from 'react-redux';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { MemberType } from '@/interfaces/memberType';

const meta: Meta<typeof HandsCard> = {
  component: HandsCard,
  title: 'Room/Hands/HandsCard',
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: { name: 'other', value: 'card', required: true },
      description: 'カードの値',
    },
    disabled: {
      type: { name: 'boolean', required: false },
      description: '選択可能かどうか',
    },
    selected: {
      type: { name: 'boolean', required: false },
      description: '選択中のカードかどうか',
    },
    onSelect: {
      type: { name: 'function', required: true },
      description: 'カードを選択したときに呼び出される親コンポーネントの関数',
    }
  }
};

export default meta;
type Story = StoryObj<typeof HandsCard>;

const mockStateOfDefault: MockState = {
  ...mockState,
  room: { ...mockState.room, areCardsOpen: false },
};
export const Default: Story = {
  args: {
    value: 1,
    selected: false,
    disabled: false,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDefault)}>{story()}</Provider>],
};

export const Text: Story = {
  args: {
    ...Default.args,
    value: 'XS',
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDefault)}>{story()}</Provider>],
};

const mockStateOfSelected = {
  ...mockState,
  user: { selectedCard: 1, type: 'player' as MemberType },
  room: { ...mockState.room, areCardsOpen: false },
};
export const Selected: Story = {
  args: {
    ...Default.args,
    selected: true,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfSelected)}>{story()}</Provider>],
};

const mockStateOfDisabled = mockState;
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
  decorators: [(story) => <Provider store={mockStore(mockStateOfDisabled)}>{story()}</Provider>],
};

const mockStateOfSelectedAndDisabled = {
  ...mockState,
  user: { selectedCard: 1, type: 'player' as MemberType },
};
export const SelectedAndDisabled: Story = {
  args: {
    ...Default.args,
    selected: true,
    disabled: true,
  },
  decorators: [
    (story) => <Provider store={mockStore(mockStateOfSelectedAndDisabled)}>{story()}</Provider>,
  ],
};
