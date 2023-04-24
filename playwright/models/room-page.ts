import { Locator, Page } from '@playwright/test';
import Head from './common/head';
import Header from './common/header';
import Footer from './common/footer';
import urls from '../helpers/urls';

export default class RoomPage {
  readonly page: Page;
  readonly tableCardSets: Locator;
  readonly tableCardSetByNth: Locator;
  readonly tableCardSetByCard: Locator;
  readonly nominateButton: Locator;
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
    this.tableCardSets = page.getByLabel(/tableCardSet/);
    this.tableCardSetByNth = (nth: number) => {
      return {
        nominateButton: this.tableCardSets.nth(nth).getByRole('button', { name: '指名' }),
      };
    };
    this.tableCardSetByCard = (value: string) => {
      return {
        nominateButton: page
          .getByLabel(`tableCardSet-${value}`)
          .getByRole('button', { name: '指名' }),
      };
    };
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

  async selectCard(value: string) {
    const reg: RegExp = new RegExp(`^${value}$`);
    await this.handsCards.filter({ hasText: reg }).click();
  }

  async openCards() {
    await this.openButton.click();
  }

  async nominateByCard(value: string) {
    await this.tableCardSetByCard(value).nominateButton.click();
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
