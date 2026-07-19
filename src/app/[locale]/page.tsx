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
        <p className='break-auto-phrase mb-2 text-xl md:text-3xl'>
          <span className='my-2 inline-block'>{t('See the differences Spark real dialogue')}</span>
        </p>
        <p className='break-auto-phrase mb-6 font-semibold text-lg'>
          {t("Bring out your team's collective intelligence with online Planning Poker")}
        </p>
        <CreateRoomButton name={t('Create a room')} className='mb-4' />
        <p className='break-auto-phrase text-sm'>
          {t('Create a room and share the URL No sign up required Start in seconds')}
        </p>
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

      <section className='my-20'>
        <h2 className="mb-6 flex items-center justify-center gap-4 text-2xl before:h-px before:w-12 before:bg-current before:content-[''] after:h-px after:w-12 after:bg-current after:content-['']">
          FAQ
        </h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          <Box>
            <BoxTitle>{t('What is Tenkiru?')}</BoxTitle>
            <hr className='w-full border' />
            <BoxDescription className='md:text-left'>
              {t(
                'Tenkiru is an online Planning Poker tool that helps teams discover differences in understanding and turn them into productive conversation',
              )}
            </BoxDescription>
          </Box>

          <Box>
            <BoxTitle>{t('What is Planning Poker?')}</BoxTitle>
            <hr className='w-full border' />
            <BoxDescription className='md:text-left'>
              {t(
                'Planning Poker is a collaborative estimation technique widely used in Agile development and Scrum teams Team members reveal their cards simultaneously and discuss differences to build a shared understanding',
              )}
            </BoxDescription>
          </Box>

          <Box>
            <BoxTitle>{t('Why does Tenkiru use anonymity?')}</BoxTitle>
            <hr className='w-full border' />
            <BoxDescription className='md:text-left'>
              {t(
                'Anonymous voting helps everyone express their own perspective without being influenced by titles, seniority, or other opinions Comment requests are anonymous too, encouraging discussions based on ideas rather than roles It also adds a playful element to the experience',
              )}
            </BoxDescription>
          </Box>

          <Box>
            <BoxTitle>{t('What is Comment Request?')}</BoxTitle>
            <hr className='w-full border' />
            <BoxDescription className='md:text-left'>
              {t(
                'Request comments on any card to discover the thinking behind it Anonymous requests encourage conversations based on ideas rather than roles',
              )}
            </BoxDescription>
          </Box>

          <Box>
            <BoxTitle>{t('How does my team join?')}</BoxTitle>
            <hr className='w-full border' />
            <BoxDescription className='md:text-left'>
              {t('Simply create a room and share the URL Your team can join instantly No sign-up required')}
            </BoxDescription>
          </Box>

          <Box>
            <BoxTitle>{t('Is Tenkiru free?')}</BoxTitle>
            <hr className='w-full border' />
            <BoxDescription className='md:text-left'>
              {t.rich(
                'Yes Tenkiru is currently free to use If you enjoy using it, you can support its development through Buy Me a Coffee',
                {
                  a: (chunks) => (
                    <a href='https://www.buymeacoffee.com/at946' target='_blank' rel='noopener' className='underline'>
                      {chunks}
                    </a>
                  ),
                },
              )}
            </BoxDescription>
          </Box>
        </div>
      </section>
    </div>
  );
}
