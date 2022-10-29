import { NextPage } from 'next';
import Link from 'next/link';
import Script from 'next/script';

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
              href="https://www.buymeacoffee.com/at946"
              className="navbar-item"
              target="_blank"
              rel="noreferrer"
              data-testid="buymeacoffee"
              >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                alt="Buy me a coffee"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
