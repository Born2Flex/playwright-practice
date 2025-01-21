import type { Page } from '@playwright/test';

export class MainPage {
    constructor(readonly page: Page) {}

    async goto() {
        await this.page.goto('/');
    }

    async selectCategory(categoryName: string) {
        await this.page.locator('label').filter({ hasText: categoryName }).click();
    }

    async goToOneWeekCroatiaTripResults() {
        await this.goto();
        await this.page.getByText('Where', { exact: true }).click();
        await this.page.getByTestId('structured-search-input-field-query').fill('Croatia');
        await this.page.getByTestId('structured-search-input-field-split-dates-0').click();
        await this.page.getByTestId('expanded-searchbar-dates-flexible-tab').click();
        await this.page.getByTestId('structured-search-input-field-guests-button').click();
        await this.page.getByTestId('stepper-adults-increase-button').click();
        await this.page.getByTestId('stepper-adults-increase-button').click();
        await this.page.getByTestId('structured-search-input-search-button').click();
    }
}