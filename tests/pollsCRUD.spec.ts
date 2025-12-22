import { test } from '@playwright/test';
import { PollsCRUD } from '../pageObjects/PollsCRUD';
import { LoginPage } from '../pageObjects/Login';

test('Create and Toggle Poll Status', async ({ page }) => {
  const login = new LoginPage(page);
  const polls = new PollsCRUD(page);

  await login.open('https://dev-crm.stutzee.com/login');
  await login.login('admin@stutzee.com', '123456789');

  await polls.navigateToPolls();
  await polls.createPoll(
    'AI Trends 2025',
    'Opening Keynote',
    'Multiple Choice',
    'Bar Chart',
    'Knowledge Based'
  );
  await polls.togglePollStatus();

  await polls.addQuestions([
    
  { text: 'What is AI?', options: ['Tech', 'Food', 'Animal', 'None'] },
  { text: 'Which color is best?', options: ['Red', 'Blue', 'Green', 'Yellow'] },
  { text: 'Favorite OS?', options: ['Windows', 'Mac', 'Linux', 'Other'] },
  { text: 'Choose a fruit:', options: ['Apple', 'Banana', 'Mango', 'Grapes'] },
  { text: 'Your rating for the event?', options: ['Excellent', 'Good', 'Average', 'Poor'] },
]);


});
