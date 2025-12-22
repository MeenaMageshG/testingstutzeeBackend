import { test, expect } from '@playwright/test';
import { LoginPage } from '../PageObjectModel/Login';
import { AttendeeCRUD } from '../PageObjectModel/AttendeeCRUD';

test.describe('Attendee Module - CRUD', () => {

  test('TC001 - Create Attendee Successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const attendee = new AttendeeCRUD(page);

    // Step 1: Login
    await loginPage.goto();
    await loginPage.login('admin@stutzee.com', '123456789');

    // Wait for event dashboard
    await expect(page.getByRole('heading', { name: 'MADURAI MEMBERS DAY - 2025' })).toBeVisible();

    // Step 2: Create Attendee
    const name = 'Attendeeghdhdgh';
    const phone = '9876556800';
    const email = 'testuserdcjhsdcj@gmail.com';

    await attendee.addAttendee(name, phone, email);

     await expect(page.getByText(name)).toBeVisible();
    
    
     // Step 3: Edit the Created Attendee
await attendee.editAttendee(
  name,
  'updatedmail123@gmail.com',
  '9998887776'
);

// Verification after update
await expect(page.getByText('updatedmail123@gmail.com')).toBeVisible();



  });
});
