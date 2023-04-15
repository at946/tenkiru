import '../styles/globals.scss';
import Footer from './components/common/footer';
import Header from './components/common/header';

// fontawesome
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// redux
import GoogleAnalytics from './GoogleAnalytics';
import GoogleAdsense from './GoogleAdsense';
import ReduxProvider from './ReduxProvider';

// metatags
const title = 'Tenkir';
const description =
  'Tenkirは無料のオンラインプランニングポーカーアプリです。' +
  'XPやスクラムなどのアジャイルなプロジェクト管理に最適です。' +
  'チームでの見積もりをリアルタイムで共有できます。' +
  '参加者はスマートフォンやパソコンのブラウザだけで参加できます。' +
  '直感的なUIと使いやすさが魅力です。';

export const metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: title,
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/ogp.jpg`,
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
  themeColor: '#812990',
  twitter: {
    card: 'summary',
  },
  verification: {
    google: 'Ah3duN64SajYBZS8Bc46SiFiEddyFhimdaawZmc20Z4',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <div className='is-flex is-flex-direction-column' style={{ minHeight: '100vh' }}>
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
