import type { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import LinkInNewTab from '@/app/[locale]/components/common/LinkInNewTab';
import { Link } from '@/i18n/routing';
import './Footer.css';

const Footer: NextPage = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='container mx-auto mt-auto pt-20 pb-5 text-center'>
      <div className='mb-2 flex justify-center gap-4'>
        <Link href='/tos' className='footer-item'>
          {t('Terms of Use')}
        </Link>
        <Link href='/pp' className='footer-item'>
          {t('Privacy Policy')}
        </Link>
        <LinkInNewTab href='https://twitter.com/at_946' className='footer-item'>
          {t('Contact Us')}
        </LinkInNewTab>
      </div>
      <div>
        <LinkInNewTab href='https://twitter.com/at_946' className='footer-item'>
          @asato
        </LinkInNewTab>
      </div>
    </footer>
  );
};

export default Footer;
