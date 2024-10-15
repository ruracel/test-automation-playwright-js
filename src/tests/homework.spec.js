import { test } from "@playwright/test";

/**
 * Lesson 1: First test
 */
//1.Otevřít stránku pro registraci 
test("should open login page", async ({ page }) => {
  await page.goto("https://team8-2022brno.herokuapp.com/registrace");

  await page.pause(5000);

  await page.setViewportSize({ width: 800, height: 600 });
  await page.screenshot({ path: "registration_page_800_600.png" });

  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.screenshot({ path: "registration_page_1920_1080.png" });
});