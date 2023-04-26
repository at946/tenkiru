import { Locator, Page } from '@playwright/test';
import Head from './common/head';
import Header from './common/header';
import Footer from './common/footer';
import urls from '../helpers/urls';

export default class RoomPage {
  readonly page: Page;
  readonly roomIdLink: Locator;
  readonly tableCardSets: Locator;
  readonly tableCardSetByNth: Locator;
  readonly tableCardSetByCard: Locator;
  readonly nominateButton: Locator;
  readonly tableCards: Locator;
  readonly blankTableCards: Locator;
  readonly faceDownTableCards: Locator;
  readonly faceUpTableCards: Locator;
  readonly minTag: Locator;
  readonly avgTag: Locator;
  readonly maxTag: Locator;
  readonly openButton: Locator;
  readonly replayButton: Locator;
  readonly memberTypeToggle: Locator;
  readonly selectedMemberType: Locator;
  readonly deckSelect: Locator;
  readonly handsCards: Locator;
  readonly selectedHandsCard: Locator;
  readonly disabledHandsCard: Locator;

  readonly head: Head;
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.roomIdLink = page.getByRole('link', { name: '部屋番号' });
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
    this.minTag = page.getByLabel('最小値');
    this.avgTag = page.getByLabel('平均値');
    this.maxTag = page.getByLabel('最大値');
    this.openButton = page.getByRole('button', { name: '開く' });
    this.replayButton = page.getByRole('button', { name: 'もう一度' });
    this.memberTypeToggle = page.getByRole('list', { name: 'memberTypeToggle' });
    this.selectedMemberType = this.memberTypeToggle.locator('li.is-active');
    this.deckSelect = page.getByRole('combobox', { name: 'deckSelect' });
    this.handsCards = page.getByLabel('handsCard');
    this.selectedHandsCard = page.getByLabel(/selected .*handsCard/);
    this.disabledHandsCard = page.getByLabel(/disabled .*handsCard/);

    this.head = new Head(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
  }

  async goto(roomId: string) {
    await this.page.goto(urls.room(roomId));
  }

  async copyRoomUrl() {
    await this.roomIdLink.click();
  }

  async selectCard(value: string) {
    const reg: RegExp = new RegExp(`^${value.replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')}$`);
    await this.handsCards.filter({ hasText: reg }).click();
  }

  async openCards() {
    await this.openButton.click();
  }

  async replay() {
    await this.replayButton.click();
  }

  async nominateByCard(value: string) {
    await this.tableCardSetByCard(value).nominateButton.click();
  }

  async selectMemberType(memberType: string) {
    await this.memberTypeToggle.getByRole('listitem', { name: memberType }).click();
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
