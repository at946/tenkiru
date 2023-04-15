import { NextPage } from 'next';
import Link from 'next/link';

const Footer: NextPage = () => {
  return (
    <footer className='footer mt-auto py-5 has-background-white'>
      <div className='has-text-centered'>
        <div className='is-centered mb-1'>
          <Link href='/tos' className='is-size-7 mx-2' data-testid='link_to_tos'>
            利用規約
          </Link>
          <Link href='/pp' className='is-size-7 mx-2' data-testid='link_to_pp'>
            プライバシーポリシー
          </Link>
          <a
            href='https://twitter.com/at_946'
            target='_blank'
            rel='noreferrer'
            className='is-size-7 mx-2'
            data-testid='link_to_inquiry'
          >
            お問い合わせ
          </a>
        </div>
        <a
          href='https://twitter.com/at_946'
          target='_blank'
          rel='noopener noreferrer'
          data-testid='copyright'
        >
          @asato
        </a>
      </div>
    </footer>
  );
};

export default Footer;
