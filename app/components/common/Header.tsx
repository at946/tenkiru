'use client';

import { NextPage } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setIsDark } from '@/store/darkModeSlice';
import HeaderItem from './HeaderItem';
import Sun from './icons/Sun';
import Moon from './icons/Moon';

const Header: NextPage = () => {
  const dispatch = useAppDispatch();
  const isDark: boolean = useAppSelector((state) => state.theme.isDark);
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
              <FontAwesomeIcon icon={faTwitter} className='mr-1' />
              <span className='hidden md:inline'>シェアで支援</span>
            </HeaderItem>

            <HeaderItem
              isLink={false}
              ariaLabel={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
              onClick={() => dispatch(setIsDark(!isDark))}
            >
              {isDark ? <Sun /> : <Moon />}
            </HeaderItem>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
