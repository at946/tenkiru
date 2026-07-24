import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import MyToaster from '@/app/[locale]/components/common/MyToaster';
import RoomPage from './RoomPage';

type Params = Promise<{
  roomId: string;
}>;

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const messages = await getMessages();

  return (
    <div className='container mx-auto mt-5 mb-10 px-5 text-center'>
      <NextIntlClientProvider messages={{ Room: messages.Room }}>
        <RoomPage roomId={params.roomId} />
      </NextIntlClientProvider>
      <MyToaster />
    </div>
  );
}
