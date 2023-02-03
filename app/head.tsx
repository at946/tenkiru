import GoogleAnalytics from './GoogleAnalytics';

const title = 'Tenkir';
const description =
  'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。';

export default function Head() {
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
    </>
  );
}
