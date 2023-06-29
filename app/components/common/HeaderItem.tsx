import { NextPage } from 'next';
import { ReactNode } from 'react';

interface Props {
  isLink: boolean;
  href?: string;
  children: ReactNode;
  onClick?: () => void;
}

const HeaderItem: NextPage<Props> = ({ isLink, href, children, onClick }) => {
  const className: string =
    'hover:text-purple-500 focus:text-purple-500 dark:text-white dark:hover:text-purple-500 dark:focus:text-purple-500';
  if (isLink) {
    return (
      <a href={href} className={className} target='_blank' rel='noreferrer nofollow noopener'>
        {children}
      </a>
    );
  } else {
    return (
      <button className={className} onClick={onClick}>
        {children}
      </button>
    );
  }
};

export default HeaderItem;
