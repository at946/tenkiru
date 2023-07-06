import { Meta, StoryObj } from '@storybook/react';

import Table from './Table';

import { IFRoom } from '@/interfaces/room';

// recoil
import { RecoilRoot } from 'recoil';
import roomState from '@/recoil/atoms/roomAtom';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Room/Table/Table',
  tags: ['autodocs'],
  argTypes: {
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加のクラス',
    },
    openCards: {
      type: { name: 'function', required: true },
      description: '開くボタンを選択したときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    replay: {
      type: { name: 'function', required: true },
      description: 'もう一度ボタンを選択したときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    nominate: {
      type: { name: 'function', required: true },
      description: '指名ボタンを選択したときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const OpenPhase: Story = {
  decorators: [
    (story) => {
      const room: IFRoom = {
        id: '1',
        deckType: 'fibonacci',
        isOpenPhase: true,
        users: [
          { id: '11', type: 'player', selectedCardValue: 2 },
          { id: '12', type: 'player', selectedCardValue: 5 },
          { id: '13', type: 'player', selectedCardValue: null },
          { id: '14', type: 'audience', selectedCardValue: null },
        ],
      };
      return <RecoilRoot initializeState={({ set }) => set(roomState, room)}>{story()}</RecoilRoot>;
    },
  ],
};

export const ClosePhase: Story = {
  decorators: [
    (story) => {
      const room: IFRoom = {
        id: '1',
        deckType: 'fibonacci',
        isOpenPhase: false,
        users: [
          { id: '11', type: 'player', selectedCardValue: 2 },
          { id: '12', type: 'player', selectedCardValue: 5 },
          { id: '13', type: 'player', selectedCardValue: null },
          { id: '14', type: 'audience', selectedCardValue: null },
        ],
      };
      return <RecoilRoot initializeState={({ set }) => set(roomState, room)}>{story()}</RecoilRoot>;
    },
  ],
};
