import { NextPage } from 'next';
import Head from 'next/head';

const MyHead: NextPage = () => {
  const title = 'Tenkir';
  const description =
    'Tenkir（テンキル）はオンラインプランニングポーカーツールです。チームメンバーでわいわい使ってね。';

  return (
    <Head>
      <title>{title}</title>
      <meta key='description' name='description' content={description} />
      <link rel='icon' href='/favicon.ico' />
      <meta property='og:site_name' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:url' content={process.env.NEXT_PUBLIC_BASE_URL} />
      <meta property='og:title' content={title} />
      <meta key='og:description' property='og:description' content={description} />
      <meta property='og:image' content={`${process.env.NEXT_PUBLIC_BASE_URL}/ogp.jpg`} />
      <meta property='twitter:card' content='summary' />
    </Head>
  );
};

export default MyHead;
