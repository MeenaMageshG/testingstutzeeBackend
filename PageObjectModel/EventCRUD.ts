import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';
import { LoginPage } from './Login';


export class OrganiserCRUD {
  readonly page: Page;
  readonly waitHelper: WaitHelper;
  readonly loginPage: LoginPage;

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly menuDrawer: Locator;
  readonly organiser: Locator;
  readonly organiserImpersonateButton: Locator;
  readonly eventsmenu: Locator;
  readonly addbutton: Locator;
  readonly eventtitle: Locator;
  readonly startdate: Locator;
  readonly enddate: Locator;
  readonly location: Locator;
  readonly categorydropdown: Locator;
  readonly categoryoption: Locator;
    readonly description: Locator;
  readonly clickaddbutton: Locator;
  readonly editbutton: Locator;
  readonly updatebutton: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page);
    this.loginPage = new LoginPage(page);

    // Login elements
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Enter password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });

    // Events Module
    this.menuDrawer = page.getByRole('button', { name: 'open drawer' });
    this.organiser = page.getByRole('link', { name: 'Organisers' });
    this.organiserImpersonateButton = page.getByRole('button', { name: 'Impersonate' });
    this.eventsmenu = page.getByRole('heading', { name: 'Events', level: 6 });
    this.addbutton = page.getByRole('button', { name: 'Add' });
    this.eventtitle = page.getByRole('textbox', { name: 'Event Title*' });
    this.startdate = page.getByRole('textbox', { name: 'DD/MM/YYYY hh:mm aa' }).first();
    this.enddate = page.getByRole('textbox', { name: 'DD/MM/YYYY hh:mm aa' }).nth(1);
    this.location = page.getByRole('textbox', { name: 'Location*' });
    this.categorydropdown = page.getByRole('combobox');
    this.categoryoption = page.getByText('Software', { exact: true });
    this.description = page.locator("//div[@class='quill ']");
    this.clickaddbutton = page.getByRole('button', { name: 'Add' }).last();
    this.editbutton = page.getByRole('button', { name: 'Edit' });
    this.updatebutton = page.getByRole('button', { name: 'Update' });


  }

  // ---- Login ----
  async login(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }

  // ---- Navigate to Events Menu ----
  async navigateToEvents() {
    await this.menuDrawer.click();
    await this.organiser.click();
    await this.organiserImpersonateButton.click();
    await this.menuDrawer.click();
    await this.waitHelper.waitForElement(this.eventsmenu);
    await this.menuDrawer.click();
    await this.eventsmenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  // ---- Add Event ----
  async addEvent(title: string, startDate: string, endDate: string, location: string, category: string, description: string) {
    await this.waitHelper.waitForElement(this.addbutton);
    await this.addbutton.click();

    await this.waitHelper.waitForElement(this.eventtitle);
    await this.eventtitle.fill(title);
    await this.startdate.fill(startDate);
    await this.enddate.fill(endDate);
    await this.location.fill(location);
    await this.categorydropdown.click();
    await this.page.getByText(category, { exact: true }).click();
    await this.description.click();
    await this.page.keyboard.type(description);
    await this.clickaddbutton.click();

  }

  // ---- Edit Event ----
  async editEvent(existingTitle: string, newTitle: string, newStartDate?: string, newEndDate?: string) {
    const editButton = this.page.getByRole('row').filter({ hasText: existingTitle }).getByRole('button', { name: 'Edit' });
    await this.waitHelper.waitForElement(editButton);
    await editButton.click();

    await this.eventtitle.clear();
    await this.eventtitle.fill(newTitle);
    if (newStartDate) {
      await this.startdate.clear();
      await this.startdate.fill(newStartDate);
    }
    if (newEndDate) {
      await this.enddate.clear();
      await this.enddate.fill(newEndDate);
    }
    await this.updatebutton.click();
    
  }

  
  
}
 