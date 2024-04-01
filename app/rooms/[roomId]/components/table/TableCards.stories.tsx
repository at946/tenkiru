import { IFRoom } from '@/interfaces/room';
import roomState from '@/recoil/atoms/roomAtom';
import { Meta, StoryObj } from '@storybook/react';
import { RecoilRoot } from 'recoil';
import TableCards from './TableCards';

const meta: Meta<typeof TableCards> = {
  component: TableCards,
  title: 'Room/Table/TableCards',
  tags: ['autodocs'],
  argTypes: {
    nominate: {
      type: { name: 'function', required: true },
      description: '指名ボタンを選択したときに呼び出される関数',
      TableCards: {
        category: 'Events',
      },
    },
  },
  args: {
    nominate: (userId: string) => {
      console.log(`${userId}を指名しました！`);
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableCards>;

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
