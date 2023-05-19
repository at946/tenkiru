import { Locator, Page } from '@playwright/test';
import Head from './common/head';
import Header from './common/header';
import Footer from './common/footer';
import urls from '../helpers/urls';

export default class RoomPage {
  readonly page: Page;
  readonly enteringRoomAnimation: Locator;
  readonly roomIdLink: Locator;
  readonly tableCardGroups: Locator;
  readonly tableCards: Locator;
  readonly blankTableCards: Locator;
  readonly faceDownTableCards: Locator;
  readonly faceUpTableCards: Locator;
  readonly nominateButtons: Locator;
  readonly nominateButtonByCard: (card: string) => Locator;
  readonly minTag: Locator;
  readonly avgTag: Locator;
  readonly maxTag: Locator;
  readonly openButton: Locator;
  readonly replayButton: Locator;
  readonly memberTypeSelect: Locator;
  readonly deckSelect: Locator;
  readonly hands: Locator;
  readonly handsCards: Locator;
  readonly selectedHandsCard: Locator;
  readonly disabledHandsCard: Locator;
  readonly copyUrlToast: Locator;
  readonly haveNominatedToast: Locator;
  readonly haveBeenNominatedToast: Locator;

  readonly head: Head;
  readonly header: Header;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.enteringRoomAnimation = page.getByRole('status', { name: '入室中' });
    this.roomIdLink = page.getByRole('link', { name: '部屋番号' });
    this.tableCardGroups = page.getByRole('group', { name: 'テーブルカードグループ' });
    this.tableCards = this.tableCardGroups.getByLabel('テーブルカード');
    this.blankTableCards = this.tableCardGroups.getByLabel('未選択のテーブルカード');
    this.faceDownTableCards = this.tableCardGroups.getByLabel('伏せられたテーブルカード');
    this.faceUpTableCards = this.tableCardGroups.getByLabel('めくられたテーブルカード');
    this.nominateButtons = page.getByRole('button', { name: '指名' });
    this.nominateButtonByCard = (card: string) => {
      return this.tableCardGroups.filter({ hasText: card }).getByRole('button', { name: '指名' });
    };
    this.minTag = page.getByLabel('最小値');
    this.avgTag = page.getByLabel('平均値');
    this.maxTag = page.getByLabel('最大値');
    this.openButton = page.getByRole('button', { name: '開く' });
    this.replayButton = page.getByRole('button', { name: 'もう一度' });
    this.memberTypeSelect = page.getByRole('combobox', { name: 'メンバータイプの選択' });
    this.deckSelect = page.getByRole('combobox', { name: 'デッキタイプ選択' });
    this.hands = page.getByRole('group', { name: '手札' });
    this.handsCards = this.hands.getByRole('option', { name: '手札カード' });
    this.selectedHandsCard = this.hands.getByRole('option', { name: '手札カード', selected: true });
    this.disabledHandsCard = this.hands.getByRole('option', { name: '手札カード', disabled: true });
    this.copyUrlToast = page.getByRole('status').getByText('この部屋のURLをコピーしました');
    this.haveNominatedToast = page.getByRole('status').getByText('指名しました！');
    this.haveBeenNominatedToast = page.getByRole('status').getByText('指名されました！');

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
    await this.nominateButtonByCard(value).click();
  }

  async selectMemberType(memberType: string) {
    await this.memberTypeSelect.selectOption(memberType);
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
