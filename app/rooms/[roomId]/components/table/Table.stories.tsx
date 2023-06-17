import { Meta, StoryObj } from '@storybook/react';

import Table from './Table';
import { Provider } from 'react-redux';
import { closePhaseMockState, mockStore, openPhaseMockState } from '@/mocks/store/store';

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
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhase: Story = {
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};
