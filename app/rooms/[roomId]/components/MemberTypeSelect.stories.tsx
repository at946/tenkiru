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
};

export default meta;
type Story = StoryObj<typeof MemberTypeSelect>;

const defaultMockState = mockState;
const defaultMockStore = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    extraClass: '',
    select: (memberType: MemberType) => {
      defaultMockStore.dispatch(updateType(memberType));
    },
  },
  decorators: [(story) => <Provider store={defaultMockStore}>{story()}</Provider>],
};
