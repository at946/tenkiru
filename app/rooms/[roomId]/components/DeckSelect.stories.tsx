import type { Meta, StoryObj } from '@storybook/react';
import { useArgs } from '@storybook/preview-api';

import DeckSelect from './DeckSelect';

import { IFDeckType } from '@/interfaces/deckType';

const meta: Meta<typeof DeckSelect> = {
  component: DeckSelect,
  title: 'Room/DeckSelect',
  tags: ['autodocs'],
  argTypes: {
    deckType: {
      type: { name: 'string', required: true },
      description: '選択中のデッキタイプ',
      control: 'select',
      options: ['fibonnaci', 'sequential', 'tShirtSize'],
    },
    disabled: {
      type: { name: 'boolean', required: false },
      description: 'selectboxが選択可能かどうか',
    },
    extraClass: {
      type: { name: 'string', required: false },
      description: '追加で適用するクラス名',
    },
    onChange: {
      type: { name: 'function', required: true },
      description: '選択肢の変更時に呼び出される関数',
      table: {
        category: 'Events',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeckSelect>;

export const Default: Story = {
  args: {
    deckType: 'fibonacci',
  },
  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onChange = (newDeckType: IFDeckType) => {
        setArgs({ deckType: newDeckType });
      };
      return <DeckSelect {...args} deckType={args.deckType} onChange={onChange} />;
    },
  ],
};

export const Disabled: Story = {
  args: {
    deckType: 'fibonacci',
    disabled: true,
  },
};
