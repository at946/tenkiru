import DarkModeToggle from '@/app/[locale]/components/common/DarkModeToggle';
import ExternalLink from '@/app/[locale]/components/common/ExternalLink';
import LocaleSwitcher from '@/app/[locale]/components/common/LocaleSwitcher';
import HeaderItem from '@/app/components/common/HeaderItem';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { NextPage } from 'next';
import Link from 'next/link';

interface Props {
  currentLocale: string;
}

const Header: NextPage = (props: Props) => {
  const twitterShareText: string = `Tenkir\n${process.env.NEXT_PUBLIC_BASE_URL}`;

  return (
    <nav role='navigation' aria-label='main navigation'>
      <div className='container mx-auto p-5'>
        <div className='flex items-center justify-between'>
          <Link
            href='/'
            className={clsx(
              'hover:text-primary focus:text-primary flex items-center px-2 font-bold',
              'dark:hover:text-dark-primary dark:focus:text-dark-primary',
            )}
          >
            <span className='icon-[mdi--cards-playing-outline] mr-1 text-2xl' />
            <span>Tenkir</span>
          </Link>

          <div className='flex gap-4'>
            <ExternalLink
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}`}
              title='Share to X'
              ariaLabel='Share to X'
              className='hover:text-primary focus:text-primary dark:hover:text-dark-primary dark:focus:text-dark-primary flex items-center'
            >
              <span className='icon-[fa6-brands--x-twitter] text-2xl' />
            </ExternalLink>
            <ExternalLink
              href='https://www.buymeacoffee.com/at946'
              title='Buy me a coffee'
              ariaLabel='Go to Buy me a coffee'
              className='hover:text-primary focus:text-primary dark:hover:text-dark-primary dark:focus:text-dark-primary flex items-center'
            >
              <span className='icon-[simple-icons--buymeacoffee] text-2xl' />
            </ExternalLink>
            <DarkModeToggle
              lightModeTitle='ダークモードへ変更'
              darkModeTitle='ライトモードへ変更'
              className='flex items-center'
            />
            <LocaleSwitcher currentLocale={props.currentLocale} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
