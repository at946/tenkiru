'use client';

import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { GA_TRACKING_ID, pageview } from '../lib/gtag';

const usePageView = () => {
  const pathname: string | null = usePathname();
  const searchParams: ReadonlyURLSearchParams | null = useSearchParams();

  useEffect(() => {
    if (!GA_TRACKING_ID || pathname === null) return;
    const url: string = `${pathname}${searchParams?.toString() ?? ''}`;
    pageview(url);
  }, [pathname, searchParams]);
};

const GoogleAnalytics = () => {
  usePageView();

  return (
    <>
      {GA_TRACKING_ID && (
        <>
          <Script
            id='ga_url'
            defer
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            strategy='afterInteractive'
          />
          <Script
            id='ga_script'
            defer
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
            strategy='afterInteractive'
          />
        </>
      )}
    </>
  );
};

export default GoogleAnalytics;
