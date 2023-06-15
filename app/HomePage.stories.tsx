import type { Meta, StoryObj } from '@storybook/react';

import HomePage from './HomePage';

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
