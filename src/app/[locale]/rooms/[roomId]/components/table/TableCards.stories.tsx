import type { IFRoom } from '@/interfaces/room';
import roomState from '@/jotai/atoms/roomAtom';
import enMessages from '@/messages/en.json';
import type { Meta, StoryObj } from '@storybook/react';
import { Provider, createStore } from 'jotai';
import { NextIntlClientProvider } from 'next-intl';
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
    (story) => {
      const store = createStore();
      store.set(roomState, getRoom({ isOpenPhase: true }));

      return (
        <Provider store={store}>
          <NextIntlClientProvider locale='en' messages={enMessages}>
            {story()}
          </NextIntlClientProvider>
        </Provider>
      );
    },
  ],
};

export const ClosePhase: Story = {
  decorators: [
    (story) => {
      const store = createStore();
      store.set(roomState, getRoom({ isOpenPhase: false }));

      return (
        <Provider store={store}>
          <NextIntlClientProvider locale='en' messages={enMessages}>
            {story()}
          </NextIntlClientProvider>
        </Provider>
      );
    },
  ],
};
