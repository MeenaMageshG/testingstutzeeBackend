import { test, expect } from '@playwright/test';
import { AttendeeCRUD } from '../PageObjectModel/AttendeeCRUD';
import { LoginPage } from '../PageObjectModel/Login';

test.describe('Attendee Module - CRUD', () => {
  let attendee: AttendeeCRUD;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    attendee = new AttendeeCRUD(page);

    await loginPage.goto();
    await loginPage.login('admin@stutzee.com', '123456789');
  });

  test('TC001 - Create and Edit Attendee Successfully', async ({ page }) => {
    const name = 'AttendeeTest';
    const phone = '9876556800';
    const email = 'testuser@gmail.com';

    await attendee.addAttendee(name, phone, email);
    await expect(page.getByText(name)).toBeVisible();

    await attendee.editAttendee(
      name,
      'updateduser@gmail.com',
      '9998887776'
    );

    await expect(page.getByText('updateduser@gmail.com')).toBeVisible();
  });
});
