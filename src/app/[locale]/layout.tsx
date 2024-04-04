import '@/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import GoogleAdsense from '../GoogleAdsense';
import GoogleAnalytics from '../GoogleAnalytics';
import RecoilProvider from '../RecoilProvider';
import ThemeProvider from '../ThemeProvider';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

// fontawesome
config.autoAddCss = false;

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: '/',
      siteName: t('title'),
      type: 'website',
    },
    twitter: {
      card: 'summary',
    },
    verification: {
      google: 'Ah3duN64SajYBZS8Bc46SiFiEddyFhimdaawZmc20Z4',
    },
  };
}

// OGPが表示されない応急処置
export const dynamic = 'force-dynamic';

interface Props {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body>
        <RecoilProvider>
          <ThemeProvider>
            <div className='flex min-h-screen flex-col'>
              <Header />
              <main>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </RecoilProvider>
        <GoogleAnalytics />
        <GoogleAdsense />
      </body>
    </html>
  );
}
