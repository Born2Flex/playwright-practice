import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',
    timeout: 60_000,

    use: {
        baseURL: 'https://www.airbnb.com',
        trace: 'on-first-retry',
        video: 'on'
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },

        // {
        //     name: 'firefox',
        //     use: {...devices['Desktop Firefox']},
        // },
        //
        // {
        //     name: 'webkit',
        //     use: {...devices['Desktop Safari']},
        // },
    ],
});
