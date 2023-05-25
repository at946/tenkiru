import React from 'react';
import '@/styles/globals.css';

import FooterItem from './footer-item';

export default {
  component: FooterItem,
  title: 'common/FooterItem',
  tags: ['autodocs'],
};

export const Default = {
  args: {
    href: '/',
    text: 'Internal Link',
  },
};

export const External = {
  args: {
    href: 'https://tenkir.fly.dev',
    text: 'External Link',
  },
};
