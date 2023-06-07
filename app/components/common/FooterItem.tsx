import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
  href: string;
  text: string;
}

const FooterItem: NextPage<Props> = ({ href, text }) => {
  if (href.indexOf('/') === 0) {
    return (
      <Link href={href} className='mx-2 text-xs hover:underline focus:underline'>
        {text}
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        target='_blank'
        rel='noreferrer noopener'
        className='mx-2 text-xs hover:underline focus:underline'
      >
        {text}
      </a>
    );
  }
};

export default FooterItem;
