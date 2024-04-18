import { IFRoom } from '@/interfaces/room';
import enMessages from '@/messages/en.json';
import roomState from '@/recoil/atoms/roomAtom';
import { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { RecoilRoot } from 'recoil';
import TableCards from './TableCards';

const meta: Meta<typeof TableCards> = {
  component: TableCards,
  title: 'Room/Table/TableCards',
  tags: ['autodocs'],
  argTypes: {
    nominate: {
      type: { name: 'function', required: true },
      description: 'Function called on clicked get comments button',
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

const getRoom = ({ isOpenPhase }: { isOpenPhase: boolean }): IFRoom => {
  return {
    id: '1',
    deckType: 'fibonacci',
    isOpenPhase: isOpenPhase,
    users: [
      { id: '11', type: 'player', selectedCardValue: 2 },
      { id: '12', type: 'player', selectedCardValue: 5 },
      { id: '13', type: 'player', selectedCardValue: null },
      { id: '14', type: 'audience', selectedCardValue: null },
    ],
  };
};

export const OpenPhase: Story = {
  decorators: [
    (story) => (
      <RecoilRoot initializeState={({ set }) => set(roomState, getRoom({ isOpenPhase: true }))}>
        <NextIntlClientProvider locale='en' messages={enMessages}>
          {story()}
        </NextIntlClientProvider>
      </RecoilRoot>
    ),
  ],
};

export const ClosePhase: Story = {
  decorators: [
    (story) => (
      <RecoilRoot initializeState={({ set }) => set(roomState, getRoom({ isOpenPhase: false }))}>
        <NextIntlClientProvider locale='en' messages={enMessages}>
          {story()}
        </NextIntlClientProvider>
      </RecoilRoot>
    ),
  ],
};
