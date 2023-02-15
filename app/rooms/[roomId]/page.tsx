import RoomPage from './RoomPage';

interface Params {
  params: {
    roomId: string;
  };
}

export default async function Page({ params }: Params) {
  return <RoomPage roomId={params.roomId} />;
}
