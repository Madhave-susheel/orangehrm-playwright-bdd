import { Page, Locator } from '@playwright/test';
import { selectDropdownValue, selectAutocompleteValue } from '../utils/helpers.js';

export class RecruitmentPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly saveButton: Locator;

  // Add Candidate Form Fields
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly contactInput: Locator;
  readonly vacancyDropdown: Locator;
  readonly resumeInput: Locator;
  readonly keywordsInput: Locator;
  readonly notesTextArea: Locator;
  readonly consentCheckbox: Locator;

  // Search Fields
  readonly searchCandidateNameInput: Locator;
  readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Add Form Fields
    this.firstNameInput = page.locator('input.orangehrm-firstname');
    this.middleNameInput = page.locator('input.orangehrm-middlename');
    this.lastNameInput = page.locator('input.orangehrm-lastname');
    this.emailInput = page.locator('.oxd-input-group', { hasText: 'Email' }).locator('input').first();
    this.contactInput = page.locator('.oxd-input-group', { hasText: 'Contact Number' }).locator('input').first();
    this.vacancyDropdown = page.locator('.oxd-input-group', { hasText: 'Vacancy' }).locator('.oxd-select-text').first();
    this.resumeInput = page.locator('input[type="file"]').first();
    this.keywordsInput = page.locator('.oxd-input-group', { hasText: 'Keywords' }).locator('input').first();
    this.notesTextArea = page.locator('.oxd-input-group', { hasText: 'Notes' }).locator('textarea').first();
    this.consentCheckbox = page.locator('.oxd-checkbox-wrapper input[type="checkbox"]').first();

    // Search Fields
    this.searchCandidateNameInput = page.locator('.oxd-input-group', { hasText: 'Candidate Name' }).locator('input').first();
    this.searchButton = page.getByRole('button', { name: 'Search' });
  }

  async clickAddCandidate(): Promise<void> {
    await this.addButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async fillCandidateDetails(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    contactNumber: string,
    vacancy: string,
    keywords?: string,
    notes?: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.middleNameInput.fill(middleName);
    await this.lastNameInput.fill(lastName);
    await selectDropdownValue(this.page, this.vacancyDropdown, vacancy);
    await this.emailInput.fill(email);
    await this.contactInput.fill(contactNumber);
    
    if (keywords) {
      await this.keywordsInput.fill(keywords);
    }
    if (notes) {
      await this.notesTextArea.fill(notes);
    }
  }

  async uploadResume(filePath: string): Promise<void> {
    await this.resumeInput.setInputFiles(filePath);
  }

  async acceptConsent(): Promise<void> {
    // Checkbox is usually nested inside label, we can check it using standard check
    await this.consentCheckbox.check({ force: true });
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async searchCandidate(candidateName: string): Promise<void> {
    // Select via auto-complete
    await selectAutocompleteValue(this.page, this.searchCandidateNameInput, candidateName, candidateName);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }
}
