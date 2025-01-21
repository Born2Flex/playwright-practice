import {expect, test} from './main-fixture';

// Task 1
test('Main page is present', async ({page, mainPage}) => {
    // Arrange
    await mainPage.goto();

    // Act
    const response = await page.goto(`/`);
    await mainPage.waitUntilContentLoaded();

    // Assert
    expect(response.status()).toBe(200);
    await expect(page).toHaveTitle(/Airbnb/);
    await page.screenshot({path: 'screenshots/main-page.png'});
});

// Task 2
// test('Category page is not empty', async ({page, mainPage}) => {
//     // Arrange
//     await mainPage.goto();
//
//     // Act
//     await mainPage.selectCategory('Historical homes');
//     await mainPage.waitUntilContentLoaded();
//
//     // Assert
//     expect(await page.getByTestId('card-container').count()).toBeGreaterThan(0);
//     await page.screenshot({path: 'screenshots/category.png'});
// });

// Task 3
test('Search for a week trip in Croatia for 2 adults', async ({page, mainPage}) => {
    // Arrange
    await mainPage.goto();

    // Act
    await page.getByText('Where', {exact: true}).click();
    await page.getByTestId('structured-search-input-field-query').fill('Croatia');
    await page.getByTestId('structured-search-input-field-split-dates-0').click();
    await page.getByTestId('expanded-searchbar-dates-flexible-tab').click();
    await page.getByTestId('structured-search-input-field-guests-button').click();
    await page.getByTestId('stepper-adults-increase-button').click();
    await page.getByTestId('stepper-adults-increase-button').click();
    await page.getByTestId('structured-search-input-search-button').click();
    await mainPage.waitUntilContentLoaded();

    // Assert
    expect(await page.getByTestId('card-container').count()).toBeGreaterThan(0);
    await page.screenshot({path: 'screenshots/search-results.png'});
});

// Task 4
test('Search for a week trip to Lisbon for 2 adults using POM', async ({page, mainPage}) => {
    // Arrange
    await mainPage.goToOneWeekLisbonTripResults();
    await mainPage.waitUntilContentLoaded();

    // Act
    expect(await page.getByTestId('card-container').count()).toBeGreaterThan(0);
    await page.getByTestId('card-container').first().click();
    const popupPage = await page.waitForEvent('popup');
    await popupPage.getByLabel('Close').click();

    // Assert
    await popupPage.screenshot({path: 'screenshots/lisbon-search.png'});
});
