import type { NextPage, GetServerSideProps } from 'next';
import Link from 'next/link';
import { v4 } from 'uuid';

type Props = {
  roomId: string;
};

const Home: NextPage<Props> = ({ roomId }: Props) => {
  return (
    <div className='has-text-centered'>
      <section className='section'>
        <h1 className='title has-text-primary'>Tenkir</h1>
        <h2 className='subtitle has-text-dark'>Online planning poker tool</h2>
        <Link href={`/rooms/${encodeURIComponent(roomId)}`}>
          <a
            className='button is-rounded is-outlined is-primary mt-5'
            data-testid='createRoomButton'
          >
            Create a room
          </a>
        </Link>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    roomId: v4(),
  };
  return {
    props: props,
  };
};

export default Home;
