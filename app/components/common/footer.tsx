import { NextPage } from 'next';
import Link from 'next/link';
import FooterItem from './footer-item';

const Footer: NextPage = () => {
  return (
    <footer className='mt-auto py-5 text-center' role='contentinfo'>
      <div className='mb-2'>
        <FooterItem href='/tos' text='利用規約' />
        <FooterItem href='/pp' text='プライバシーポリシー' />
        <FooterItem href='https://twitter.com/at_946' text='お問い合わせ' />
      </div>
      <div>
        <FooterItem href='https://twitter.com/at_946' text='@asato' />
      </div>
    </footer>
  );
};

export default Footer;
