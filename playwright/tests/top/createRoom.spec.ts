import { test, expect } from '@playwright/test';
import TopPage from '../../models/top-page';

test('トップページで、「部屋をつくる」ボタンを選択したとき、ランダムのルームページが作成され遷移すること', async ({
  page,
}) => {
  // Given
  const top = new TopPage(page);
  await top.goto();

  // When - ルームを作成
  await top.createRoom();

  // Then - ルームが作成され、ルームページに遷移する
  await expect(page).toHaveURL(/http:\/\/.*\/rooms\/.*/);
});
