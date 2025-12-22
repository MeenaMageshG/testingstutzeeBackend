import { Page, Locator } from '@playwright/test';

export class WaitHelper {
  constructor(public page: Page) {}

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  async waitForElement(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 25000 });
  }
}