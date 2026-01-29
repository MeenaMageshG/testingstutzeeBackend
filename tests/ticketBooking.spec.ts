import { test, expect } from '@playwright/test';
import { Tickets } from '../PageObjectModel/TicketBooking';
import { LoginPage } from '../PageObjectModel/Login';

test.describe('Tickets Module - Free Ticket Creation', () => {
  let tickets: Tickets;
  
  test.beforeEach(async ({ page }) => {
    tickets = new Tickets(page);
  });

  test('TC001 - Create Free Ticket Successfully', async ({ page }) => {

    const tickets = new Tickets(page);

    // -------- Step 1: Launch & Login --------
    await page.goto('https://crm.stutzee.xyz');
    await tickets.login('admin@stutzee.com', '123456789');

    // -------- Step 2: Create Ticket Category (optional) --------
    const categoryName = 'Test';
    const categoryDescription = 'Automation Ticket Category';

    await tickets.createTicketCategory(
      categoryName,
      categoryDescription
    );

    // -------- Step 3: Create Free Ticket --------
    const ticketName = 'Free Automation Ticket';
    const quantity = 100;
    const saleStartDate = '01/01/2026 08.00 AM';
    const saleEndDate = '20/01/2026 05.00 PM';
    const description = 'This is a free ticket created via automation';

    await tickets.createFreeTicket(
      ticketName,
      categoryName,
      quantity,
      saleStartDate,
      saleEndDate,
      description
    );

  });
}); 