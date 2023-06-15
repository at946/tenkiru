import '../styles/globals.css';
import { Metadata } from 'next';
import Footer from './components/common/Footer';
import Header from './components/common/Header';
import GoogleAdsense from './GoogleAdsense';
import ReduxProvider from './ReduxProvider';

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// redux
import GoogleAnalytics from './GoogleAnalytics';
import React from 'react';

// metatags
const siteName = 'Tenkir';
const description =
  'Tenkirは無料のオンラインプランニングポーカーアプリです。' +
  'XPやスクラムなどのアジャイルなプロジェクト管理に最適です。' +
  'チームでの見積もりをリアルタイムで共有できます。' +
  '参加者はスマートフォンやパソコンのブラウザだけで参加できます。' +
  '直感的なUIと使いやすさが魅力です。';

export const metadata: Metadata = {
  title: siteName,
  description: description,
  openGraph: {
    title: siteName,
    description: description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
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
        <div className='flex min-h-screen flex-col'>
          <Header />
          <ReduxProvider>
            <main>{children}</main>
          </ReduxProvider>
          <Footer />
        </div>
        <GoogleAnalytics />
        <GoogleAdsense />
      </body>
    </html>
  );
}
