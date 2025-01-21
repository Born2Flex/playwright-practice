import {expect, test} from './main-fixture';

// Task 1
test('Main page is present', async ({ page }) => {
    const response = await page.goto(`/`);
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/Airbnb/);
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="card-container"]', { state: 'visible', timeout: 10_000 });
    await page.screenshot({ path: 'screenshots/main-page.png' });
});

// Task 2
test('Category page is not empty', async ({ page }) => {
    await page.goto(`/`);
    await page.locator('label').filter({ hasText: 'Historical homes' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="card-container"]', { state: 'visible', timeout: 10_000 });
    // await page.waitForSelector('[data-testid="card-container"]', { state: 'visible' });

    expect(await page.getByTestId('card-container').count()).toBeGreaterThan(0);
    await page.screenshot({ path: 'screenshots/category-page.png' });
});

// Task 3
test('Search for a week trip in Croatia for 2 adults', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Where', { exact: true }).click();
    await page.getByTestId('structured-search-input-field-query').fill('Croatia');
    await page.getByTestId('structured-search-input-field-split-dates-0').click();
    await page.getByTestId('expanded-searchbar-dates-flexible-tab').click();
    await page.getByTestId('structured-search-input-field-guests-button').click();
    await page.getByTestId('stepper-adults-increase-button').click();
    await page.getByTestId('stepper-adults-increase-button').click();
    await page.getByTestId('structured-search-input-search-button').click();

    // await page.waitForSelector('[data-testid="card-container"]', { state: 'visible' });
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="card-container"]', { state: 'visible', timeout: 10_000 });
    expect(await page.getByTestId('card-container').count()).toBeGreaterThan(0);
    await page.screenshot({ path: 'screenshots/search-results.png' });
});

// Task 4
test('Search for a week trip to Lisbon for 2 adults using POM', async ({ page, mainPage }) => {
    await mainPage.goToOneWeekCroatiaTripResults();
    await page.waitForLoadState('networkidle');
    await page.waitForSelector('[data-testid="card-container"]', { state: 'visible', timeout: 10_000 });
    await mainPage.page.screenshot({ path: 'screenshots/lisbon-search.png' });
});

// const html = `<!DOCTYPE html>
// <html>
// <body>
// <script>
// setTimeout(() => {
//   document.body.innerHTML = '<input data-testid="create-title">';
// }, 2000);
// </script>
// </body>
// </html>`;
//
// test("some test", async ({page}) => {
//     await test.step("element with test id 'createTitle' exists", async () => {
//         await page.setContent(html);
//
//         // either one works:
//         // const input = page.locator('[data-testid="createTitle"]');
//         const input = page.getByTestId("create-title");
//
//         await input.fill("foobar");
//         await expect(input).toBeVisible(); // not really necessary
//         await expect(input).toHaveValue("foobar");
//     });
// });

// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });
//
// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');
//
//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();
//
//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
