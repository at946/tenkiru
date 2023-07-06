import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';

import { IFRoom } from '@/interfaces/room';

// recoil
import { RecoilRoot } from 'recoil';
import roomState from '@/recoil/atoms/roomAtom';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
  argTypes: {
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加で適用するクラス名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

export const OpenPhase: Story = {
  decorators: [
    (story) => {
      const room: IFRoom = {
        id: '1',
        deckType: 'fibonacci',
        isOpenPhase: true,
        users: [
          { id: '11', type: 'player', selectedCardValue: 2 },
          { id: '12', type: 'player', selectedCardValue: 3 },
          { id: '13', type: 'player', selectedCardValue: 5 },
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
          { id: '12', type: 'player', selectedCardValue: 3 },
          { id: '13', type: 'player', selectedCardValue: 5 },
          { id: '14', type: 'audience', selectedCardValue: null },
        ],
      };
      return <RecoilRoot initializeState={({ set }) => set(roomState, room)}>{story()}</RecoilRoot>;
    },
  ],
};

export const OpenPhaseWithNoNumberCard: Story = {
  decorators: [
    (story) => {
      const room: IFRoom = {
        id: '1',
        deckType: 'fibonacci',
        isOpenPhase: true,
        users: [
          { id: '11', type: 'player', selectedCardValue: '?' },
          { id: '12', type: 'player', selectedCardValue: '?' },
          { id: '13', type: 'player', selectedCardValue: null },
          { id: '14', type: 'audience', selectedCardValue: null },
        ],
      };
      return <RecoilRoot initializeState={({ set }) => set(roomState, room)}>{story()}</RecoilRoot>;
    },
  ],
};
