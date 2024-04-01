import { IFDeckType } from '@/interfaces/deckType';
import { IFUserType } from '@/interfaces/userType';
import { Locator, Page } from '@playwright/test';
import urls from '../helpers/urls';
import Head from './common/head';

export default class RoomPage {
  readonly page: Page;
  readonly logo: Locator;
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
  readonly haveNominatedToast: Locator;
  readonly haveBeenNominatedToast: Locator;

  readonly head: Head;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('link', { name: 'Tenkir' });
    this.roomIdLink = page.getByRole('button', { name: '部屋番号' });
    this.tableCardGroups = page.getByRole('group', { name: 'テーブルカードグループ' });
    this.tableCards = this.tableCardGroups.getByLabel('テーブルカード');
    this.blankTableCards = this.tableCardGroups.getByLabel('未選択のテーブルカード');
    this.faceDownTableCards = this.tableCardGroups.getByLabel('伏せられたテーブルカード');
    this.faceUpTableCards = this.tableCardGroups.getByLabel('めくられたテーブルカード');
    this.nominateButtons = page.getByRole('button', { name: '指名' });
    this.nominateButtonByCard = (card: string) => {
      return this.tableCardGroups.filter({ hasText: card }).getByRole('button', { name: '指名' });
    };
    this.minTag = page.getByLabel('最小');
    this.avgTag = page.getByLabel('平均');
    this.maxTag = page.getByLabel('最大');
    this.openButton = page.getByRole('button', { name: '開く' });
    this.requestToSelectButton = page.getByRole('button', { name: '早く選んで' });
    this.replayButton = page.getByRole('button', { name: 'もう一度' });
    this.userTypeSelect = page.getByRole('combobox', { name: 'ユーザータイプ：' });
    this.deckSelect = page.getByRole('combobox', { name: 'デッキタイプ：' });
    this.hands = page.getByRole('group', { name: '手札' });
    this.handsCards = this.hands.getByRole('option', { name: '手札カード' });
    this.selectedHandsCard = this.hands.getByRole('option', { name: '手札カード', selected: true });
    this.disabledHandsCard = this.hands.getByRole('option', { name: '手札カード', disabled: true });
    this.enteringRoomToast = page.getByRole('status').getByText('入室中...');
    this.haveEnteredRoomToast = page.getByRole('status').getByText('入室完了！');
    this.copyUrlToast = page.getByRole('status').getByText('この部屋のURLをコピーしました');
    this.haveRequestedToSelectToast = page
      .getByRole('status')
      .getByText('カード未選択のプレイヤーに\n呼びかけました');
    this.hadBeenRequestedToSelectToast = page
      .getByRole('status')
      .getByText('そろそろカードを選んでください');
    this.haveNominatedToast = page.getByRole('status').getByText('指名しました！');
    this.haveBeenNominatedToast = page.getByRole('status').getByText('指名されました！');

    this.head = new Head(page);
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

  async requestToSelect() {
    await this.requestToSelectButton.click();
  }

  async replay() {
    await this.replayButton.click();
  }

  async nominateByCard(value: string) {
    await this.nominateButtonByCard(value).click();
  }

  async selectUserType(userType: IFUserType) {
    await this.userTypeSelect.selectOption(userType);
  }

  async selectDeck(deck: IFDeckType) {
    await this.deckSelect.selectOption(deck);
  }

  async clickHeaderLogo() {
    await this.logo.click();
  }
}
