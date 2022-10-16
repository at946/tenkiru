import { NextPage } from 'next';
import Link from 'next/link';
import styles from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Header: NextPage = () => {
  const shareText = encodeURIComponent('Tenkir\n' + process.env.NEXT_PUBLIC_BASE_URL);

  return (
    <nav className='navbar px-5' role='navigation' aria-label='main navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link href='/'>
            <a className='navbar-item has-text-primary has-text-weight-bold' data-testid='logo'>
              Tenkir
            </a>
          </Link>
        </div>
        <div className='navbar-menu'>
          <div className='navbar-end'>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}`}
              className={`${styles.twitter} navbar-item`}
              target='_blank'
              rel='noreferrer'
              data-testid='shareTwitter'
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
