export interface IFUser {
  id: string;
  isPlayer: boolean;
  hasSelectedCard: boolean;
  selectedCardValue?: number | string;
}