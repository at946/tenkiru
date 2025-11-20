import { useTranslations } from 'next-intl';
import CreateRoomButton from '@/app/[locale]/components/CreateRoomButton';

export default function Page() {
  const t = useTranslations('Home');

  return (
    <div className='container mx-auto px-5 text-center'>
      <div className='my-20'>
        <h1 className='mb-1 font-bold text-3xl text-primary dark:text-dark-primary'>Tenkiru</h1>
        <p className='break-auto-phrase mb-6 text-lg'>{t('Simple and fun planning poker app')}</p>
        <CreateRoomButton name={t('Create a room')} />
      </div>

      <div className='grid grid-cols-none items-center gap-5 md:grid-cols-10'>
        <div className='md:col-span-2 md:col-start-2'>
          <span className='icon-[fa6-solid--door-open] text-5xl' />
          <p className='break-auto-phrase mt-2'>{t('Create a room for planning poker')}</p>
        </div>
        <div>
          <span className='icon-[fa6-solid--angle-down] md:icon-[fa6-solid--angle-right] col-span-1 text-3xl' />
        </div>
        <div className='md:col-span-2'>
          <span className='icon-[mdi--share-all-outline] text-5xl' />
          <p className='break-auto-phrase mt-2'>{t('Share the room URL with your team')}</p>
        </div>
        <div>
          <span className='icon-[fa6-solid--angle-down] md:icon-[fa6-solid--angle-right] col-span-1 text-3xl' />
        </div>
        <div className='md:col-span-2'>
          <span className='icon-[mdi--cards-playing-outline] text-5xl' />
          <p className='break-auto-phrase mt-2'>{t('Enjoy planning poker together')}</p>
        </div>
      </div>
    </div>
  );
}
