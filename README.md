# Tenkiru

https://tenkir.fly.dev/

Tenkiru is a simple and fun planning poker app. Simply create a room, share the room URL with your team members and start using it immediately.

## Start app

```bash
$ yarn
$ yarn dev
$ open http://localhost:3000
```

or

```bash
$ docker compose run app yarn
$ docker compose up app
$ open http://localhost:3000
```

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
