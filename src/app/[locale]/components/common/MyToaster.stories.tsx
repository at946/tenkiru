import Button from '@/app/[locale]/components/common/Button';
import { Meta, StoryObj } from '@storybook/react';
import toast from 'react-hot-toast';
import MyToaster from './MyToaster';

const meta: Meta<typeof MyToaster> = {
  component: MyToaster,
  title: 'Common/MyToaster',
  description: 'https://react-hot-toast.com/',
  parameters: {
    docs: {
      description: {
        component: 'use [react-hot-toast](https://react-hot-toast.com/).',
      },
    },
  },
  argTypes: {},
  args: {},
  render: () => {
    return (
      <div>
        <Button
          onClick={() => {
            toast('Default');
          }}
        >
          Default
        </Button>
        <MyToaster />
      </div>
    );
  },
};

export default meta;
type Story = StoryObj<typeof MyToaster>;

export const Default: Story = {};

export const Status: Story = {
  render: () => {
    return (
      <div className='flex gap-2'>
        <Button
          onClick={() => {
            toast('Default');
          }}
        >
          Default
        </Button>
        <Button
          onClick={() => {
            toast.success('Success');
          }}
        >
          Success
        </Button>
        <Button
          onClick={() => {
            toast.error('Error');
          }}
        >
          Error
        </Button>
        <Button
          onClick={() => {
            toast.loading('Loading');
          }}
        >
          Loading
        </Button>
        <MyToaster />
      </div>
    );
  },
};

export const DefaultWithIcon: Story = {
  render: () => {
    return (
      <div>
        <Button
          onClick={() => {
            toast('Default', { icon: '😀' });
          }}
        >
          Default
        </Button>
        <MyToaster />
      </div>
    );
  },
};
