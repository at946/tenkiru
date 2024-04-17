import { Meta, StoryObj } from '@storybook/react';
import SummaryTag from './SummaryTag';

const meta: Meta<typeof SummaryTag> = {
  component: SummaryTag,
  title: 'Room/Table/SummaryTag',
  argTypes: {
    name: {
      type: { name: 'string', required: true },
      description: 'Text displayed on the left side',
    },
    value: {
      type: { name: 'string', required: true },
      description: 'Text displayed on the right side',
    },
  },
  args: {
    name: 'Label',
    value: 'Value',
  },
};

export default meta;
type Story = StoryObj<typeof SummaryTag>;

export const Default: Story = {};
