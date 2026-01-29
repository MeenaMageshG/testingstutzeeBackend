import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';
import { LoginPage } from './Login';

export class AttendeeCRUD {
  readonly page: Page;
  readonly waitHelper: WaitHelper;
  readonly loginPage: LoginPage;
   readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
  readonly menuDrawer: Locator;
  readonly organiser: Locator;
  readonly organiserImpersonateButton: Locator;
  readonly eventsMenu: Locator;
  readonly automationEvent: Locator;
  readonly participantsTab: Locator;
  readonly attendeesTab: Locator;
  readonly addAttendeeButton: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly genderButton: Locator;
  readonly primaryGroupButton: Locator;
  readonly ticketTypeButton: Locator;
  readonly saveButton: Locator;
  readonly updateButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page);
    this.loginPage = new LoginPage(page);

    // Login elements
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.menuDrawer = page.getByRole('button', { name: 'open drawer' });
     this.organiser = page.getByRole('link', { name: 'Organisers' });
    this.organiserImpersonateButton = page.getByRole('button', { name: 'Impersonate' });
    this.eventsMenu = page.locator('a[href="/event"]');
    this.automationEvent = page.getByText('Automation Test Event', { exact: true });
    this.participantsTab = page.getByRole('heading', { name: 'Participants' });
    this.attendeesTab = page.getByRole('heading', { name: 'Attendees' });
    this.addAttendeeButton = page.getByRole('button', { name: 'Add' });
    this.nameInput = page.getByRole('textbox', { name: 'Name' });
    this.phoneInput = page.getByLabel('Phone Number');
    this.emailInput = page.getByRole('textbox', { name: 'Email' });
    this.genderButton = page.getByText('Male', { exact: true });
    this.primaryGroupButton = page.locator("//span[normalize-space()='DELEGATE']");
    this.ticketTypeButton = page.locator("//span[normalize-space()='Madurai & Sivaganga Members']");
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.updateButton = page.getByRole('button', { name: 'Update' });
  }

  async navigateToAttendees() {
    await this.menuDrawer.click();
    await this.eventsMenu.click();
    await this.page.waitForLoadState('networkidle');
    await this.automationEvent.click();
    await this.waitHelper.waitForPageLoad();
    await this.menuDrawer.click();
    await this.participantsTab.click();
    await this.waitHelper.waitForPageLoad();
    await this.attendeesTab.click();
  }

  async addAttendee(name: string, phone: string, email: string) {
    await this.navigateToAttendees();
    await this.addAttendeeButton.click();
    await this.nameInput.fill(name);
    await this.phoneInput.fill(phone);
    await this.emailInput.fill(email);
    await this.genderButton.click();
    await this.primaryGroupButton.click();
    await this.ticketTypeButton.click();
    await this.saveButton.click();
  }

  async editAttendee(existingName: string, newEmail: string, newPhone: string) {
    const row = this.page.locator(`//tr[.//*[contains(text(),'${existingName}')]]`);
    await row.locator(".MuiTouchRipple-root").nth(0).click();

    await this.emailInput.fill(newEmail);
    await this.phoneInput.fill(newPhone);
    await this.updateButton.click();
  }
}
