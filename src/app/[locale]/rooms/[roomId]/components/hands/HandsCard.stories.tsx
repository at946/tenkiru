import enMessages from '@/messages/en.json';
import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import HandsCard from './HandsCard';

const meta: Meta<typeof HandsCard> = {
  component: HandsCard,
  title: 'Room/Hands/HandsCard',
  tags: ['autodocs'],
  argTypes: {
    value: {
      type: { required: true },
      table: {
        type: {
          summary: 'number | string',
        },
      },
      description: 'Card display value',
    },
    isSelected: {
      type: { name: 'boolean', required: false },
      description: 'Whether to be being selected',
    },
    isDisabled: {
      type: { name: 'boolean', required: false },
      description: 'Whether to be able to be selected',
    },
    onClick: {
      type: { name: 'function', required: true },
      description: 'Function called on click this card',
      table: {
        category: 'Events',
      },
    },
  },
  args: {
    value: 1,
    isSelected: false,
    isDisabled: false,
  },

  decorators: [
    () => {
      const [args, setArgs] = useArgs();
      const onClick = () => {
        setArgs({ isSelected: !args.isSelected });
      };
      return (
        <NextIntlClientProvider locale='en' messages={enMessages}>
          <HandsCard {...args} onClick={onClick} />
        </NextIntlClientProvider>
      );
    },
  ],
};

export default meta;
type Story = StoryObj<typeof HandsCard>;

export const Default: Story = {};

export const Text: Story = {
  args: {
    value: 'XS',
  },
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const SelectedAndDisabled: Story = {
  args: {
    isSelected: true,
    isDisabled: true,
  },
};
