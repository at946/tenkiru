import type { Meta, StoryObj } from '@storybook/react';

import MemberTypeSelect from './MemberTypeSelect';
import { MemberType } from '@/interfaces/memberType';
import ReduxProvider from '@/app/ReduxProvider';
import { updateType } from '@/store/userSlice';
import { store } from '@/store/store';

export default {
  component: MemberTypeSelect,
  title: 'Room/MemberTypeSelect',
  tags: ['autodocs'],
};

export const Default: StoryObj<typeof MemberTypeSelect> = {
  args: {
    extraClass: '',
    select: (memberType: MemberType) => {
      store.dispatch(updateType(memberType))
    }
  },
  decorators: [
    (story) => <ReduxProvider>{story()}</ReduxProvider>
  ],
};
