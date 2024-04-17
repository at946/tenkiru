'use client';

import { event } from '@/lib/gtag';
import clsx from 'clsx';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import toast from 'react-hot-toast';

interface Props {
  children: ReactNode;
  copiedText: string;
  messageOnSuccess: string;
  gaAction?: string;
  className?: string;
}

const ClipboardCopyLink: NextPage<Props> = ({
  children,
  copiedText,
  messageOnSuccess,
  gaAction,
  className,
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
      onClick={copyText}
      className={clsx(
        'px-2 hover:text-primary focus-visible:text-primary dark:hover:text-dark-primary dark:focus-visible:text-dark-primary',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ClipboardCopyLink;
