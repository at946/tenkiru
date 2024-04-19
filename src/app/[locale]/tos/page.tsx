import { useFormatter, useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Terms of Use');
  const format = useFormatter();

  return (
    <div className='container mx-auto my-10 px-5 text-sm dark:text-white'>
      <h1 className='mb-5 text-2xl font-bold'>{t('Terms of Use')}</h1>
      <p className='mb-5'>
        {t('These Terms of Use shall apply to Tenkiru')}
        {t('All users are requested to use the Service in accordance with these Terms of Use')}
      </p>

      <ul className='mb-5 list-inside list-decimal'>
        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>{t('Application of Terms of Use')}</li>
          <p>
            {t(
              'These Terms of Use shall apply to all relationships between the users and the use of this Service',
            )}
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>{t('Change of Terms of Use')}</li>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>
              {t(
                'This Service reserves the right to change these Terms of Use without the consent of users',
              )}
              {t(
                'In such cases, these Terms of Use of this Service shall be governed by the amended Terms of Use',
              )}
            </li>
            <li>
              {t(
                'Unless otherwise specified, the revised Terms of Use shall become effective from the time they are displayed on this Service',
              )}
            </li>
          </ul>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>{t('Prohibited Actions')}</li>
          <p className='mb-2'>
            {t(
              'If the Operator determines that a user falls under any of the following items, the Operator may prohibit the user from using this Service or terminate all or part of these Terms of Use without prior notice or demand to the user',
            )}
          </p>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>{t('Interfering with the operation of this Service')}</li>
            <li className='mb-1'>
              {t(
                'Actions that transmit or distribute harmful computer programs such as computer viruses, actions that aim to send chain mail, spam mail, etc, and actions that significantly burden this Service',
              )}
            </li>
            <li className='mb-1'>
              {t('Falsifying or deleting information that may be used by this Service')}
            </li>
            <li className='mb-1'>
              {t(
                'Actions that infringes or may infringe the property, privacy, honor or portrait rights of the Operator or a third party, or any stalking behavior',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'Actions that infringes or may infringe the property, privacy, honor or portrait rights of the Operator or a third party, or any stalking behavior',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'Distribution of obscene videos or images, or inducing users to visit other websites that carry such videos or images',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'Other actions that the Operator deems offensive to public order and morals or infringing on the rights of others',
              )}
            </li>
            <li>{t('Other activities that the Operator deems inappropriate')}</li>
          </ul>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>{t('Temporary interruption of Service')}</li>
          <p className='mb-2'>
            {t(
              'The Operator may temporarily suspend the operation of the Service without prior notice to users for any of the following reasons',
            )}
          </p>
          <ul className='mb-2 ml-4 list-disc'>
            <li className='mb-1'>
              {t(
                'When maintenance of this Service or related facilities is performed on a regular or urgent basis',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'When the provision of communication lines, electric power, etc used for this Service is interrupted',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'When the operator is unable to operate the Service due to circumstances beyond its control, such as fire, power failure, earthquakes, typhoons, floods, tsunamis, or other natural disasters or epidemics (including circumstances that occur on the server used by the Operator)',
              )}
            </li>
            <li>{t('When the Operator deems it necessary for other reasons')}</li>
          </ul>
          <p>
            {t(
              'The Operator shall not be liable for any damages incurred by users, customers, or third parties as a result of any delay, interruption, or suspension of the operation of the Service for any reason',
            )}
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>{t('Disclaimers')}</li>
          <p className='mb-2'>
            {t(
              'The Service may temporarily suspend the operation of the Service without prior notice to users',
            )}
          </p>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>
              {t(
                "In the event that a user causes damage or infringes the rights of the Operator or any other third party due to the user's use of the Service, the user shall resolve the matter and compensate the Service and the relevant third party for the damage",
              )}
            </li>
            <li className='mb-1'>
              {t(
                'In the event of delay or inability to perform obligations under these Terms of Use due to natural disasters, war, riot, civil strife, enactment, amendment, or abolition of laws and regulations, orders or dispositions by public authorities, strikes or other acts of dispute, transportation accidents, or other reasons beyond the control of the parties, the parties concerned shall not be liable for such delay or inability',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'The Operator shall not be responsible to the users for any damage under any of the following items, as well as for any secondary data leakage, loss, or damage incidental to any of the following items',
              )}
            </li>
            <ul className='mb-1 ml-4 list-disc'>
              <li className='mb-1'>
                {t('Damages caused by programs not provided by the Operator')}
              </li>
              <li className='mb-1'>
                {t('Damages caused by unauthorized acts of third parties other than the Operator')}
              </li>
              <li className='mb-1'>
                {t(
                  'Damage caused by hackers and crackers breaking into or attacking servers or other actions',
                )}
              </li>
              <li className='mb-1'>
                {t(
                  'Damage caused by circumstances occurring on the server used by the Operator for the Service',
                )}
              </li>
              <li className='mb-1'>{t('Damages caused by bugs in the Service')}</li>
            </ul>
            <li className='mb-1'>
              {t(
                'The Operator does not guarantee the completeness, fitness for a particular purpose, or any other aspect of the Service',
              )}
              {t(
                'The Operator does not guarantee that the provision of the Service or the Site will continue without interruption',
              )}
              {t(
                'The Operator shall not be liable for any damages incurred by users or third parties in the event that the provision of the Service or the Site is suspended or discontinued',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'The Operator shall not be responsible for any data or information uploaded by users to the Service',
              )}
              {t(
                'The users are solely responsible for the accuracy of the data and information uploaded to the Service and for updating such information',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'The Operator may display and post advertisements on the Site regarding third parties',
              )}
              {t(
                'If a user enters into any contract with a third party, such as purchasing products or services from a third party through advertisements on the Site, the parties to such contract are the user and the third party, and the Service assumes no responsibility whatsoever',
              )}
            </li>
          </ul>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>{t('Termination of the Service')}</li>
          <p className='mb-2'>
            {t(
              'The Operator may terminate the operation of the Service without prior notice to users in any of the following cases',
            )}
          </p>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>
              {t(
                'The Operator may terminate the Service or any part of the Service to users upon notice to users with a reasonable notice period',
              )}{' '}
            </li>
            <li className='mb-1'>
              {t(
                'Notification in accordance with the preceding paragraph shall be made by posting a notice on this site or on the website',
              )}
            </li>
            <li className='mb-1'>
              {t(
                'If the Operator terminates the Service after notice to the users, the Operator shall be exempt from compensation or indemnification for any damage, loss, or other expense incurred by the users as a result of the termination of the Service',
              )}
            </li>
          </ul>
        </div>

        <div>
          <li className='mb-3 text-lg font-semibold'>{t('Consent Jurisdiction, etc')}</li>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>
              {t(
                'These Terms and Use shall be governed by and construed in accordance with the laws of Japan',
              )}
            </li>
            <li>
              {t(
                'The Yokohama District Court shall have exclusive jurisdiction in the first instance over any disputes arising in connection with this service',
              )}
            </li>
          </ul>
        </div>
      </ul>

      <p>
        {t('Last update: date', {
          date: format.dateTime(new Date('2023/1/20'), {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          }),
        })}
      </p>
    </div>
  );
}
