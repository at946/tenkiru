import type { Meta, StoryObj } from '@storybook/react';

import TitleAndContentBox from './TitleAndContentBox';

export default {
  component: TitleAndContentBox,
  title: 'Home/IntroductionBox',
  tags: ['autodocs'],
} as Meta<typeof TitleAndContentBox>;

export const Default: StoryObj<typeof TitleAndContentBox> = {
  args: {
    title: 'Title',
    children: 'Content',
  },
};
