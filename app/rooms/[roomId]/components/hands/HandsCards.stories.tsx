import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/client-api';

import HandsCards from './HandsCards';
import { IFTableCardValue } from '@/interfaces/tableCardValue';

const meta: Meta<typeof HandsCards> = {
  component: HandsCards,
  title: 'Room/Hands/HandsCards',
  tags: ['autodocs'],
  // argTypes: {
  //   deckType: {
  //     type: { name: 'other', value: 'deckType', required: true },
  //     description: 'デッキタイプ',
  //     control: {
  //       control: 'select',
  //       options: ['option1', 'option2', 'option3'],
  //     },
  //   },
  //   selectedCard: {
  //     type: { name: 'other', value: 'card', required: false },
  //     description: '選択中のカード。プレイヤーの場合に設定',
  //   },
  //   disabled: {
  //     type: { name: 'boolean', required: false },
  //     description: '手札カードの選択可否',
  //   },
  //   updateSelectedCard: {
  //     type: { name: 'function', required: true },
  //     description: '選択中のカードを更新するときに呼び出す親コンポーネントの関数',
  //     table: {
  //       category: 'Events',
  //     },
  //   },
  // },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const updateSelectedCard = (card: IFTableCardValue) => {
        setArgs({ selectedCard: card });
      };
      return (
        <HandsCards {...args} updateSelectedCard={updateSelectedCard} />
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof HandsCards>;

export const Fibonacci: Story = {
  args: {
    deckType: 'fibonacci',
    selectedCard: 1,
    disabled: false,
  },
};

export const Sequential: Story = {
  args: {
    deckType: 'sequential',
    selectedCard: 1,
  },
};

export const TShirtSize: Story = {
  args: {
    deckType: 'tShirtSize',
    selectedCard: 'S',
  },
};

export const Disabled: Story = {
  args: {
    ...Fibonacci.args,
    disabled: true,
  },
};
