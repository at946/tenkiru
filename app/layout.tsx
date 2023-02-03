'use client';

import '../styles/globals.scss';
import Footer from '../components/common/footer';
import Header from '../components/common/header';

// redux
import { Provider } from 'react-redux';
import { store } from '../store/store';
import GoogleAnalytics from './GoogleAnalytics';
import GoogleAdsense from './GoogleAdsense';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <body>
        <Provider store={store}>
          <div className='is-flex is-flex-direction-column' style={{ minHeight: '100vh' }}>
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </Provider>
        <GoogleAnalytics />
        <GoogleAdsense />
      </body>
    </html>
  );
}
