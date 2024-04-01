import { IFRoom } from '@/interfaces/room';
import roomState from '@/recoil/atoms/roomAtom';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import TableButtons from './TableButtons';

const meta: Meta<typeof TableButtons> = {
  component: TableButtons,
  title: 'Room/Table/TableButtons',
  tags: ['autodocs'],
  argTypes: {
    clickOpenButton: {
      type: { name: 'function', required: true },
      description: '開くボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    clickRequestToSelectButton: {
      type: { name: 'function', required: true },
      description: '早く選んでボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    clickReplayButton: {
      type: { name: 'function', required: true },
      description: 'もう一度ボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    clickOpenButton: () => {
      console.log('Click the open button!!');
    },
    clickRequestToSelectButton: () => {
      console.log('Click the request to select button!!');
    },
    clickReplayButton: () => {
      console.log('Click the replay button!!');
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableButtons>;

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

export const ClosePhaseWithOnlyBlankCards: Story = {
  decorators: [
    (story) => {
      const room: IFRoom = {
        id: '1',
        deckType: 'fibonacci',
        isOpenPhase: false,
        users: [
          { id: '11', type: 'player', selectedCardValue: null },
          { id: '12', type: 'player', selectedCardValue: null },
          { id: '13', type: 'player', selectedCardValue: null },
          { id: '14', type: 'audience', selectedCardValue: null },
        ],
      };
      return <RecoilRoot initializeState={({ set }) => set(roomState, room)}>{story()}</RecoilRoot>;
    },
  ],
};

export const ClosePhaseWithNoBlankCard: Story = {
  decorators: [
    (story) => {
      const room: IFRoom = {
        id: '1',
        deckType: 'fibonacci',
        isOpenPhase: false,
        users: [
          { id: '11', type: 'player', selectedCardValue: 2 },
          { id: '12', type: 'player', selectedCardValue: 5 },
          { id: '13', type: 'player', selectedCardValue: 2 },
          { id: '14', type: 'audience', selectedCardValue: null },
        ],
      };
      return <RecoilRoot initializeState={({ set }) => set(roomState, room)}>{story()}</RecoilRoot>;
    },
  ],
};
