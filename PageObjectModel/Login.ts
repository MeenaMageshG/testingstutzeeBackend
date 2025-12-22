import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly dashboardHeader: Locator;
  readonly menuDrawer: Locator;
  readonly organiser: Locator;
  readonly organiserImpersonateButton: Locator;
  readonly Eventsmenu: Locator;
  

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Enter password');
    this.loginButton = page.getByRole('button', { name: 'Login' });

    this.errorMessage = page.locator("//p[contains(@class,'MuiFormHelperText-root')]");
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });

    this.menuDrawer = page.getByRole('button', { name: 'open drawer' });

    // FIXED → Use link locator instead of heading to avoid strict mode violation
    this.organiser = page.getByRole('link', { name: 'Organisers' });
    this.organiserImpersonateButton = page.getByRole('button', { name: 'Impersonate' });
    this.menuDrawer = page.getByRole('button', { name: 'open drawer' });
    this.Eventsmenu = page.getByRole('link', { name: 'Events' });

    
  }

  async goto() {
    await this.page.goto('https://crm.stutzee.xyz/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();

    await this.page.waitForLoadState('networkidle');

    await this.menuDrawer.click();
    await this.organiser.click();
    await this.organiserImpersonateButton.click();
    await this.menuDrawer.click();
    await this.menuDrawer.click();
    await this.Eventsmenu.click();
    
  }
}
