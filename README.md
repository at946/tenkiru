## Tenkir

https://tenkier.fly.dev/

Tenkir は無料のオンラインプランニングポーカーアプリです。XP やスクラムなどのアジャイルなプロジェクト管理に最適です。チームでの見積もりをリアルタイムで共有できます。参加者はスマートフォンやパソコンのブラウザだけで参加できます。直感的な UI と使いやすさが魅力です。

## Start app

```bash
$ yarn
$ yarn dev
```

or

```bash
$ docker compose run app yarn
$ docker compose up app
```

`http://localhost:3000`でアプリが利用できます。

## E2E test

```bash
$ cd playwright
$ yarn
$ yarn test
```

or

```bash
$ docker compose build playwright
$ docker compose up yarn test
```

\* テスト実施時は Tenkir アプリを立ち上げた状態で行います。

## Lint and formatter

```bash
$ yarn format:fix
```

or

```bash
docker compose run app yarn format:fix
```

## Storybook

```bash
$ yarn
$ yarn storybook
```

or

```bash
$ docker compose run storybook yarn
$ docker compose up storybook
```

`http://localhost:6006`で Storybook が利用できます。
