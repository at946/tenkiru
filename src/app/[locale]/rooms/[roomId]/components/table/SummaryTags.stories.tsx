import type { IFRoom } from '@/interfaces/room';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import roomState from '@/recoil/atoms/roomAtom';
import type { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { RecoilRoot } from 'recoil';
import SummaryTags from './SummaryTags';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  argTypes: {
    className: {
      type: { name: 'string', required: false },
      description: 'className',
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
      return (
        <RecoilRoot initializeState={({ set }) => set(roomState, room)}>
          <NextIntlClientProvider locale='en' messages={enMessages}>
            {story()}
          </NextIntlClientProvider>
        </RecoilRoot>
      );
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
      return (
        <RecoilRoot initializeState={({ set }) => set(roomState, room)}>
          <NextIntlClientProvider locale='en' messages={enMessages}>
            {story()}
          </NextIntlClientProvider>
        </RecoilRoot>
      );
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
      return (
        <RecoilRoot initializeState={({ set }) => set(roomState, room)}>
          <NextIntlClientProvider locale='en' messages={enMessages}>
            {story()}
          </NextIntlClientProvider>
        </RecoilRoot>
      );
    },
  ],
};

export const Japanese: Story = {
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
      return (
        <RecoilRoot initializeState={({ set }) => set(roomState, room)}>
          <NextIntlClientProvider locale='ja' messages={jaMessages}>
            {story()}
          </NextIntlClientProvider>
        </RecoilRoot>
      );
    },
  ],
};
