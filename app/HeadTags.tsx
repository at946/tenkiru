const HeadTags = () => {
  const title = 'Tenkir';
  const description =
    'Tenkirは無料のオンラインプランニングポーカーアプリです。' +
    'XPやスクラムなどのアジャイルなプロジェクト管理に最適です。' +
    'チームでの見積もりをリアルタイムで共有できます。' +
    '参加者はスマートフォンやパソコンのブラウザだけで参加できます。' +
    '直感的なUIと使いやすさが魅力です。';

  return (
    <>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta key='description' name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
      <meta property='og:site_name' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
      <meta property='og:title' content={title} />
      <meta key='og:description' property='og:description' content={description} />
      <meta property='og:image' content={`${process.env.NEXT_PUBLIC_BASE_URL}/ogp.jpg`} />
      <meta property='twitter:card' content='summary' />
      <meta name='google-site-verification' content='Ah3duN64SajYBZS8Bc46SiFiEddyFhimdaawZmc20Z4' />
    </>
  );
};

export default HeadTags;
