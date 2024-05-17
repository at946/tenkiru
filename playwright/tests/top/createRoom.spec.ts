import { expect, test } from '@playwright/test';
import TopPage from '@pw/models/top-page';

test('When a user clicks create a room button on top page, the user moves to room page with random room id', async ({
  page,
}) => {
  // Given
  const top = new TopPage(page);
  await top.goto();

  // When
  await top.createRoom();

  // Then
  await expect(page).toHaveURL(/http:\/\/.*\/rooms\/.*/);
});
