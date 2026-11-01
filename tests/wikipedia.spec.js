const { test, expect } = require('@playwright/test');

test('Поиск статьи о playwright в wikipedia', async ({ page }) => {

    await test.step('Проверка главной страницы', async () => {
        await page.goto('https://en.wikipedia.org/wiki/Main_Page');

        await expect(page.locator('body')).toContainText('Welcome to Wikipedia');
    });

    await test.step('Поиск статьи через форму', async () => {
        const searchField = page.locator('#searchInput');

        await expect(searchField).toBeVisible();

        await searchField.fill('Playwright (software)');
        await searchField.press('Enter');
    });

    await test.step('Проверка открытой статьи', async () => {
        await expect(page).toHaveURL(/Playwright/);

        await expect(page.locator('body')).toContainText('Playwright');
    });

});