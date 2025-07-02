import type { NextPage } from 'next';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import DarkModeToggle from '@/app/[locale]/components/common/LightDarkModeToggle';
import LinkInNewTab from '@/app/[locale]/components/common/LinkInNewTab';
import LocaleSwitcher from '@/app/[locale]/components/common/LocaleSwitcher';
import './Header.css';

interface Props {
  currentLocale: string;
}

const Header: NextPage<Props> = ({ currentLocale }) => {
  const t = useTranslations('Header');
  const twitterShareText: string = `Tenkiru\n${process.env.NEXT_PUBLIC_BASE_URL}`;

  return (
    <nav aria-label='main navigation'>
      <div className='container mx-auto p-5'>
        <div className='flex items-center justify-between'>
          <Link href='/' className='header-item font-bold'>
            <span className='icon-[mdi--cards-playing-outline] mr-1 text-2xl' />
            <span>Tenkiru</span>
          </Link>

          <div className='flex gap-4'>
            <LinkInNewTab
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}`}
              title={t('Share to X')}
              ariaLabel={t('Share to X')}
              className='header-item'
            >
              <span className='icon-[fa6-brands--x-twitter] text-2xl' />
            </LinkInNewTab>
            <LinkInNewTab
              href='https://www.buymeacoffee.com/at946'
              title={t('Sponser')}
              ariaLabel={'Sponser'}
              className='header-item'
            >
              <span className='icon-[mdi--heart] text-2xl' />
            </LinkInNewTab>
            <DarkModeToggle
              lightModeTitle={t('Switch to dark mode')}
              darkModeTitle={t('Switch to light mode')}
              className='header-item'
            />
            <LocaleSwitcher currentLocale={currentLocale} ariaLabel={t('Switch language')} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
