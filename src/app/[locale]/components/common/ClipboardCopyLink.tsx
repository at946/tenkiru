'use client';

import { event } from '@/lib/gtag';
import clsx from 'clsx';
import type { NextPage } from 'next';
import type { ReactNode } from 'react';
import toast from 'react-hot-toast';

interface Props {
  children: ReactNode;
  copiedText: string;
  messageOnSuccess: string;
  gaAction?: string;
  className?: string;
}

const ClipboardCopyLink: NextPage<Props> = ({ children, copiedText, messageOnSuccess, gaAction, className }) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(copiedText);
    toast.success(messageOnSuccess, {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    gaAction && event({ action: gaAction, category: 'engagement', label: '' });
  };

  return (
    <button
      type='button'
      onClick={copyText}
      className={clsx(
        'px-2 hover:text-primary focus-visible:text-primary dark:focus-visible:text-dark-primary dark:hover:text-dark-primary',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ClipboardCopyLink;
