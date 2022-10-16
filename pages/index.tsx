import type { NextPage, GetServerSideProps } from 'next';
import { v4 } from 'uuid';
import CreateRoomButton from '../components/top/createRoomButton';

type Props = {
  roomId: string;
};

const Home: NextPage<Props> = ({ roomId }: Props) => {
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props: Props = {
    roomId: v4(),
  };
  return {
    props: props,
  };
};

export default Home;
