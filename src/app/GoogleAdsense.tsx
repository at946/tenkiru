'use client';

import Script from 'next/script';

const GoogleAdsense = () => {
  const clientId = process.env.NEXT_GOOGLE_ADSENSE_ID;

  if (!clientId) {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin='anonymous'
    />
  );
};

export default GoogleAdsense;
