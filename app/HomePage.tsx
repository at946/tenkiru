'use client';

import { NextPage } from 'next';
import CreateRoomButton from '../components/top/createRoomButton';

interface Props {
  roomId: string;
}

const HomePage: NextPage<Props> = ({ roomId }) => {
  return (
    <div className='has-text-centered'>
      <section className='section'>
        <h1 className='title has-text-primary'>Tenkir</h1>
        <h2 className='subtitle has-text-dark'>Online planning poker tool</h2>
        <CreateRoomButton roomId={roomId} />
      </section>
    </div>
  );
};

export default HomePage;
