import { NextPage } from 'next';

const Footer: NextPage = () => {
  return (
    <footer className='footer mt-auto py-5'>
      <div className='content has-text-centered'>
        <a
          href='https://twitter.com/at_946'
          target='_blank'
          rel='noopener noreferrer'
          className='has-text-black'
          data-testid='copyright'
        >
          @asato
        </a>
      </div>
    </footer>
  );
};

export default Footer;
