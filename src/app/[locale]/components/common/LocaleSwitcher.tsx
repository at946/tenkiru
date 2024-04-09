'use client';

import { locales, usePathname, useRouter } from '@/navigation';
import { NextPage } from 'next';

interface Props {
  currentLocale: string;
  ariaLabel: string;
}

const LocaleSwitcher: NextPage = (props: Props) => {
  const router = useRouter();
  const pathname: string = usePathname();

  const switchLolale = (locale: string): void => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <div className='flex items-center'>
      <span className='icon-[ic--baseline-language] mr-1 text-2xl' />
      <select
        className='cursor-pointer border-0 bg-transparent uppercase'
        value={props.currentLocale}
        onChange={(e) => switchLolale(e.target.value)}
        aria-label={props.ariaLabel}
      >
        {locales.map((locale) => (
          <option value={locale} key={locale}>
            {locale}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocaleSwitcher;
