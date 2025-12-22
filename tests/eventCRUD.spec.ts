import { test, expect } from '@playwright/test';
import { OrganiserCRUD } from '../PageObjectModel/EventCRUD';

test.describe('Organiser Events Flow', () => {
  let organiserCRUD: OrganiserCRUD; 

  test.beforeEach(async ({ page }) => {
    organiserCRUD = new OrganiserCRUD(page);

    // Login
    await organiserCRUD.login('admin@stutzee.com', '123456789'); // 🔹 Replace credentials
  });

  test('Add a new Event', async ({ page }) => {
    const eventTitle = 'Automation Test Event';
    const startDate = '03/11/2025 10:00 AM';
    const endDate = '03/11/2025 12:00 PM';
    const location = 'Madurai';
    const category = 'Software';
    const description = 'This is a test event created by automation.';

    await organiserCRUD.addEvent(eventTitle, startDate, endDate, location, category, description);

    // Verify event is added
    await expect(page.getByText(eventTitle)).toBeVisible();
  });

  test('Edit an existing Event', async ({ page }) => {
    const oldTitle = 'Automation Test Event';
    const newTitle = 'Updated Automation Event';
    const newStartDate = '04/11/2025 11:00 AM';
    const newEndDate = '04/11/2025 01:00 PM';

    await organiserCRUD.editEvent(oldTitle, newTitle);

    
  });
});