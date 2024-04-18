import RecoilProvider from '@/app/RecoilProvider';
import '@/app/[locale]/components/common/Header.css';
import LightDarkModeToggle from '@/app/[locale]/components/common/LightDarkModeToggle';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof LightDarkModeToggle> = {
  component: LightDarkModeToggle,
  title: 'Common/LightDarkModeToggle',
  argTypes: {
    lightModeTitle: {
      description: '<b>Required</b><br />title attribute to switch light mode',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    darkModeTitle: {
      description: '<b>Required</b><br />title attribute to switch dark mode',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
    className: {
      description: 'className',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: { type: 'text' },
    },
  },
  args: {
    lightModeTitle: 'Switch to light mode',
    darkModeTitle: 'Switch to dark mode',
    className: 'header-item',
  },
  decorators: [
    (Story) => (
      <RecoilProvider>
        <Story />
      </RecoilProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LightDarkModeToggle>;

export const Default: Story = {};
