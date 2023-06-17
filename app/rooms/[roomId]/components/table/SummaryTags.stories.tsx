import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import { closePhaseMockState, mockStore, openPhaseMockState } from '@/mocks/store/store';
import { Provider } from 'react-redux';
import getTableCardsFromUsers from '../../utils/getTableCardsFromUsers';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
  argTypes: {
    tableCards: {
      type: { name: 'other', value: 'IFTableCard', required: true },
      description: 'サマライズしたいテーブルカードの配列',
    },
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加で適用するクラス名',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

export const OpenPhase: Story = {
  args: {
    tableCards: getTableCardsFromUsers(openPhaseMockState.room.users),
  },
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhase: Story = {
  args: {
    tableCards: getTableCardsFromUsers(closePhaseMockState.room.users),
  },
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};

export const NoNumberValueExistsOnOpenPhase: Story = {
  args: {
    tableCards: [
      {
        playerId: 'aaaaa',
        value: 'XS',
      },
    ],
  },
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};
