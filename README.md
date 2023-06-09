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
$ yarn test
```

or

```bash
$ docker compose exec app yarn test:playwright
```

\* テスト実施時は Tenkir アプリを立ち上げた状態で行います。

## Lint and formatter

```bash
$ yarn format:fix
```

or

```bash
$ docker compose run app yarn format:fix
```

## Storybook

```bash
$ yarn storybook
```

or

```bash
$ docker compose exec app yarn storybook
```

`http://localhost:6006`で Storybook が利用できます。

## Storybook test

```bash
$ yarn test:storybook
```

or

```bash
$ docker compose exec app yarn test:storybook
```

\* Storybook を立ち上げている状態で行います。
