import type { Meta, StoryObj } from '@storybook/react';

import UserTypeSelect from './UserTypeSelect';
import { IFUserType } from '@/interfaces/userType';

import { Provider } from 'react-redux';
import { mockState, mockStore } from '@/mocks/store/store';

const meta: Meta<typeof UserTypeSelect> = {
  component: UserTypeSelect,
  title: 'Room/UserTypeSelect',
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
  },
};

export default meta;
type Story = StoryObj<typeof UserTypeSelect>;

const defaultMockState = mockState;
const defaultMockStore = mockStore(defaultMockState);
export const Default: Story = {
  args: {
    extraClass: '',
    onChange: (userType: IFUserType) => {},
  },
  decorators: [(story) => <Provider store={defaultMockStore}>{story()}</Provider>],
};
