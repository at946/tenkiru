import { Locator, Page } from '@playwright/test';
import Head from './common/head';
import Header from './common/header';
import Footer from './common/footer';
import urls from '../helpers/urls';

export default class RoomPage {
  readonly page: Page;
  readonly tableCards: Locator;
  readonly blankTableCards: Locator;
  readonly faceDownTableCards: Locator;
  readonly faceUpTableCards: Locator;
  readonly openButton: Locator;
  readonly replayButton: Locator;
  readonly deckSelect: Locator;
  readonly handsCards: Locator;

  readonly head: Head;
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.tableCards = page.getByLabel(/TableCard/);
    this.blankTableCards = page.getByLabel('blankTableCard');
    this.faceDownTableCards = page.getByLabel('faceDownTableCard');
    this.faceUpTableCards = page.getByLabel('faceUpTableCard');
    this.openButton = page.getByRole('button', { name: '開く' });
    this.replayButton = page.getByRole('button', { name: 'もう一度' });
    this.deckSelect = page.getByRole('combobox', { name: 'deckSelect' });
    this.handsCards = page.getByLabel('handsCard');

    this.head = new Head(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async goto(roomId: string) {
    await this.page.goto(urls.room(roomId));
  }

  async selectCard(cardValue: string) {
    await this.handsCards.filter({ hasText: cardValue }).click();
  }

  async openCards() {
    await this.openButton.click();
  }

  async selectDeck(deck: string) {
    await this.deckSelect.selectOption(deck);
  }

  async clickHeaderLogo() {
    await this.header.clickLogo();
  }

  async clickFooterTOSLink() {
    await this.footer.clickTOSLink();
  }

  async clickFooterPPLink() {
    await this.footer.clickPPLink();
  }
}
