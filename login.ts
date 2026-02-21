import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log("Opening login page...");

  await page.goto("https://smashfoundation.com/login");

  console.log("Please log in manually.");

  // Wait until redirected after login
  await page.waitForURL("**/events", { timeout: 120000 });

  console.log("Saving session...");

  await context.storageState({ path: "auth.json" });

  console.log("Login saved to auth.json!");
  await browser.close();
})();