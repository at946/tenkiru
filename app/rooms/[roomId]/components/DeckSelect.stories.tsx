import type { Meta, StoryObj } from '@storybook/react';

import DeckSelect from './DeckSelect';

import { IFDeckType } from '@/interfaces/deckType';

import { Store } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import {
  closePhaseMockState,
  mockStore,
  openPhaseMockState,
} from '@/mocks/store/store';
import { updateRoom } from '@/store/roomSlice';
import { IFRoom } from '@/interfaces/room';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  tags: ['autodocs'],
  argTypes: {
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

const closePhaseMockStore: Store = mockStore(closePhaseMockState);
export const ClosePhase: Story = {
  args: {
    onChange: (newDeckType: IFDeckType) => {
      const newState: IFRoom = { ...closePhaseMockState.room, deckType: newDeckType};
      closePhaseMockStore.dispatch(
        updateRoom(newState),
      );
    },
  },
  decorators: [
    (story) => {
      return <Provider store={closePhaseMockStore}>{story()}</Provider>;
    },
  ],
};

const openPhaseMockStore: Store = mockStore(openPhaseMockState);
export const OpenPhase: Story = {
  args: {},
  decorators: [
    (story) => {
      return <Provider store={openPhaseMockStore}>{story()}</Provider>;
    },
  ],
};
