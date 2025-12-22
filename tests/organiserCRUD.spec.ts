// tests/organiserCRUD.spec.ts
import { test } from '@playwright/test';
import { OrganiserPage } from '../PageObjectModel/OrganiserCRUD';
import { login } from '../utils/login';

let organiserPage: OrganiserPage;

test.describe('Organiser Module', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await login(page, 'admin@stutzee.com', '123456789'); // replace with real creds
    organiserPage = new OrganiserPage(page);
    await organiserPage.navigateToOrganisers();
  });

  test('Create and then Edit an organiser', async ({ page }) => {
    await organiserPage.createOrganiser(
      'Test Organiser',
      'test007@example.com',
      '9876043210',
      'Password123',
      'Test Org'
    );

    await organiserPage.editOrganiser(
      'Test Organiser',
      'Updated Organiser',
      'updated@example.com',
      '9123456780'
    );
  });
});
