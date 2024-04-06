import { NextPage } from 'next';
import FooterItem from './FooterItem';

const Footer: NextPage = () => {
  return (
    <footer className='mt-auto py-5 text-center' role='contentinfo'>
      <div className='mb-2 flex justify-center gap-4'>
        <FooterItem href='/tos'>利用規約</FooterItem>
        <FooterItem href='/pp'>プライバシーポリシー</FooterItem>
        <FooterItem href='https://twitter.com/at_946'>お問い合わせ</FooterItem>
      </div>
      <div>
        <FooterItem href='https://twitter.com/at_946'>@asato</FooterItem>
      </div>
    </footer>
  );
};

export default Footer;
