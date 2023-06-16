import type { Meta, StoryObj } from '@storybook/react';

import DeckSelect from './DeckSelect';

import { IFDeckType } from '@/interfaces/deckType';

import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { MockState, mockState, mockStore } from '@/mocks/store/store';

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
  room: { ...mockState.room, isOpenPhase: false },
};
const defaultMockStore: Store = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    disabled: false,
    extraClass: '',
    onChange: (deckType: IFDeckType) => {
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
    onChange: (deckType: IFDeckType) => {
    },
  },
  decorators: [
    (story) => {
      return <Provider store={disabledMockStore}>{story()}</Provider>;
    },
  ],
};
