import CreateRoomButton from '@/app/[locale]/components/CreateRoomButton';
import { useTranslations } from 'next-intl';
import './Home.css';

export default function Page() {
  const t = useTranslations('Home');

  return (
    <div className='container mx-auto px-5 text-center'>
      <div className='my-20'>
        <h1 className='mb-1 text-3xl font-bold text-primary dark:text-dark-primary'>Tenkiru</h1>
        <p className='break-auto-phrase mb-6 text-lg'>{t('Simple and fun planning poker app')}</p>
        <CreateRoomButton name={t('Create a room')} />
      </div>

      <div className='flex flex-col items-center justify-center gap-2 md:flex-row md:items-stretch'>
        <div className='how-to-use-box'>
          <span className='icon-[fa6-solid--door-open] text-5xl' />
          <p className='break-auto-phrase mt-2'>{t('Create a room for planning poker')}</p>
        </div>
        <span className='icon-[fa6-solid--angle-down] my-auto text-3xl md:icon-[fa6-solid--angle-right]' />
        <div className='how-to-use-box'>
          <span className='icon-[mdi--share-all-outline] text-5xl' />
          <p className='break-auto-phrase mt-2'>{t('Share the room URL with your team')}</p>
        </div>
        <span className='icon-[fa6-solid--angle-down] my-auto text-3xl md:icon-[fa6-solid--angle-right]' />
        <div className='how-to-use-box'>
          <span className='icon-[mdi--cards-playing-outline] text-5xl' />
          <p className='break-auto-phrase mt-2'>{t('Enjoy planning poker together')}</p>
        </div>
      </div>
    </div>
  );
}
