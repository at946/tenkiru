'use client';

import { NextPage } from 'next';
import Link from 'next/link';

// components
import HeaderItem from './HeaderItem';
import Sun from './icons/Sun';
import Moon from './icons/Moon';

// fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';

// recoil
import { useRecoilState } from 'recoil';
import isDarkModeState from '@/recoil/atoms/isDarkModeAtom';

const Header: NextPage = () => {
  const [isDarkMode, setIsDarkMode] = useRecoilState<boolean>(isDarkModeState);
  const twitterShareText: string =
    '#テンキル\n' +
    'チームでわいわいプランニングポーカーアプリ\n' +
    process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <nav role='navigation' aria-label='main navigation'>
      <div className='container mx-auto p-5'>
        <div className='flex items-center justify-between'>
          <div>
            <Link
              href='/'
              className='px-2 font-bold hover:text-purple-500 focus:text-purple-500 dark:text-white dark:hover:text-purple-500 dark:focus:text-purple-500'
            >
              <FontAwesomeIcon icon={faShuffle} className='mr-2' />
              <span>Tenkir</span>
            </Link>
          </div>

          <div className='flex gap-4'>
            <HeaderItem isLink={true} href='https://note.com/_at_946/n/nb84babf02d87'>
              <FontAwesomeIcon icon={faMugSaucer} className='mr-1' />
              <span className='hidden md:inline'>コーヒーで支援</span>
            </HeaderItem>

            <HeaderItem
              isLink={true}
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}`}
            >
              <FontAwesomeIcon icon={faXTwitter} className='mr-1' />
              <span className='hidden md:inline'>シェアで支援</span>
            </HeaderItem>

            <HeaderItem
              isLink={false}
              ariaLabel={isDarkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
              onClick={() => setIsDarkMode(!isDarkMode)}
            >
              {isDarkMode ? <Sun /> : <Moon />}
            </HeaderItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
