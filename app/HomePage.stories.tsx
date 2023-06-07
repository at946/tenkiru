import type { Meta, StoryObj } from '@storybook/react';

import HomePage from './HomePage';
import { MockState, mockState, mockStore } from '@/store/mocks/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof HomePage> = {
  component: HomePage,
  title: 'Pages/HomePage',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {
  args: {},
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
};
