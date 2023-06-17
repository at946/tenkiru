import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import Hands from './Hands';
import { Provider } from 'react-redux';
import { closePhaseMockState, mockStore, openPhaseMockState } from '@/mocks/store/store';
import { IFRoomState } from '@/store/roomSlice';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

const meta: Meta<typeof Hands> = {
  component: Hands,
  title: 'Room/Hands/Hands',
  tags: ['autodocs'],
  argTypes: {
    selectedValue: {
      type: { name: 'other', value: 'IFTableCard', required: true },
      description: '選択中のカード',
    },
    isDisabled: {
      type: { name: 'boolean', required: false },
      description: '手札からカードを選択できるかどうか',
    },
    onSelect: {
      type: { name: 'function', required: true },
      description: '手札からカードを選んだときに呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Hands>;

export const Fibonacci: Story = {
  args: {
    selectedValue: 1,
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: args.selectedValue === value ? null : value });
      };
      return (
        <Provider store={mockStore(closePhaseMockState)}>
          <Hands {...args} selectedValue={args.selectedValue} onSelect={onSelect} />
        </Provider>
      );
    },
  ],
};

const closePhaseSequentialMockState: IFRoomState = {
  room: {
    ...closePhaseMockState.room,
    deckType: 'sequential',
  },
};
export const Sequential: Story = {
  args: {
    selectedValue: 1,
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: value });
      };
      return (
        <Provider store={mockStore(closePhaseSequentialMockState)}>
          <Hands {...args} selectedValue={args.selectedValue} onSelect={onSelect} />;
        </Provider>
      );
    },
  ],
};

const closePhaseTShrirtSizeMockState: IFRoomState = {
  room: {
    ...closePhaseMockState.room,
    deckType: 'tShirtSize',
  },
};
export const TShirtSize: Story = {
  args: {
    selectedValue: 'S',
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onSelect = (value: IFTableCardValue) => {
        setArgs({ selectedValue: value });
      };
      return (
        <Provider store={mockStore(closePhaseTShrirtSizeMockState)}>
          <Hands {...args} selectedValue={args.selectedValue} onSelect={onSelect} />;
        </Provider>
      );
    },
  ],
};

export const Disabled: Story = {
  args: {
    selectedValue: null,
    isDisabled: true,
  },
  decorators: [
    (story) => {
      return <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>;
    },
  ],
};
