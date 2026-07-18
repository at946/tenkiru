import { useTranslations } from 'next-intl';
import Box from '@/app/[locale]/components/box/Box';
import BoxDescription from '@/app/[locale]/components/box/BoxDescription';
import BoxIcon from '@/app/[locale]/components/box/BoxIcon';
import BoxTag from '@/app/[locale]/components/box/BoxTag';
import BoxTitle from '@/app/[locale]/components/box/BoxTitle';
import CreateRoomButton from '@/app/[locale]/components/CreateRoomButton';

export default function Page() {
  const t = useTranslations('Home');

  return (
    <div className='container mx-auto px-5 text-center'>
      <section className='my-20'>
        <h1 className='mb-4 font-bold text-6xl text-primary tracking-wider dark:text-dark-primary'>Tenkiru</h1>
        <p className='break-auto-phrase mb-6 text-3xl'>
          <span className='my-2 inline-block'>{t('See the differences dot')}</span>
          <span className='my-2 inline-block'>{t('Spark real dialogue dot')}</span>
        </p>
        <CreateRoomButton name={t('Create a room')} className='mb-4' />
        <p className='text-sm'>{t('Create a room and share the URL No sign up required Start in seconds')}</p>
      </section>

      <section className='my-20'>
        <h2 className="mb-6 flex items-center justify-center gap-4 text-2xl before:h-px before:w-12 before:bg-current before:content-[''] after:h-px after:w-12 after:bg-current after:content-['']">
          Why Tenkiru?
        </h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <Box>
            <BoxIcon className='icon-[mdi--anonymous]' />
            <BoxTitle>{t('Anonymous means honest')}</BoxTitle>
            <BoxDescription>
              {t('No titles or seniority Everyone can speak up and share their true thoughts with confidence')}
            </BoxDescription>
          </Box>

          <Box>
            <BoxIcon className='icon-[mdi--comment-outline]' />
            <BoxTitle>{t('Ask why, spark dialogue')}</BoxTitle>
            <BoxDescription>
              {t('Request comments on any card to uncover context, assumptions, and different perspectives')}
            </BoxDescription>
          </Box>

          <Box>
            <BoxIcon className='icon-[mdi--link-variant]' />
            <BoxTitle>{t('Start with your team in seconds')}</BoxTitle>
            <BoxDescription>
              {t('Create a room, share the URL, and your team can join instantly No sign up required')}
            </BoxDescription>
          </Box>
        </div>
      </section>

      <section className='my-20'>
        <h2 className="mb-6 flex items-center justify-center gap-4 text-2xl before:h-px before:w-12 before:bg-current before:content-[''] after:h-px after:w-12 after:bg-current after:content-['']">
          How it works?
        </h2>

        <div className='grid grid-cols-1 gap-4 md:grid-cols-4'>
          <Box>
            <BoxTitle>{t('1 Create a room')}</BoxTitle>
            <BoxIcon className='icon-[fa6-solid--door-open]' />
            <BoxDescription>{t('Create a room, and then choose a deck')}</BoxDescription>
            <BoxTag>{t('A URL is generated')}</BoxTag>
          </Box>

          <Box>
            <BoxTitle>{t('2 Share the URL and invite your team')}</BoxTitle>
            <BoxIcon className='icon-[mdi--invite]' />
            <BoxDescription>{t('Share the room URL with your team No sign up required')}</BoxDescription>
            <BoxTag>{t('Join instantly')}</BoxTag>
          </Box>

          <Box>
            <BoxTitle>{t('3 Vote anonymously')}</BoxTitle>
            <BoxIcon className='icon-[mdi--cards-playing-heart-multiple]' />
            <BoxDescription>{t('Each person selects a card anonymously Differences become visible')}</BoxDescription>
            <BoxTag>{t('See the differences')}</BoxTag>
          </Box>

          <Box>
            <BoxTitle>{t('4 Share reasons and align understandings')}</BoxTitle>
            <BoxIcon className='icon-[mdi--comments-outline]' />
            <BoxDescription>{t('Request comments and dive deeper into the dialogue Align as a team')}</BoxDescription>
            <BoxTag>{t('Dialogue begins')}</BoxTag>
          </Box>
        </div>
      </section>
    </div>
  );
}
