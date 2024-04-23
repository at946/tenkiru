import type { NextPage } from 'next';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href: string;
  title?: string;
  ariaLabel?: string;
  className?: string;
}

const LinkInNewTab: NextPage<Props> = ({ children, href, title, ariaLabel, className }) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer nofollow noopener'
      title={title}
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
};

export default LinkInNewTab;
