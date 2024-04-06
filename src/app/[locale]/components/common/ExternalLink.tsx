import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
  title?: string;
  ariaLabel?: string;
  className?: string;
}

const ExternalLink: NextPage = (props: Props) => {
  return (
    <a
      href={props.href}
      target='_blank'
      rel='noreferrer nofollow noopener'
      title={props.title}
      aria-label={props.ariaLabel}
      className={props.className}
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
