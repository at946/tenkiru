'use client';

import { NextPage } from 'next';
import CreateRoomButton from './components/createRoomButton';

interface Props {
  roomId: string;
}

const HomePage: NextPage<Props> = ({ roomId }) => {
  return (
    <div className='has-text-centered'>
      <section className='section'>
        <h1 className='title has-text-primary'>Tenkir</h1>
        <CreateRoomButton roomId={roomId} />
      </section>
      <section className='section'>
        <div className='card has-text-left mx-auto mb-6' style={{ maxWidth: '600px' }}>
          <header className='card-header'>
            <p className='card-header-title'>Tenkirとは</p>
          </header>
          <div className='card-content'>
            <p>
              <strong className='has-text-primary'>
                Tenkir（テンキル）は、オンラインでプランニングポーカーを楽しめるプロダクトです。
              </strong>
              部屋を作成しURLを共有するだけで、誰でもブラウザから参加できます。アプリや設定は不要で、無料で利用可能です。直感的なUIで誰でもすぐに使いこなせます。（もし気に入っていただけたらサポートいただけると嬉しいです！）
            </p>
          </div>
        </div>

        <div className='card has-text-left mx-auto' style={{ maxWidth: '600px' }}>
          <header className='card-header'>
            <p className='card-header-title'>プランニングポーカーとは</p>
          </header>
          <div className='card-content'>
            <p>
              <strong className='has-text-primary'>
                プランニングポーカーは、チームでタスクやストーリーの見積もりを行う手法で、ゲーム感覚で楽しみながらより正確な見積もりを実現できます。
              </strong>
              メンバーは、それぞれが相対見積もりでカードを選択し、一斉にオープンして見積もりを共有します。その後、各メンバーが自分の選択理由を説明し、再度カードを選んで最終的なチームの見積もりを決めます。アジャイル開発チームでよく使われる手法です。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
