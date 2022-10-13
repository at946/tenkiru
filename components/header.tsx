import { NextPage } from 'next';
import Link from 'next/link';

const Header: NextPage = () => {
  return (
    <nav className='navbar' role='navigation' aria-label='main navigation'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link href='/'>
            <a className='navbar-item has-text-primary has-text-weight-bold' data-testid="logo">Tenkir</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
