'use client';

import clsx from 'clsx';
import type { NextPage } from 'next';
import type { ComponentPropsWithoutRef } from 'react';
import toast from 'react-hot-toast';
import { event } from '@/lib/gtag';

type Props = ComponentPropsWithoutRef<'button'> & {
  copiedText: string;
  messageOnSuccess: string;
  gaAction?: string;
};

const ClipboardCopyLink: NextPage<Props> = ({
  children,
  copiedText,
  messageOnSuccess,
  gaAction,
  className,
  ...props
}) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(copiedText);
    toast.success(messageOnSuccess, {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    gaAction && event({ action: gaAction, category: 'engagement', label: '' });
  };

  return (
    <button
      {...props}
      type='button'
      onClick={copyText}
      className={clsx(
        'hover:text-primary focus-visible:text-primary dark:focus-visible:text-dark-primary dark:hover:text-dark-primary',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ClipboardCopyLink;
