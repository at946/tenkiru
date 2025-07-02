import { useFormatter, useTranslations } from 'next-intl';
import LinkInNewTab from '@/app/[locale]/components/common/LinkInNewTab';

export default function Page() {
  const t = useTranslations('Privacy Policy');
  const format = useFormatter();

  return (
    <div className='container mx-auto my-10 px-5 text-sm dark:text-white'>
      <h1 className='mb-5 font-bold text-2xl'>{t('Privacy Policy')}</h1>
      <p className='mb-5'>
        {t(
          'Tenkiru has established the following privacy policy regarding the handling of personal information of users of the Service',
        )}
      </p>

      <ul className='mb-5 list-inside list-decimal'>
        <div className='mb-5'>
          <li className='mb-3 font-semibold text-lg'>{t('Purpose of use of Personal Information')}</li>
          <p className='mb-2'>
            {t("The Service uses and collects users' personal information for the following purposes")}
          </p>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>{t('To provide this service')}</li>
            <li>{t('To respond to inquiries from users, etc')}</li>
          </ul>
        </div>

        <div className='mb-5'>
          <li className='mb-3 font-semibold text-lg'>{t('Provision of Personal Information to Third Parties')}</li>
          <p className='mb-2'>
            {t(
              'We will not provide personal information to third parties without obtaining the prior consent of the individual, except as required by law',
            )}
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 font-semibold text-lg'>{t('Management of Personal Information')}</li>
          <p className='mb-2'>
            {t(
              'Collected personal information will be stored safely under appropriate management, and appropriate technical and organizational prevention and countermeasures will be taken against risks such as unauthorized access, loss, destruction, falsification, and leakage',
            )}
          </p>
          <p>
            {t(
              'When outsourcing operations that handle personal information or information systems, we will do so under the strict control and supervision of the outsourced company',
            )}
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 font-semibold text-lg'>
            {t('Disclosure, Correction, Suspension of Use, Deletion, and Complaints Regarding Personal Information')}
          </li>
          <p>
            {t(
              'The Service confirms that the individual has the right to request disclosure, correction, suspension of use, or deletion of his/her own personal information, and has established a Personal Information Handling Inquiry Desk to promptly respond to such requests and complaints',
            )}
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 font-semibold text-lg'>{t('Privacy')}</li>

          <div className='mb-4'>
            <p className='mb-3 font-semibold'>{t('About Access Analysis Tools')}</p>
            <p className='mb-2'>
              {t('This service uses Google Analytics, an access analysis tool by Google')}
              {t('This Google Analytics uses cookies to collect data')}
              {t('This data is collected anonymously and does not personally identify you')}
            </p>
            <p className='mb-2'>
              {t('This feature can be disabled by disabling cookies, so please check your browser settings')}
              {t.rich(
                'For more information on this policy, please see the Google Analytics Terms of Service and Privacy Policy Privacy and Terms Google',
                {
                  a1: (chunks) => (
                    <LinkInNewTab href={t('URL of Google Analytics Terms of Service')} className='underline'>
                      {chunks}
                    </LinkInNewTab>
                  ),
                  a2: (chunks) => (
                    <LinkInNewTab href={t('URL of Google Privacy Policy')} className='underline'>
                      {chunks}
                    </LinkInNewTab>
                  ),
                },
              )}
            </p>
            <p>{t('You can prevent Google Analytics from collecting data by disabling cookies in your browser')}</p>
          </div>

          <div>
            <p className='mb-3 font-semibold'>{t('About Advertisements')}</p>
            <p className='mb-2'>
              {t('This service uses Google AdSense, a third-party advertising service')}
              {t(
                'This Google AdSense uses cookies to display advertisements for products and services based on user interests',
              )}
              {t('This data is collected anonymously and does not personally identify you')}
            </p>
            <p className='mb-2'>
              {t('This feature can be disabled by disabling cookies, so please check your browser settings')}
              {t.rich('For more information on this policy, please visit Advertising - Policies and Terms - Google', {
                a: (chunks) => (
                  <LinkInNewTab href={t('URL of Google Advertising Privacy Policy')} className='underline'>
                    {chunks}
                  </LinkInNewTab>
                ),
              })}
            </p>
            <p>{t('You can prevent Google AdSense from collecting data by disabling cookies in your browser')}</p>
          </div>
        </div>

        <div>
          <li className='mb-3 font-semibold text-lg'>
            {t('Contact for inquiries and requests for disclosure, etc, concerning personal information')}
          </li>
          <p>
            {t.rich('Please contact us here', {
              a: (chunks) => (
                <LinkInNewTab href='https://twitter.com/at_946' className='underline'>
                  {chunks}
                </LinkInNewTab>
              ),
            })}
          </p>
        </div>
      </ul>
      <p>
        {t('Last update: date', {
          date: format.dateTime(new Date('2023/4/30'), {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        })}
      </p>
    </div>
  );
}
