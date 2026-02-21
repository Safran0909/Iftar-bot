import { test } from '@playwright/test';

test('login and save session', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://smashfoundation.com/login');

  console.log('Log in manually in the opened browser.');

  await page.waitForURL('**/events', { timeout: 500000000 });

  await context.storageState({ path: 'auth.json' });

  console.log('Session saved to auth.json');
});