import { expect, type Locator, type Page } from '@playwright/test';
import type { IFDeckType } from '@/interfaces/deckType';
import type { IFUserType } from '@/interfaces/userType';
import urls from '../helpers/urls';

export default class RoomPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly roomIdLink: Locator;
  readonly ToastToNotifyToHaveCopiedThisRoomURL: Locator;
  readonly tableCardGroups: Locator;
  readonly tableCards: Locator;
  readonly blankTableCards: Locator;
  readonly faceDownTableCards: Locator;
  readonly faceUpTableCards: Locator;
  readonly getCommentsButtons: Locator;
  readonly getCommentsButton: (cardValue: string) => Locator;
  readonly minTag: Locator;
  readonly avgTag: Locator;
  readonly maxTag: Locator;
  readonly openButton: Locator;
  readonly requestToSelectButton: Locator;
  readonly replayButton: Locator;
  readonly userTypeSelect: Locator;
  readonly deckSelect: Locator;
  readonly hands: Locator;
  readonly handsCards: Locator;
  readonly selectedHandsCard: Locator;
  readonly disabledHandsCard: Locator;
  readonly enteringRoomToast: Locator;
  readonly haveEnteredRoomToast: Locator;
  readonly copyUrlToast: Locator;
  readonly haveRequestedToSelectToast: Locator;
  readonly hadBeenRequestedToSelectToast: Locator;
  readonly haveRequestedCommentsToast: Locator;
  readonly haveBeenRequestedCommentsToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'Tenkiru' });
    this.roomIdLink = page.getByRole('button', { name: 'Room ID' });
    this.ToastToNotifyToHaveCopiedThisRoomURL = page.getByRole('status').getByText('Copied this Room URL');

    this.tableCardGroups = page.getByRole('group', {
      name: 'Table cards group',
    });
    this.tableCards = this.tableCardGroups.getByLabel('Table card');
    this.blankTableCards = this.tableCardGroups.getByLabel('Unselected table card');
    this.faceDownTableCards = this.tableCardGroups.getByLabel('Face-down table card');
    this.faceUpTableCards = this.tableCardGroups.getByLabel('Face-up table card');
    this.getCommentsButtons = page.getByRole('button', { name: 'Get comments' });
    this.getCommentsButton = (card: string) => {
      return this.tableCardGroups.filter({ hasText: card }).getByRole('button', { name: 'Get comments' });
    };
    this.minTag = page.getByTitle('Min');
    this.avgTag = page.getByTitle('Avg');
    this.maxTag = page.getByTitle('Max');
    this.openButton = page.getByRole('button', { name: 'Open', exact: true });
    this.requestToSelectButton = page.getByRole('button', {
      name: 'Ask to choose',
    });
    this.replayButton = page.getByRole('button', { name: 'Again' });
    this.userTypeSelect = page.getByRole('combobox', { name: 'User type: ' });
    this.deckSelect = page.getByRole('combobox', { name: 'Deck : ' });
    this.hands = page.getByRole('radiogroup', { name: 'Hands' });
    this.handsCards = this.hands.getByRole('radio', { name: 'Hands card' });
    this.selectedHandsCard = this.hands.getByRole('radio', {
      checked: true,
    });
    this.disabledHandsCard = this.hands.getByRole('radio', {
      name: 'Hands card',
      disabled: true,
    });
    this.enteringRoomToast = page.getByRole('status').getByText('Entering...');
    this.haveEnteredRoomToast = page.getByRole('status').getByText('Entry Completed');
    this.copyUrlToast = page.getByRole('status').getByText('Copied this Room URL');
    this.haveRequestedToSelectToast = page.getByRole('status').getByText('Asked players to choose a card');
    this.hadBeenRequestedToSelectToast = page.getByRole('status').getByText("It's time to choose a card");
    this.haveRequestedCommentsToast = page.getByRole('status').getByText('Asked a player for comment');
    this.haveBeenRequestedCommentsToast = page.getByRole('status').getByText('Please comment');

    const consoleErrorMessages: string[] = [];
    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrorMessages.push(message.text());
      }
    });
    page.on('close', async () => {
      await expect(consoleErrorMessages[0]).toBeUndefined();
    });
  }

  async goto(roomId: string) {
    await this.page.goto(urls.room(roomId));
  }

  async copyRoomUrl() {
    await this.roomIdLink.click();
  }

  async selectCard(value: string) {
    await this.hands.getByText(value, { exact: true }).click();
  }

  async openCards() {
    await this.openButton.click();
  }

  async requestToSelect() {
    await this.requestToSelectButton.click();
  }

  async replay() {
    await this.replayButton.click();
  }

  async getComments(cardValue: string) {
    await this.getCommentsButton(cardValue).click();
  }

  async selectUserType(userType: IFUserType) {
    await this.page.getByLabel(userType).click();
  }

  async getUserType(userType: IFUserType) {
    return await this.page.getByLabel(userType);
  }

  async selectDeck(deck: IFDeckType) {
    await this.deckSelect.selectOption(deck);
  }

  async clickHeaderLogo() {
    await this.logo.click();
  }
}
