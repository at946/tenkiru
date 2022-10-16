import { NextPage } from 'next';
import Link from 'next/link';
import styles from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';

const Header: NextPage = () => {
  const shareText = encodeURIComponent(process.env.NEXT_PUBLIC_BASE_URL);

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
            <a
              href='https://www.buymeacoffee.com/at946'
              target='_blank'
              rel='noreferrer'
              className={`${styles.buymeacoffee} navbar-item`}
              data-testid='buymeacoffee'
            >
              <FontAwesomeIcon icon={faMugSaucer} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
