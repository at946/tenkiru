import { Meta, StoryObj } from '@storybook/react';

import NominateButton from './NominateButton';

const meta: Meta<typeof NominateButton> = {
  component: NominateButton,
  title: 'Room/Table/NominateButton',
  tags: ['autodocs'],
  decorators: [(story) => <div className='bg-green-400 p-5'>{story()}</div>],
};

export default meta;
type Story = StoryObj<typeof NominateButton>;

export const Default: Story = {
  args: {
    isDisabled: false,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};
