import { test } from '@playwright/test';

test('auto register Iftar event with smart refresh', async ({ page }) => {
  test.setTimeout(3 * 60 * 60 * 1000); // 3 hours max

  console.log("⏳ Navigating to events page...");
  await page.goto('https://www.smashfoundation.com/events', { waitUntil: 'networkidle' });

  const pollInterval = 1000; // 1s polling inside page
  const refreshInterval = 3000; // 3s wait before refresh

  while (true) {
    // Wait a short time for events to render
    await page.waitForTimeout(2000);

    // Check if event is present
    const eventBtn = page.locator("text=Day").first();
    const isVisible = await eventBtn.isVisible().catch(() => false);

    if (!isVisible) {
      console.log(`⏳ Iftar event not yet visible, refreshing in ${refreshInterval / 1000}s...`);
      await page.waitForTimeout(refreshInterval);
      await page.reload({ waitUntil: 'networkidle' });
      continue;
    }

    console.log("✅ Iftar event found! Clicking...");
    await eventBtn.click();

    // Wait for modal
    const modal = page.locator('div[role="dialog"]');
    await modal.waitFor({ state: 'visible', timeout: 5000 });

    // Already registered?
    const alreadyRegistered = modal.locator('h4:text("You\'re All Set!")');
    if ((await alreadyRegistered.count()) > 0) {
      console.log("⚠️ Already registered – refreshing in 3s...");
      await page.waitForTimeout(refreshInterval);
      await page.keyboard.press("Escape");
      await page.reload({ waitUntil: 'networkidle' });
      continue;
    }

    // Registration button
    const registerBtn = modal.locator('button[data-slot="button"]');
    await registerBtn.waitFor({ state: 'attached', timeout: 5000 });
    await registerBtn.scrollIntoViewIfNeeded();

    // Polling loop for availability
    let registered = false;
    while (!registered) {
      const btnText = await registerBtn.innerText().catch(() => "");
      const isDisabled = await registerBtn.isDisabled().catch(() => true);

      if (btnText.includes("Event Full") || isDisabled) {
        console.log(`⚠️ Event Full – refreshing in ${refreshInterval / 1000}s...`);
        await page.waitForTimeout(refreshInterval);
        await page.keyboard.press("Escape");
        await page.reload({ waitUntil: 'networkidle' });
        break; // exit polling, retry outer loop
      }

      console.log(`🔹 Button text: "${btnText}", disabled: ${isDisabled}`);
      await registerBtn.click();
      console.log("✅ Registration button clicked!");

      // Confirm button if present
      const confirmBtn = modal.locator('button:has-text("Confirm")');
      if ((await confirmBtn.count()) > 0) {
        await confirmBtn.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {});
        await confirmBtn.click().catch(() => {});
        console.log("✅ Confirm button clicked!");
      }

      // Success banner
      const successBanner = modal.locator('h4:text("You\'re All Set!")');
      if ((await successBanner.count()) > 0) {
        console.log("🎉 Registration confirmed!");
        console.log("⏳ Waiting 2 minutes after registration...");
        await page.waitForTimeout(2 * 60 * 1000);
        console.log("✅ Done waiting after registration.");
        registered = true;
        break;
      }

      await page.waitForTimeout(pollInterval);
    }

    if (registered) break; // exit outer loop after registration
  }
});