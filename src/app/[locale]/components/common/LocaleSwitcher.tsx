'use client';

import type { NextPage } from 'next';
import Select from '@/app/[locale]/components/common/Select';
import { routing, usePathname, useRouter } from '@/i18n/routing';

interface Props {
  currentLocale: string;
  ariaLabel: string;
}

const LocaleSwitcher: NextPage<Props> = ({ currentLocale, ariaLabel }) => {
  const router = useRouter();
  const pathname: string = usePathname();

  const switchLolale = (locale: string): void => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <Select
      label={<span className='icon-[ic--baseline-language] mr-1 text-2xl' />}
      value={currentLocale}
      onChange={(e) => switchLolale(e.target.value)}
      aria-label={ariaLabel}
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
