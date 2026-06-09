import { Page, Locator, expect } from '@playwright/test';

/**
 * Selects a value from OrangeHRM's custom dropdown component.
 * If the exact value is not found, falls back to the first non-empty option.
 * @param page Playwright Page instance
 * @param dropdownLocator Locator pointing to the dropdown element (.oxd-select-text)
 * @param value The text value to select
 */
export async function selectDropdownValue(page: Page, dropdownLocator: Locator, value: string): Promise<void> {
  await dropdownLocator.click();
  const dropdownList = page.locator('.oxd-select-dropdown');
  await dropdownList.waitFor({ state: 'visible', timeout: 5000 });
  
  const option = dropdownList.locator('.oxd-select-option', { hasText: value }).first();
  if (await option.isVisible()) {
    await option.click();
  } else {
    // Fallback: select the first option that isn't "-- Select --"
    const fallbackOption = dropdownList.locator('.oxd-select-option').nth(1);
    if (await fallbackOption.isVisible()) {
      await fallbackOption.click();
    } else {
      // If nth(1) is not visible, try first option
      await dropdownList.locator('.oxd-select-option').first().click();
    }
  }
}

export async function selectAutocompleteValue(
  page: Page,
  inputLocator: Locator,
  textToType: string,
  _selectText?: string
): Promise<string> {
  await inputLocator.click();
  await inputLocator.selectText();
  await inputLocator.press('Backspace');
  await inputLocator.pressSequentially(textToType, { delay: 100 });
  
  // Wait for 1.5 seconds for the backend search request and suggestions dropdown to populate
  await page.waitForTimeout(1500);
  
  const dropdown = page.locator('.oxd-autocomplete-dropdown');
  let fallbackNeeded = false;
  
  try {
    await expect(dropdown).toBeVisible({ timeout: 5000 });
    const option = dropdown.locator('.oxd-autocomplete-option').first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
    const optionText = await option.innerText();
    if (optionText.includes('No Records Found')) {
      fallbackNeeded = true;
    }
  } catch (e) {
    fallbackNeeded = true;
  }
  
  if (fallbackNeeded) {
    // Fallback search: clear and type 'a' to get any valid employee
    await inputLocator.click();
    await inputLocator.selectText();
    await inputLocator.press('Backspace');
    await inputLocator.pressSequentially('a', { delay: 100 });
    
    // Wait for 1.5 seconds for the fallback suggestions dropdown to populate
    await page.waitForTimeout(1500);
    
    await expect(dropdown).toBeVisible({ timeout: 5000 });
    const option = dropdown.locator('.oxd-autocomplete-option').first();
    await option.waitFor({ state: 'visible', timeout: 5000 });
  }
  
  const selectedOption = dropdown.locator('.oxd-autocomplete-option').first();
  const selectedText = await selectedOption.innerText();
  
  // Robust selection sequence
  await selectedOption.hover();
  await selectedOption.click();
  
  // Wait for dropdown to disappear, indicating selection has been processed
  await expect(dropdown).not.toBeVisible({ timeout: 5000 });
  
  return selectedText.trim();
}

export async function fillDateInput(page: Page, locator: Locator, dateStr: string): Promise<void> {
  const placeholder = await locator.getAttribute('placeholder');
  let formattedDate = dateStr;
  
  if (placeholder && dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    const [year, month, day] = dateStr.split('-');
    const lowerPlaceholder = placeholder.toLowerCase();
    if (lowerPlaceholder === 'yyyy-dd-mm') {
      formattedDate = `${year}-${day}-${month}`;
    } else if (lowerPlaceholder === 'yyyy-mm-dd') {
      formattedDate = `${year}-${month}-${day}`;
    }
  }
  
  await locator.focus();
  await locator.selectText();
  await locator.press('Backspace');
  
  // Ensure it's cleared across all OS and widget configurations
  await page.keyboard.press('Meta+A');
  await page.keyboard.press('Backspace');
  await page.keyboard.press('Control+A');
  await page.keyboard.press('Backspace');
  await locator.fill('');
  
  await locator.pressSequentially(formattedDate, { delay: 50 });
  await locator.press('Escape');
}

