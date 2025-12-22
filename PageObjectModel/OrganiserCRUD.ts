// PageObjectModel/OrganiserCRUD.ts
import { Page, Locator, expect } from '@playwright/test';

export class OrganiserPage {
  readonly page: Page;

  // Main locators
  readonly menudrawer: Locator;
  readonly organisermenu: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menudrawer = page.getByRole('button', { name: 'open drawer' });
    this.organisermenu = page.getByRole('link', { name: 'Organisers' });
    this.addButton = page.getByRole('button', { name: 'Add' });
  }

  // Navigate to organisers page (assumes user logged in)
  async navigateToOrganisers() {
    await expect(this.menudrawer).toBeVisible({ timeout: 10000 });
    await this.menudrawer.click();

    await expect(this.organisermenu).toBeVisible({ timeout: 10000 });
    await this.organisermenu.click();

    await expect(this.addButton).toBeVisible({ timeout: 10000 });
  }

  // Create a new organiser
  async createOrganiser(
    name: string,
    email: string,
    phone: string,
    password: string,
    orgName: string
  ) {
    await this.addButton.click();

    const form = this.page.locator('div[role="dialog"]');
  

    // Use label-based locators for reliability
    const nameInput = form.getByLabel('Name');
    await nameInput.waitFor({ state: 'visible', timeout: 10000 });
    const emailInput = form.getByLabel('Email');
    const phoneInput = form.getByLabel('Phone');
    const organisationInput = form.getByLabel('Organisation Name');
    const passwordInput = form.getByLabel('Password');
    const confirmPasswordInput = form.getByLabel('Confirm Password');
    const statusCheckbox = form.locator('input[type="checkbox"]');
    const saveButton = form.getByRole('button', { name: 'Save' });

    await expect(nameInput).toBeVisible({ timeout: 5000 });

    await nameInput.fill(name);
    await emailInput.fill(email);
    await phoneInput.fill(phone);
    await statusCheckbox.check();
    await organisationInput.fill(orgName);
    await passwordInput.fill(password);
    await confirmPasswordInput.fill(password);

    await saveButton.click();
    await form.waitFor({ state: 'detached', timeout: 10000 });
  }

  // Edit an existing organiser
  async editOrganiser(
    existingName: string,
    newName: string,
    newEmail: string,
    newPhone: string
  ) {
    const row = this.page.locator('table tr', { hasText: existingName });
    const editBtn = row.getByRole('button', { name: 'Edit' });

    await expect(editBtn).toBeVisible({ timeout: 10000 });
    await editBtn.click();

    const form = this.page.locator('div[role="dialog"]');
    await form.waitFor({ state: 'visible', timeout: 10000 });

    const nameInput = form.getByLabel('Name');
    const emailInput = form.getByLabel('Email');
    const phoneInput = form.getByLabel('Phone');
    const updateBtn = form.getByRole('button', { name: 'Update' });

    await expect(nameInput).toBeVisible({ timeout: 10000 });

    await nameInput.fill(newName);
    await emailInput.fill(newEmail);
    await phoneInput.fill(newPhone);

    await updateBtn.click();
    await form.waitFor({ state: 'detached', timeout: 10000 });
  }
}
