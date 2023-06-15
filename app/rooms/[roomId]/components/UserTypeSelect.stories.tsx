import type { Meta, StoryObj } from '@storybook/react';

import UserTypeSelect from './UserTypeSelect';
import { MemberType } from '@/interfaces/userType';

import { updateType } from '@/store/userSlice';
import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/store/mocks/store';

const meta: Meta<typeof UserTypeSelect> = {
  component: UserTypeSelect,
  title: 'Room/UserTypeSelect',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserTypeSelect>;

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
