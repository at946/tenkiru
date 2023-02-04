'use client';

import { NextPage } from 'next';

const PPPage: NextPage = () => {
  return (
    <section className='section'>
      <h1 className='title is-4'>プライバシーポリシー</h1>
      <p className='content'>
        Tenkir（以下、「本サービス」）では、本サービスをご利用されるユーザーの個人情報の取扱について以下のとおりプライバシーポリシー（以下，「本ポリシー」といいます。）を定めます。
      </p>
      <ol className='content' style={{ listStylePosition: 'inside' }}>
        <li className='title is-5'>個人情報の利用目的</li>
        <div className='content'>
          <p>本サービスは、以下の利用目的のためにユーザーの個人情報を利用・収集します。</p>
          <ul>
            <li>本サービスを提供するため</li>
            <li>ユーザーからのお問い合わせ等への対応のため</li>
          </ul>
        </div>

        <li className='title is-5'>個人情報の第三者提供について</li>
        <div className='content'>
          <p>
            法令に定める場合を除き、個人情報を事前に本人の同意を得ることなく第三者に提供することは行いません。
          </p>
        </div>

        <li className='title is-5'>個人情報の管理について</li>
        <div className='content'>
          <p>
            収集された個人情報は適切な管理の下で安全に蓄積・保管し、不正アクセス、紛失、
            破壊、改竄、漏洩などの危険に対して適切に技術的、組織的な予防および対策を講じます。
          </p>
          <p>
            個人情報もしくは情報システムを取り扱う業務を外部に委託する場合には、委託先の厳正な管理監督の下で行います。
          </p>
        </div>

        <li className='title is-5'>個人情報の開示・訂正・利用停止・消去・苦情について</li>
        <div className='content'>
          <p>
            本サービスは、本人が自己の個人情報について、開示・訂正・利用停止・消去などを求める権利を有していることを確認し、
            「個人情報取扱に関するお問い合わせ窓口」を設け、これらの要求や苦情に対して速やかに対処します。
          </p>
        </div>

        <li className='title is-5'>プライバシー</li>
        <div className='content'>
          <p>
            <strong>アクセス解析ツールについて</strong>
          </p>
          <p>
            本サービスは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
          </p>
          <p>
            この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は
            <a
              href='https://marketingplatform.google.com/about/analytics/terms/jp/'
              target='_blank'
              rel='noreferrer'
              className='is-underlined'
            >
              Googleアナリティクスサービス利用規約ページ
            </a>
            や
            <a
              href='https://policies.google.com/privacy?hl=ja'
              target='_blank'
              rel='noreferrer'
              className='is-underlined'
            >
              Googleポリシーと規約ページ
            </a>
            をご覧ください。
          </p>
          <p>
            お客様のブラウザでCookieを無効にすることで、このサイトへの再訪問時にGoogleアナリティクスがお客様を認識することを防ぐことができます。
          </p>
        </div>

        <li className='title is-5'>個人情報に関するお問い合わせ、開示等の請求に関する窓口</li>
        <div className='content'>
          <p>
            <a
              href='https://twitter.com/at_946'
              target='_blank'
              rel='noreferrer'
              className='is-underlined'
            >
              こちら
            </a>
            から問い合わせお願いします。
          </p>
        </div>
      </ol>

      <div className='content'>最終更新日： 2023年1月20日</div>
    </section>
  );
};

export default PPPage;
