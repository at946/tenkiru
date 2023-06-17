import { Meta, StoryObj } from '@storybook/react';

import TableCards from './TableCards';
import { Provider } from 'react-redux';
import { closePhaseMockState, mockStore, openPhaseMockState } from '@/mocks/store/store';

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
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhase: Story = {
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};

export const BlankOpenPhase: Story = {
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const BlankClosePhase: Story = {
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};
