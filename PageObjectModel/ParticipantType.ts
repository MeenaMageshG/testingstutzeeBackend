// PageObjectModel/ParticipantType.ts
import { Page, Locator, expect } from '@playwright/test';

export class ParticipantType {
  private readonly page: Page;

  // ===== LOCATORS =====

  // Drawer & Menus
  readonly menuDrawer: Locator;
  readonly eventsMenu: Locator;
  readonly participantTypeMenu: Locator;

  // Event
  readonly eventCard: Locator;

  // Page Validation
  readonly listHeading: Locator;

  // Form
  readonly addButton: Locator;
  readonly participantTypeNameInput: Locator;
  readonly saveButton: Locator;

  // Feedback
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;

    // Drawer
    this.menuDrawer = page.getByRole('button', { name: /open drawer/i });

    // Sidebar menus (use href – stable)
    this.eventsMenu = page.locator('a[href="/event"]');
    this.participantTypeMenu = page.locator(
      'a[href*="participant"]'
    );

    // Event selection
    this.eventCard = page.getByText('Automation Test Event', { exact: true });

    // Page validation
    this.listHeading = page.getByRole('heading', {
      name: 'List',
      level: 6,
    });

    // Form
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.participantTypeNameInput = page.getByRole('textbox', {
      name: /participant type/i,
    });
    this.saveButton = page.getByRole('button', { name: 'Save' });

    // Toast
    this.successToast = page.getByText(/success/i);
  }

  // ===== COMMON HELPER =====

  private async openDrawerIfNeeded(target: Locator) {
    for (let i = 0; i < 3; i++) {
      if (await target.isVisible()) return;
      await this.menuDrawer.click();
    }
  }

  // ===== ACTION METHODS =====

  // 1️⃣ Open Events & select event
  async selectEvent() {
    await this.openDrawerIfNeeded(this.eventsMenu);
    await this.eventsMenu.click();

    await expect(this.eventCard).toBeVisible();
    await this.eventCard.click();
  }

  // 2️⃣ Navigate to Participant Types
  async navigateToParticipantType() {
    await this.openDrawerIfNeeded(this.participantTypeMenu);
    await this.participantTypeMenu.click();

    await expect(this.listHeading).toBeVisible();
  }

  // 3️⃣ Create Participant Type
  async clickAddParticipantType() {
    await this.addButton.click();
    await expect(this.participantTypeNameInput).toBeVisible();
  }

  async enterParticipantTypeName(name: string) {
    await this.participantTypeNameInput.fill(name);
  }

  async saveParticipantType() {
    await this.saveButton.click();
    await expect(this.successToast).toBeVisible();
  }

  async verifyParticipantTypeCreated(name: string) {
    await expect(this.page.getByText(name)).toBeVisible();
  }

  // 4️⃣ End-to-End reusable method
  async createParticipantType(name: string) {
    await this.selectEvent();
    await this.navigateToParticipantType();
    await this.clickAddParticipantType();
    await this.enterParticipantTypeName(name);
    await this.saveParticipantType();
    await this.verifyParticipantTypeCreated(name);
  }
}
