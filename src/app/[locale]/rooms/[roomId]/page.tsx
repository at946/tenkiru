import MyToaster from '@/app/[locale]/components/common/MyToaster';
import RoomInfo from '@/app/[locale]/rooms/[roomId]/components/RoomInfo';
import RoomPage from './RoomPage';

interface Props {
  params: {
    roomId: string;
  };
}

export default function Page(props: Props) {
  return (
    <div className='container mx-auto mb-10 mt-5 px-5 text-center'>
      <RoomInfo roomId={props.params.roomId} className='mb-5' />
      <RoomPage roomId={props.params.roomId} />
      <MyToaster />
    </div>
  );
}
