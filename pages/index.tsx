import type { NextPage } from 'next';
import Link from 'next/link';
import { v4 } from 'uuid';

const Home: NextPage = () => {
  return (
    <div className='has-text-centered'>
      <section className='section'>
        <h1 className='title has-text-primary'>Tenkir</h1>
        <h2 className='subtitle has-text-dark'>Online Planning Poker Tool</h2>
        <Link href={`/rooms/${encodeURIComponent(v4())}`}>
          <a className='button is-rounded is-outlined is-primary mt-5'>Create a room</a>
        </Link>
      </section>
    </div>
  );
};

export default Home;
