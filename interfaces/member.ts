import { MemberType } from './userType';
import { Card } from './card';

export type Member = {
  id: string;
  type: MemberType;
  selectedCard: Card;
};
