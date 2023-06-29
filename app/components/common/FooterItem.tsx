import { NextPage } from 'next';
import Link from 'next/link';
import { ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

const FooterItem: NextPage<Props> = ({ href, children }) => {
  const className: string = 'text-xs hover:underline focus:underline dark:text-white';

  if (href.indexOf('/') === 0) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  } else {
    return (
      <a href={href} target='_blank' rel='noreferrer noopener nofollow' className={className}>
        {children}
      </a>
    );
  }
};

export default FooterItem;
