import RoomPage from './RoomPage';

interface Params {
  params: {
    roomId: string;
  };
}

const Page = async ({ params }: Params) => {
  return <RoomPage roomId={params.roomId} />;
};

export default Page;
