import { NextPage } from 'next';
import Link from 'next/link';

const Footer: NextPage = () => {
  return (
    <footer className='mt-auto py-5' role='contentinfo'>
      <div className='mb-2 text-center'>
        <Link href='/tos' className='mx-2 text-xs'>
          利用規約
        </Link>
        <Link href='/pp' className='mx-2 text-xs'>
          プライバシーポリシー
        </Link>
        <a
          href='https://twitter.com/at_946'
          target='_blank'
          rel='noreferrer'
          className='mx-2 text-xs'
        >
          お問い合わせ
        </a>
      </div>
      <div className='text-center'>
        <a
          href='https://twitter.com/at_946'
          target='_blank'
          rel='noopener noreferrer'
          className='text-sm'
        >
          @asato
        </a>
      </div>
    </footer>
  );
};

export default Footer;
