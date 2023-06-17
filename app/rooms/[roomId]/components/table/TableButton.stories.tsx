import { Meta, StoryObj } from '@storybook/react';

import TableButton from './TableButton';
import {
  closePhaseMockState,
  defaultMockState,
  mockStore,
  openPhaseMockState,
} from '@/mocks/store/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof TableButton> = {
  component: TableButton,
  title: 'Room/Table/TableButton',
  tags: ['autodocs'],
  argTypes: {
    clickOpenButton: {
      type: { name: 'function', required: true },
      description: '開くボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
    clickReplayButton: {
      type: { name: 'function', required: true },
      description: 'もう一度ボタンをクリックしたときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    clickOpenButton: () => {
      console.log('Click the open button!!');
    },
    clickReplayButton: () => {
      console.log('Click the replay button!!');
    },
  },
};

export default meta;
type Story = StoryObj<typeof TableButton>;

export const ClosePhase: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const OpenPhase: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};

export const ClosePhaseWithBlankCards: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(defaultMockState)}>{story()}</Provider>],
};
