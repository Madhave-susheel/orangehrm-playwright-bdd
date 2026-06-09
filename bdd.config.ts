import { defineBddConfig } from 'playwright-bdd';

export const testDir = defineBddConfig({
  features: 'features/**/*.feature',
  steps: 'steps/**/*.steps.ts',
  importTestFrom: 'fixtures/fixtures.ts',
});
