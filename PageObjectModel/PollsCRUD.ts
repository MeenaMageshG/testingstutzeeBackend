import { Page, Locator, expect } from '@playwright/test';
import { WaitHelper } from '../utils/waitHelper';

export class PollsCRUD {
  readonly page: Page;
  readonly waitHelper: WaitHelper;

  readonly organisersMenu: Locator;
  readonly impersonateButton: Locator;
  readonly eventsMenu: Locator;
  readonly evolveEvent: Locator;
  readonly sessionEngagementMenu: Locator;
  readonly pollsMenu: Locator;
  readonly createPollButton: Locator;
  readonly titleInput: Locator;
  readonly selectSessionDropdown: Locator;
  readonly sessionOption: Locator;
  readonly questionTypeDropdown: Locator;
  readonly selectedQuestionTypeOption: Locator;
  readonly visualizationTypeDropdown: Locator;
  readonly selectedVisualizationOption: Locator;
  readonly menudrawer: Locator;
  readonly pollTypeDropdown: Locator;
  readonly selectedPollTypeOption: Locator;
  readonly createButton: Locator;
  readonly statusToggle: Locator;
  readonly editPollButton: Locator;
  readonly addquestion1: Locator;
  readonly option1: Locator;
  readonly option2: Locator;
  readonly addoptionbutton: Locator;
  readonly option3: Locator;
  readonly option4: Locator;
  readonly newquestionButton: Locator;
  readonly question2: Locator;
  readonly question3: Locator;
    readonly question4: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.waitHelper = new WaitHelper(page);

    this.organisersMenu = page.locator("(//div[@class='MuiListItemIcon-root css-1m6nznw'])[1]");
    this.impersonateButton = page.locator("(//button[@aria-label='Impersonate'])[1]");
    this.eventsMenu = page.locator("//a[@href='/event']");
    this.evolveEvent = page.locator("//p[text()='Evolve 2025']");
    this.sessionEngagementMenu = page.locator("//div[@id='session-engagement-button']");
    this.menudrawer = page.locator("//button[@aria-label='open drawer']");
    this.pollsMenu = page.locator("//h6[text()='Polls']");
    this.createPollButton = page.locator('button:has-text("Create Poll")');
    this.titleInput = page.locator("(//input[@id='title'])[1]");
    this.selectSessionDropdown = page.locator("(//input[@id='event_session_id'])[1]");
    this.sessionOption = page.locator("(//li[@id='event_session_id-option-1'])[1]");
    this.questionTypeDropdown = page.locator("(//div[@id='question_type'])[1]");
    this.selectedQuestionTypeOption = page.locator("(//li[@role='option'])[1]");
    this.visualizationTypeDropdown = page.locator("(//div[@id='visualization'])[1]");
    this.selectedVisualizationOption = page.locator("(//li[@role='option'])[1]");
    this.pollTypeDropdown = page.locator("(//div[@id='poll_type'])[1]");
    this.selectedPollTypeOption = page.locator("(//li[normalize-space()='Knowledge Based'])[1]");
    this.createButton = page.locator("(//button[text()='Create Poll'])[2]");
    this.statusToggle = page.locator("(//input[@type='checkbox'])[1]");
    this.editPollButton = page.locator("(//div[@class='MuiBox-root css-4g6ai3'])[1]");
    this.addquestion1 = page.locator("//textarea[@placeholder='Enter your question']");
    this.option1 = page.locator("//input[@placeholder='Option 1']");
    this.option2 = page.locator("//input[@placeholder='Option 2']");
    this.addoptionbutton = page.locator("(//button[normalize-space()='Add Option'])[1]");
    this.option3 = page.locator("//input[@placeholder='Option 3']");
    this.option4 = page.locator("//input[@placeholder='Option 4']");
    this.newquestionButton = page.locator("(//button[normalize-space()='New Question'])[1]");
    this.question2 = page.locator("(//div[@class='MuiCardContent-root css-1ff53cy'])[2]").nth(1);
    this.question3 = page.locator("(//div[@class='MuiCardContent-root css-1ff53cy'])[3]").nth(2);
      this.question4 = page.locator("(//div[@class='MuiCardContent-root css-1ff53cy'])[4]").nth(3);

    this.saveButton = page.locator("(//button[normalize-space()='Save'])[1]");

          }
        
      
 async navigateToPolls() {
    await expect(this.organisersMenu).toBeVisible();
    await this.organisersMenu.click();

    await expect(this.impersonateButton).toBeVisible();
    await this.impersonateButton.click();

    await expect(this.eventsMenu).toBeVisible();
    await this.eventsMenu.click();

    await expect(this.evolveEvent).toBeVisible();
    await this.evolveEvent.click();

    await expect(this.sessionEngagementMenu).toBeVisible();
    await this.sessionEngagementMenu.click();
    await this.menudrawer.click();

    await expect(this.pollsMenu).toBeVisible();
    await this.pollsMenu.click();
  }

  async createPoll(title: string, session: string, questionType: string, visualizationType: string, pollType: string) {
    await expect(this.createPollButton).toBeVisible();
    await this.createPollButton.click();

    await this.titleInput.fill(title);

    await this.selectSessionDropdown.click();
   //await this.page.locator(`div[role="option"]:has-text("${session}")`).click();
   await this.sessionOption.click();

    await this.questionTypeDropdown.click();
    //await this.page.locator(`div[role="option"]:has-text("${questionType}")`).click();
    await this.selectedQuestionTypeOption.click();

    await this.visualizationTypeDropdown.click();
   // await this.page.locator(`div[role="option"]:has-text("${visualizationType}")`).click();
   await this.selectedVisualizationOption.click();

    await this.pollTypeDropdown.click();
   // await this.page.locator(`div[role="option"]:has-text("${pollType}")`).click();
   await this.selectedPollTypeOption.click();

    await this.createButton.click();
  }

  async togglePollStatus() {
    await expect(this.statusToggle).toBeVisible();
    await this.statusToggle.click();
    await this.editPollButton.click();
  }

  async addQuestions(questions: { text: string; options: string[] }[]) {
  for (const [index, q] of questions.entries()) {
    let questionCard;

    // Select or create question card
    if (index === 0) {
      questionCard = this.page.locator(`//textarea[@placeholder='Enter your question']/ancestor::div[contains(@class,'MuiCardContent-root')]`);
      await expect(questionCard).toBeVisible({ timeout: 15000 });
    } else {
      await expect(this.newquestionButton).toBeVisible({ timeout: 5000 });
      await this.newquestionButton.click();
      questionCard = this.page.locator(`(//div[contains(@class,'MuiCardContent-root')])[last()]`);
      await questionCard.waitFor({ state: 'visible', timeout: 15000 });
    }

    // Expand card if needed
    await questionCard.click();

    // Fill question
    const questionInput = questionCard.locator('textarea[placeholder="Enter your question"]');
    await expect(questionInput).toBeVisible({ timeout: 15000 });
    await questionInput.fill(q.text);

    // Fill options dynamically
    for (let i = 0; i < q.options.length; i++) {
      const optionInput = questionCard.locator(`input[placeholder="Option ${i + 1}"]`);

      // If input does not exist yet, click Add Option button
      if (!(await optionInput.isVisible())) {
        const addOptionButton = questionCard.locator('button:has-text("Add Option")');

        await expect(addOptionButton).toBeVisible({ timeout: 5000 });
        await addOptionButton.waitFor({ state: 'visible', timeout: 10000 });
        await addOptionButton.click();

        // Wait for the new option input to appear
        await expect(optionInput).toBeVisible({ timeout: 5000 });
      }

      await optionInput.fill(q.options[i]);
    }
  }
}


    
}