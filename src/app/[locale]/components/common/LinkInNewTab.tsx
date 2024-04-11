import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href: string;
  title?: string;
  ariaLabel?: string;
}

const LinkInNewTab: NextPage<Props> = ({ children, className, href, title, ariaLabel }) => {
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
