'use client';

import { NextPage } from 'next';

const PPPage: NextPage = () => {
  return (
    <div className='container mx-auto my-10 px-5 text-sm dark:text-white'>
      <h1 className='mb-5 text-2xl font-bold'>プライバシーポリシー</h1>
      <p className='mb-5'>
        Tenkir（以下、「本サービス」）では、本サービスをご利用されるユーザーの個人情報の取扱について以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
      </p>

      <ul className='mb-5 list-inside list-decimal'>
        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>個人情報の利用目的</li>
          <p className='mb-2'>
            本サービスは、以下の利用目的のためにユーザーの個人情報を利用・収集します。
          </p>
          <ul className='ml-4 list-disc'>
            <li className='mb-1'>本サービスを提供するため</li>
            <li>ユーザーからのお問い合わせ等への対応のため</li>
          </ul>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>個人情報の第三者提供について</li>
          <p className='mb-2'>
            法令に定める場合を除き、個人情報を事前に本人の同意を得ることなく第三者に提供することは行いません。
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>個人情報の管理について</li>
          <p className='mb-2'>
            収集された個人情報は適切な管理の下で安全に蓄積・保管し、不正アクセス、紛失、
            破壊、改竄、漏洩などの危険に対して適切に技術的、組織的な予防および対策を講じます。
          </p>
          <p>
            個人情報もしくは情報システムを取り扱う業務を外部に委託する場合には、委託先の厳正な管理監督の下で行います。
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>
            個人情報の開示・訂正・利用停止・消去・苦情について
          </li>
          <p>
            本サービスは、本人が自己の個人情報について、開示・訂正・利用停止・消去などを求める権利を有していることを確認し、
            「個人情報取扱に関するお問い合わせ窓口」を設け、これらの要求や苦情に対して速やかに対処します。
          </p>
        </div>

        <div className='mb-5'>
          <li className='mb-3 text-lg font-semibold'>プライバシー</li>

          <div className='mb-4'>
            <p className='mb-3 font-semibold'>アクセス解析ツールについて</p>
            <p className='mb-2'>
              本サービスは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p className='mb-2'>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
              <a
                href='https://marketingplatform.google.com/about/analytics/terms/jp/'
                target='_blank'
                rel='noreferrer'
                className='underline'
              >
                Googleアナリティクス利用規約
              </a>
              や
              <a
                href='https://policies.google.com/privacy?hl=ja'
                target='_blank'
                rel='noreferrer'
                className='underline'
              >
                プライバシーポリシー – ポリシーと規約 – Google
              </a>
              をご覧ください。
            </p>
            <p>
              ブラウザでCookieを無効にすることで、Googleアナリティクスがデータを収集することを防ぐことができます。
            </p>
          </div>

          <div>
            <p className='mb-3 font-semibold'>広告について</p>
            <p className='mb-2'>
              本サービスは、第三者配信の広告サービス「Googleアドセンス」を利用しています。このGoogleアナリティクスは、ユーザーの興味に応じた商品やサービスの広告を表示するためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
            </p>
            <p className='mb-2'>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
              <a
                href='https://policies.google.com/technologies/ads?gl=jp'
                target='_blank'
                rel='noreferrer'
                className='underline'
              >
                広告 - ポリシーと規約 - Google
              </a>
              をご覧ください。
            </p>
            <p>
              ブラウザでCookieを無効にすることで、Googleアドセンスがデータを収集することを防ぐことができます。
            </p>
          </div>
        </div>

        <div>
          <li className='mb-3 text-lg font-semibold'>
            個人情報に関するお問い合わせ、開示等の請求に関する窓口
          </li>
          <p>
            <a
              href='https://twitter.com/at_946'
              target='_blank'
              rel='noreferrer'
              className='underline'
            >
              こちら
            </a>
            から問い合わせお願いします。
          </p>
        </div>
      </ul>

      <p>最終更新日： 2023年4月30日</p>
    </div>
  );
};

export default PPPage;
