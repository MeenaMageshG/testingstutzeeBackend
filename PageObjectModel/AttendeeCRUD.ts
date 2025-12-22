import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';

export class AttendeeCRUD {
  readonly page: Page;
  readonly waitHelper: WaitHelper;

  readonly participantTab: Locator;
  readonly attendeesTab: Locator;
  readonly addAttendeeButton: Locator
  readonly namebutton: Locator;
  readonly phonebutton: Locator;
  readonly emailbutton: Locator;
  readonly genderbutton: Locator;
  readonly primarygroupbutton: Locator;
  readonly tickettypebutton: Locator;
  readonly savebutton: Locator;
  readonly editbutton: Locator;
  readonly updatebutton: Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page);

      this.participantTab = page.getByRole('heading', { name: 'Participants' });
    this.attendeesTab = page.getByRole('heading', { name: 'Attendees' });
    this.addAttendeeButton = page.getByRole('button', { name: 'Add' });
    this.namebutton = page.getByRole('textbox', { name: 'Name' });
    this.phonebutton = page.getByLabel('Phone Number');
    this.emailbutton = page.getByRole('textbox', { name: 'Email' });
    this.genderbutton = page.getByText('Male', { exact: true });
    this.primarygroupbutton = page.locator(`//span[normalize-space()='DELEGATE']`);
    this.tickettypebutton = page.locator(`//span[normalize-space()='Madurai & Sivaganga Members']`);
    this.savebutton = page.getByRole('button', { name: 'Save' });
    this.editbutton = page.locator('table >> button:has-text("Edit")').last();
    this.updatebutton = page.getByRole('button', { name: 'Update' });
  }
    async addAttendee(name: string, phone: string, email: string) {
      await this.participantTab.click();
      await this.attendeesTab.click();
      await this.addAttendeeButton.click();
      await this.namebutton.fill(name);
      await this.phonebutton.fill(phone);
      await this.emailbutton.fill(email);
      await this.genderbutton.click();
      await this.primarygroupbutton.click();
      await this.tickettypebutton.click();
      await this.savebutton.click();
      
    } 

      async editAttendee(existingName: string, newEmail: string, newPhone: string) {

    // Locate the row containing the attendee name
    const row = this.page.locator(`//tr[.//*[contains(text(),'${existingName}')]]`);

    // Click first ripple (edit button)
    await row.locator(".MuiTouchRipple-root").nth(0).click();

    // Replace email
    await this.emailbutton.click();
    await this.emailbutton.press('Control+A');
    await this.emailbutton.press('Backspace');
    await this.emailbutton.fill(newEmail);

    // Replace phone
    await this.phonebutton.click();
    await this.phonebutton.press('Control+A');
    await this.phonebutton.press('Backspace');
    await this.phonebutton.fill(newPhone);

    // Click update
    await this.updatebutton.click();
  }
}