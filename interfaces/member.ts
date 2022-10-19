import { MemberType } from './memberType';
import { Card } from './card';

export type Member = {
  id: string;
  type: MemberType;
  selectedCard: Card;
}