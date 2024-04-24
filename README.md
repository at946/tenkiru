# Tenkiru

https://tenkir.fly.dev/

Tenkiru is a simple and fun planning poker app. Simply create a room, share the room URL with your team members and start using it immediately.

## Start app

```bash
$ pnpm install
$ pnpm dev
$ open http://localhost:3000
```

## E2E test

The application must be launched.

```bash
$ pnpm test:playwright # execute E2E tests
$ pnpm test:playwright:report # open the report
```

## Lint and formatter

```bash
$ pnpm biome:fix
```

## Storybook

```bash
$ pnpm storybook
```

## Component tests

Storybook must be launched.

```bash
$ yarn test:storybook
```
