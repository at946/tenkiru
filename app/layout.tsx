import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { Metadata } from 'next';
import React from 'react';
import '../styles/globals.css';
import GoogleAdsense from './GoogleAdsense';
import GoogleAnalytics from './GoogleAnalytics';
import RecoilProvider from './RecoilProvider';
import ThemeProvider from './ThemeProvider';
import Footer from './components/common/Footer';
import Header from './components/common/Header';

// fontawesome
config.autoAddCss = false;

// metatags
const siteName = 'Tenkir | チームでわいわいプランニングポーカーアプリ';
const description =
  'Tenkirは無料のオンラインプランニングポーカーアプリです。' +
  'XPやスクラムなどのアジャイルなプロジェクト管理に最適です。' +
  'チームでの見積もりをリアルタイムで共有できます。' +
  '参加者はスマートフォンやパソコンのブラウザだけで参加できます。' +
  '直感的なUIと使いやすさが魅力です。';

export const metadata: Metadata = {
  title: siteName,
  description: description,
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    title: siteName,
    description: description,
    url: '/',
    siteName: siteName,
    type: 'website',
  },
  themeColor: '#812990',
  twitter: {
    card: 'summary',
  },
  verification: {
    google: 'Ah3duN64SajYBZS8Bc46SiFiEddyFhimdaawZmc20Z4',
  },
};

// OGPが表示されない応急処置
export const dynamic = 'force-dynamic';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
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
