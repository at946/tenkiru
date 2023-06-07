'use client';

import { NextPage } from 'next';
import CreateRoomButton from './components/CreateRoomButton';
import TitleAndContentBox from './components/TitleAndContentBox';

const HomePage: NextPage = () => {
  return (
    <div className='container mx-auto px-5 text-center'>
      <div className='my-16'>
        <h1 className='mb-4 text-3xl font-bold text-purple-600'>Tenkir</h1>
        <CreateRoomButton />
      </div>

      <div className='my-5'>
        <TitleAndContentBox title='Tenkirとは' extraClass='mb-5'>
          <span className='text-purple-600'>
            Tenkir（テンキル）は、オンラインでプランニングポーカーを楽しめるプロダクトです。
          </span>
          <br />
          部屋を作成しURLを共有するだけで、誰でもブラウザから参加できます。アプリや設定は不要で、無料で利用可能です。直感的なUIで誰でもすぐに使いこなせます。（もし気に入っていただけたらサポートいただけると嬉しいです！）
        </TitleAndContentBox>

        <TitleAndContentBox title='プランニングポーカーとは'>
          <span className='text-purple-600'>
            プランニングポーカーは、チームでタスクやストーリーの見積もりを行う手法で、ゲーム感覚で楽しみながらより正確な見積もりを実現できます。
          </span>
          <br />
          メンバーは、それぞれが相対見積もりでカードを選択し、一斉にオープンして見積もりを共有します。その後、各メンバーが自分の選択理由を説明し、再度カードを選んで最終的なチームの見積もりを決めます。アジャイル開発チームでよく使われる手法です。
        </TitleAndContentBox>
      </div>
    </div>
  );
};

export default HomePage;
