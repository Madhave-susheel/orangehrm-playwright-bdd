# OrangeHRM Playwright-BDD Automation Framework

A production-grade, enterprise-ready QA automation framework targeting the OrangeHRM demo application. This project uses **TypeScript**, **Playwright Test Runner**, and **playwright-bdd** (not Cucumber-JS) to convert Gherkin feature scenarios into native Playwright tests.

---

## Key Features

- **TypeScript Native**: Full typing support for locators, fixtures, and helpers.
- **Playwright-BDD Integration**: Converts Gherkin feature files directly into native, executable Playwright tests. Retains all Playwright native capabilities like auto-waiting, fixtures, traces, screenshots, video capture, and parallel test runs.
- **Strict Selector Policy**: Uses Playwright's built-in wait-free locators prioritizing web accessibility tags (`getByRole`, `getByPlaceholder`, `getByText`). Avoids fragile XPath expressions.
- **No-Wait Policy**: Free of arbitrary delays (`setTimeout`, `sleep`, or `page.waitForTimeout`), relying strictly on Playwright's auto-waiting and web-first assertions.
- **Page Object Model (POM)**: Distinct separation of elements/actions (stored in page objects) and assertions (defined only in step files).
- **Dependency Injected Fixtures**: Native Playwright custom test instances automatically instantiate and clean up page objects.
- **Resilient Buzz Mocking**: Incorporates route-level mocking for the restricted Buzz newsfeed module, allowing complete post creation verification to run and pass successfully.

---

## Folder Structure

```
project-root/
├── features/         # Gherkin .feature specifications
├── steps/            # Step definitions mapping Gherkin scenarios to POM actions
├── pages/            # Page Object Model classes (actions only, no assertions)
├── fixtures/         # Custom fixtures (dependency injection containers)
├── utils/            # Helper utilities (handling custom select dropdowns, autocompletes)
├── test-data/        # JSON files for credential configurations and file upload assets
├── playwright.config.ts  # Standard Playwright execution configs
├── bdd.config.ts     # Playwright-BDD generation path maps
├── package.json      # Dependencies and execution script shortcuts
├── tsconfig.json     # Compiler preferences
└── README.md
```

---

## Setup and Installation

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Generate BDD Tests**:
   Generate executable Playwright spec files from Gherkin feature definitions:
   ```bash
   npx bddgen
   ```

3. **Execute Tests**:
   Run the test runner across Chromium headless projects:
   ```bash
   npx playwright test
   ```

   *Alternatively, run both steps combined using the package script:*
   ```bash
   npm run test
   ```

4. **Show Report**:
   ```bash
   npx playwright show-report
   ```

---

## Environment & Test Configuration

- **Parallel Run**: Enabled globally (`fullyParallel: true`).
- **Retries**: Configured to retry once on failure (`retries: 1`).
- **Assets on Failure**:
  - **Traces**: Captured on first retry/failure (`trace: 'retain-on-failure'`).
  - **Screenshots**: Captured on failure (`screenshot: 'only-on-failure'`).
  - **Videos**: Recorded on failure (`video: 'retain-on-failure'`).
