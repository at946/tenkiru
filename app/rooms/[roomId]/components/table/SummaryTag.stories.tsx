import { Meta, StoryObj } from '@storybook/react';

import SummaryTag from './SummaryTag';

const meta: Meta<typeof SummaryTag> = {
  component: SummaryTag,
  title: 'Room/Table/SummaryTag',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SummaryTag>;

export const Default: Story = {
  args: {
    name: 'Label',
    value: 'Value',
  },
};
