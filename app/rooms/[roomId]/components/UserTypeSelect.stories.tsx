import type { Meta, StoryObj } from '@storybook/react';

import UserTypeSelect from './UserTypeSelect';
import { IFUserType } from '@/interfaces/userType';

import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/mocks/store/store';

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
    select: (userType: IFUserType) => {
    },
  },
  decorators: [(story) => <Provider store={defaultMockStore}>{story()}</Provider>],
};
