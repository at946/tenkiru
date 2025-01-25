import MyToaster from '@/app/[locale]/components/common/MyToaster';
import RoomInfo from '@/app/[locale]/rooms/[roomId]/components/RoomInfo';
import { pick } from 'lodash';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import RoomPage from './RoomPage';

type Params = Promise<{
  roomId: string;
}>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const messages = await getMessages();

  return (
    <div className='container mx-auto mt-5 mb-10 px-5 text-center'>
      <RoomInfo roomId={params.roomId} className='mb-5' />
      <NextIntlClientProvider messages={pick(messages, 'Room')}>
        <RoomPage roomId={params.roomId} />
      </NextIntlClientProvider>
      <MyToaster />
    </div>
  );
}
