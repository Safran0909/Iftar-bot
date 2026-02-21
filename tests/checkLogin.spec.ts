import { test, expect } from '@playwright/test';

test('already logged in', async ({ page }) => {
  await page.goto('https://www.smashfoundation.com/events');

  await expect(page).toHaveURL(/events/);

  console.log('Logged in successfully.');
});