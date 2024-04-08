import ExternalLink from '@/app/[locale]/components/common/ExternalLink';
import { Link } from '@/navigation';
import { NextPage } from 'next';
import { useTranslations } from 'next-intl';
import './Footer.css';

const Footer: NextPage = () => {
  const t = useTranslations('Footer');

  return (
    <footer className='container mx-auto mt-auto pb-5 pt-20 text-center' role='contentinfo'>
      <div className='mb-2 flex justify-center gap-4'>
        <Link href='/tos' className='footer-item'>
          {t('Terms of Service')}
        </Link>
        <Link href='/pp' className='footer-item'>
          {t('Privacy Policy')}
        </Link>
        <ExternalLink href='https://twitter.com/at_946' className='footer-item'>
          {t('Contact Us')}
        </ExternalLink>
      </div>
      <div>
        <ExternalLink href='https://twitter.com/at_946' className='footer-item'>
          @asato
        </ExternalLink>
      </div>
    </footer>
  );
};

export default Footer;
