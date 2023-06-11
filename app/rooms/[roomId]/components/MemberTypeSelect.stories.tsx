import type { Meta, StoryObj } from '@storybook/react';

import MemberTypeSelect from './MemberTypeSelect';
import { MemberType } from '@/interfaces/memberType';

import ReduxProvider from '@/app/ReduxProvider';
import { updateType, userSlice } from '@/store/userSlice';
import { store } from '@/store/store';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { mockState, mockStore } from '@/store/mocks/store';

const meta: Meta<typeof MemberTypeSelect> = {
  component: MemberTypeSelect,
  title: 'Room/MemberTypeSelect',
  tags: ['autodocs'],
  argTypes: {
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
  }
};

export default meta;
type Story = StoryObj<typeof MemberTypeSelect>;

const defaultMockState = mockState;
const defaultMockStore = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    extraClass: '',
    onChange: (memberType: MemberType) => {
      defaultMockStore.dispatch(updateType(memberType));
    },
  },
  decorators: [(story) => <Provider store={defaultMockStore}>{story()}</Provider>],
};
