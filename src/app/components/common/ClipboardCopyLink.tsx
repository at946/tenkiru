import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  copiedText: string;
  extraClass?: string;
  onCopied?: () => void;
}

const ClipboardCopyLink: NextPage<Props> = ({ children, copiedText, extraClass, onCopied }) => {
  const copyText = async () => {
    await navigator.clipboard.writeText(copiedText);
    onCopied?.();
  };

  return (
    <div className={extraClass}>
      <button
        onClick={copyText}
        className='cursor-pointer px-2 hover:text-purple-500 focus:text-purple-500 dark:text-white dark:hover:text-purple-500 dark:focus:text-purple-500'
      >
        {children}
      </button>
    </div>
  );
};

export default ClipboardCopyLink;
