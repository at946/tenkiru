import MyToaster from '@/app/[locale]/components/common/MyToaster';
import RoomInfo from '@/app/[locale]/rooms/[roomId]/components/RoomInfo';
import { pick } from 'lodash';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import RoomPage from './RoomPage';

interface Props {
  params: {
    roomId: string;
  };
}

export default function Page(props: Props) {
  const messages = useMessages();
  return (
    <div className='container mx-auto mb-10 mt-5 px-5 text-center'>
      <RoomInfo roomId={props.params.roomId} className='mb-5' />
      <NextIntlClientProvider messages={pick(messages, 'Room')}>
        <RoomPage roomId={props.params.roomId} />
      </NextIntlClientProvider>
      <MyToaster />
    </div>
  );
}
