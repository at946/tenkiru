import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { createStore, Provider } from 'jotai';
import { NextIntlClientProvider } from 'next-intl';
import type { IFRoom } from '@/interfaces/room';
import roomState from '@/jotai/atoms/roomAtom';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import Table from './Table';

const meta: Meta<typeof Table> = {
  component: Table,
  title: 'Room/Table/Table',
  argTypes: {
    className: {
      type: { name: 'string', required: false },
      description: 'className',
    },
    openCards: {
      type: { name: 'function', required: true },
      description: 'Function called on clicked the open button',
      table: {
        category: 'Events',
      },
    },
    requestToSelect: {
      typee: { name: 'function', required: true },
      description: 'Function called on clicked the ask to choose button',
      table: {
        category: 'Events',
      },
    },
    replay: {
      type: { name: 'function', required: true },
      description: 'Function called on clicked the again button',
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
  args: {
    className: '',
    openCards: () => {
      console.log('Open button was clicked');
    },
    requestToSelect: () => {
      console.log('Ask to choose button was clicked');
    },
    replay: () => {
      console.log('Again button was clicked');
    },
    nominate: () => {
      console.log('Get comments button was clicked');
    },
  },
};

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

export default meta;
type Story = StoryObj<typeof Table>;

export const OpenPhaseInEnglish: Story = {
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

export const ClosePhaseInEnglish: Story = {
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

export const OpenPhaseInJapanese: Story = {
  decorators: [
    (story) => {
      const store = createStore();
      store.set(roomState, getRoom({ isOpenPhase: true }));

      return (
        <Provider store={store}>
          <NextIntlClientProvider locale='ja' messages={jaMessages}>
            {story()}
          </NextIntlClientProvider>
        </Provider>
      );
    },
  ],
};

export const ClosePhaseInJapanese: Story = {
  decorators: [
    (story) => {
      const store = createStore();
      store.set(roomState, getRoom({ isOpenPhase: false }));

      return (
        <Provider store={store}>
          <NextIntlClientProvider locale='ja' messages={jaMessages}>
            {story()}
          </NextIntlClientProvider>
        </Provider>
      );
    },
  ],
};
