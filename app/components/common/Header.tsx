import { NextPage } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMugSaucer, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Header: NextPage = () => {
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
              className='px-2 font-bold text-purple-600 hover:underline focus:underline'
            >
              <FontAwesomeIcon icon={faShuffle} className='mr-2' />
              Tenkir
            </Link>
          </div>
          <div>
            <a
              href='https://note.com/_at_946/n/nb84babf02d87'
              className='px-2 hover:text-purple-600 focus:text-purple-600'
              target='_blank'
              rel='noreferrer nofollow noopener'
            >
              <FontAwesomeIcon icon={faMugSaucer} className='mr-1' />
              <span className='hidden md:inline'>コーヒーで支援</span>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterShareText)}`}
              className='px-2 hover:text-purple-600 focus:text-purple-600'
              target='_blank'
              rel='noreferrer nofollow noopener'
            >
              <FontAwesomeIcon icon={faTwitter} className='mr-1' />
              <span className='hidden md:inline'>シェアで支援</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
