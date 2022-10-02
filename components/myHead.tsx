import { NextPage } from "next";
import Head from "next/head";

const MyHead: NextPage = () => {
  const title = 'テンキル'
  const description = 'オンラインプランニングポーカーツール'

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default MyHead