'use client';

import { useTranslations } from 'next-intl';
import Select from '@/app/[locale]/components/common/Select';
import { routing, usePathname, useRouter } from '@/i18n/routing';

interface Props {
  currentLocale: string;
}

const LocaleSwitcher = ({ currentLocale }: Props) => {
  const router = useRouter();
  const pathname: string = usePathname();
  const t = useTranslations('Header');

  const switchLolale = (locale: string): void => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <Select
      label={<span className='icon-[ic--baseline-language] mr-1 text-2xl' />}
      value={currentLocale}
      onChange={(e) => switchLolale(e.target.value)}
      aria-label={t('Switch language')}
      className='uppercase'
    >
      {routing.locales.map((locale) => (
        <option value={locale} key={locale}>
          {locale}
        </option>
      ))}
    </Select>
  );
};

export default LocaleSwitcher;
