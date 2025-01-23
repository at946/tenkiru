import type { TLocales } from '@/i18n/routing';
import '@/styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import type React from 'react';
import GoogleAdsense from '../GoogleAdsense';
import GoogleAnalytics from '../GoogleAnalytics';
import RecoilProvider from '../RecoilProvider';
import ThemeProvider from '../ThemeProvider';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

interface MetaProps {
  params: {
    locale: TLocales;
  };
}

export async function generateMetadata({ params: { locale } }: MetaProps) {
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
      images: '/opengraph-image.jpg',
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

export default async function RootLayout({ children, params: { locale } }: Props) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <RecoilProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <div className='flex min-h-screen flex-col'>
                <Header currentLocale={locale} />
                <main>{children}</main>
                <Footer />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </RecoilProvider>
        <GoogleAnalytics />
        <GoogleAdsense />
      </body>
    </html>
  );
}
