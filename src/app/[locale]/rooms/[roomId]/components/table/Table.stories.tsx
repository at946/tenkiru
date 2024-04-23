import type { IFRoom } from '@/interfaces/room';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import roomState from '@/recoil/atoms/roomAtom';
import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { RecoilRoot } from 'recoil';
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
    (story) => (
      <RecoilRoot initializeState={({ set }) => set(roomState, getRoom({ isOpenPhase: true }))}>
        <NextIntlClientProvider locale='en' messages={enMessages}>
          {story()}
        </NextIntlClientProvider>
      </RecoilRoot>
    ),
  ],
};

export const ClosePhaseInEnglish: Story = {
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

export const OpenPhaseInJapanese: Story = {
  decorators: [
    (story) => (
      <RecoilRoot initializeState={({ set }) => set(roomState, getRoom({ isOpenPhase: true }))}>
        <NextIntlClientProvider locale='ja' messages={jaMessages}>
          {story()}
        </NextIntlClientProvider>
      </RecoilRoot>
    ),
  ],
};

export const ClosePhaseInJapanese: Story = {
  decorators: [
    (story) => (
      <RecoilRoot initializeState={({ set }) => set(roomState, getRoom({ isOpenPhase: false }))}>
        <NextIntlClientProvider locale='ja' messages={jaMessages}>
          {story()}
        </NextIntlClientProvider>
      </RecoilRoot>
    ),
  ],
};
