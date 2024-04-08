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

const ClipboardCopyLink: NextPage = (props: Props) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(props.copiedText);
    toast.success(props.messageOnSuccess, {
      ariaProps: { role: 'status', 'aria-live': 'polite' },
    });
    props.gaAction && event({ action: props.gaAction, category: 'engagement', label: '' });
  };

  return (
    <button
      onClick={copyText}
      className={clsx(
        'px-2 hover:text-primary focus:text-primary dark:hover:text-dark-primary dark:focus:text-dark-primary',
        props.className,
      )}
    >
      {props.children}
    </button>
  );
};

export default ClipboardCopyLink;
