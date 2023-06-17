import { Meta, StoryObj } from '@storybook/react';

import SummaryTags from './SummaryTags';
import { closePhaseMockState, mockStore, openPhaseMockState } from '@/mocks/store/store';
import { Provider } from 'react-redux';

const meta: Meta<typeof SummaryTags> = {
  component: SummaryTags,
  title: 'Room/Table/SummaryTags',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SummaryTags>;

export const OpenPhase: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(openPhaseMockState)}>{story()}</Provider>],
};

export const ClosePhase: Story = {
  args: {},
  decorators: [(story) => <Provider store={mockStore(closePhaseMockState)}>{story()}</Provider>],
};
