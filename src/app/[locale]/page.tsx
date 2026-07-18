import { useTranslations } from 'next-intl';
import CreateRoomButton from '@/app/[locale]/components/CreateRoomButton';
import ReasonBox from '@/app/[locale]/components/ReasonBox/ReasonBox';
import ReasonBoxDescription from '@/app/[locale]/components/ReasonBox/ReasonBoxDescription';
import ReasonBoxIcon from '@/app/[locale]/components/ReasonBox/ReasonBoxIcon';
import ReasonBoxTitle from '@/app/[locale]/components/ReasonBox/ReasonBoxTitle';

export default function Page() {
  const t = useTranslations('Home');

  return (
    <div className='container mx-auto px-5 text-center'>
      <section className='my-20'>
        <h1 className='mb-4 font-bold text-6xl text-primary tracking-wider dark:text-dark-primary'>Tenkiru</h1>
        <p className='break-auto-phrase mb-6 text-3xl'>{t('See the differences Spark real dialogue')}</p>
        <CreateRoomButton name={t('Create a room')} className='mb-4' />
        <p className='text-sm'>{t('Create a room and share the URL No sign up required Start in seconds')}</p>
      </section>

      <section className='my-20'>
        <h2 className="mb-6 flex items-center justify-center gap-4 text-2xl before:h-px before:w-12 before:bg-current before:content-[''] after:h-px after:w-12 after:bg-current after:content-['']">
          Why Tenkiru?
        </h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <ReasonBox>
            <ReasonBoxIcon className='icon-[mdi--anonymous]' />
            <ReasonBoxTitle>{t('Anonymous means honest')}</ReasonBoxTitle>
            <ReasonBoxDescription>
              {t('No titles or seniority Everyone can speak up and share their true thoughts with confidence')}
            </ReasonBoxDescription>
          </ReasonBox>

          <ReasonBox>
            <ReasonBoxIcon className='icon-[mdi--comments-outline]' />
            <ReasonBoxTitle>{t('Ask why, spark dialogue')}</ReasonBoxTitle>
            <ReasonBoxDescription>
              {t('Request comments on any card to uncover context, assumptions, and different perspectives')}
            </ReasonBoxDescription>
          </ReasonBox>

          <ReasonBox>
            <ReasonBoxIcon className='icon-[mdi--link-variant]' />
            <ReasonBoxTitle>{t('Start with your team in seconds')}</ReasonBoxTitle>
            <ReasonBoxDescription>
              {t('Create a room, share the URL, and your team can join instantly No sign up required')}
            </ReasonBoxDescription>
          </ReasonBox>
        </div>
      </section>

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
