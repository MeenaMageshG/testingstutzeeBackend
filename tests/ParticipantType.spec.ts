import { test, expect } from '@playwright/test';
import { ParticipantType } from '../PageObjectModel/ParticipantType';
import { OrganiserCRUD } from '../PageObjectModel/EventCRUD';

test.describe('Participant Type Module', () => {
  let participantType: ParticipantType;
  let organiserCRUD: OrganiserCRUD;

  test.beforeEach(async ({ page }) => {
    organiserCRUD = new OrganiserCRUD(page);
    participantType = new ParticipantType(page);

    // 🔹 Login as Admin
    await organiserCRUD.login('admin@stutzee.com', '123456789');

    // 🔹 Impersonate Organiser
    await organiserCRUD.impersonateOrganiser();
  });

  test('Create Participant Type successfully', async ({ page }) => {
    const participantTypeName = `VIP-${Date.now()}`;

    // Act
    await participantType.createParticipantType(participantTypeName);

    // Assert (final verification)
    await expect(page.getByText(participantTypeName)).toBeVisible();
  });
});
