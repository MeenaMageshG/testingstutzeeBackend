import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';
import { LoginPage } from './Login';

export class Tickets {
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
  readonly ticketsDropdown: Locator;
  readonly manageTicketsMenu: Locator
  readonly createTicketButton: Locator;
  readonly categoryDropdown: Locator;
  readonly ticketNameInput: Locator
  readonly DescriptionInput: Locator;
  readonly createcategoryButton: Locator;
 // readonly ticketdropdown: Locator;
 readonly plusiconforCreate: Locator;
  readonly pricetypeInput: Locator;
  readonly Freetype: Locator;
  readonly TicketnameInput: Locator;
  readonly TicketcategoryDropdown: Locator;
  readonly selectcategoryOption: Locator;
  readonly quantityInput: Locator;
  readonly priceInput: Locator;
  readonly saleStartDateInput: Locator;
  readonly saleEndDateInput: Locator
  readonly DescriptionTicketInput: Locator;
  readonly FinalCreateTicketButton: Locator;

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
    this.ticketsDropdown = page.getByRole('heading', { name: 'Tickets', level: 6 });
    this.manageTicketsMenu = page.getByRole('heading', { name: 'Manage Tickets', level: 6 });
    this.createTicketButton = page.getByRole('button', { name: 'Create Ticket' });
    this.categoryDropdown = page.getByText('Ticket Category', { exact: true });
    this.ticketNameInput = page.getByRole('textbox', { name: 'Name' });
    this.DescriptionInput = page.getByRole('textbox', { name: 'Description' });
    this.createcategoryButton = page.getByRole('button', { name: 'Create Category' });
   // this.ticketdropdown = page.getByText('Ticket', { exact: true });
   this.plusiconforCreate = page.getByRole('button', { name: 'Create' });
    this.pricetypeInput = page.getByRole('combobox', { name: 'Price Type' });
    this.Freetype = page.getByRole('option', { name: 'Free' });
    this.TicketnameInput = page.getByRole('textbox', { name: 'Name' });
    this.TicketcategoryDropdown = page.getByRole('combobox', { name: 'Ticket Category' });
    this.selectcategoryOption = page.getByRole('option', { name: 'Test' })
    this.quantityInput = page.getByRole('spinbutton', { name: 'Available' });
    this.priceInput = page.getByRole('spinbutton', { name: 'Price' });
    this.saleStartDateInput = page.getByRole('textbox', { name: 'Sale Start Date' });
    this.saleEndDateInput = page.getByRole('textbox', { name: 'Sale End Date' });
    this.DescriptionTicketInput = page.locator('.ql-editor.ql-blank');
    this.FinalCreateTicketButton = page.getByRole('button', { name: 'Create Ticket' });
  }

  // ---- Login ----
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.waitHelper.waitForPageLoad();
  }     

  async navigateToManageTickets() {
    await this.menuDrawer.click();
    await this.organiser.click();
    await this.organiserImpersonateButton.click();
    await this.waitHelper.waitForPageLoad();
    await this.menuDrawer.click();
    await this.eventsMenu.click();
    await this.page.waitForLoadState('networkidle');
    await this.automationEvent.click();
    await this.waitHelper.waitForPageLoad();
    await this.menuDrawer.click();
    await this.ticketsDropdown.click();
    await this.manageTicketsMenu.click();
    await this.waitHelper.waitForPageLoad();
  }
  
  async createTicketCategory(categoryName: string, description: string) {
    await this.navigateToManageTickets();
    await this.createTicketButton.click();
    await this.categoryDropdown.click();
    await this.ticketNameInput.fill(categoryName);
    await this.DescriptionInput.fill(description);
    await this.createcategoryButton.click();
    await this.waitHelper.waitForPageLoad();
  }

  async createFreeTicket(ticketName: string, category: string, quantity: number, saleStartDate: string, saleEndDate: string, description: string) {


    await this.plusiconforCreate.click();
    //await this.ticketdropdown.click();
    await this.pricetypeInput.click();
    await this.Freetype.click();
    await this.TicketnameInput.fill(ticketName);
    await this.TicketcategoryDropdown.click();
      await this.page.getByRole('option', { name: category }).click();
    await this.quantityInput.fill(quantity.toString());
    await this.saleStartDateInput.fill(saleStartDate);
    await this.saleEndDateInput.fill(saleEndDate);
    await this.DescriptionTicketInput.click();
    await this.page.keyboard.type(description);
    await this.FinalCreateTicketButton.click();
    await this.waitHelper.waitForPageLoad();
  } 

    

}
