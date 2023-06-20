import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
  href: string;
  text: string;
}

const FooterItem: NextPage<Props> = ({ href, text }) => {
  if (href.indexOf('/') === 0) {
    return (
      <Link href={href} className='px-2 text-xs hover:underline focus:underline dark:text-white'>
        {text}
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener nofollow'
        className='px-2 text-xs hover:underline focus:underline dark:text-white'
      >
        {text}
      </a>
    );
  }
};

export default FooterItem;
