import type { Meta, StoryObj } from '@storybook/react';

import DeckSelect from './DeckSelect';
import { DeckType } from '@/interfaces/deckType';

import { Provider } from 'react-redux';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Store } from '@reduxjs/toolkit';
import { setDeckType } from '@/store/roomSlice';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      type: { name: 'boolean', required: false },
      description: 'このコンポーネントの利用可否',
    },
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加で適用するクラス名',
    },
    onChange: {
      type: { name: 'function', required: true },
      description: '選択肢の変更時に呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeckSelect>;

const defaultMockState: MockState = {
  ...mockState,
  room: { ...mockState.room, areCardsOpen: false },
};
const defaultMockStore: Store = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    disabled: false,
    extraClass: '',
    onChange: (deckType: DeckType) => {
      defaultMockStore.dispatch(setDeckType(deckType));
    },
  },
  decorators: [
    (story) => {
      return <Provider store={defaultMockStore}>{story()}</Provider>;
    },
  ],
};

const disabledMockState: MockState = mockState;
const disabledMockStore: Store = mockStore(disabledMockState);
export const Disabled: Story = {
  args: {
    disabled: true,
    extraClass: '',
    onChange: (deckType: DeckType) => {
      disabledMockStore.dispatch(setDeckType(deckType));
    },
  },
  decorators: [
    (story) => {
      return <Provider store={disabledMockStore}>{story()}</Provider>;
    },
  ],
};
