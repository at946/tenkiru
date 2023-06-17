import { Card } from '@/interfaces/card';
import { MemberType } from '@/interfaces/memberType';

export default class Member {
  id: string;
  type: MemberType;
  selectedCard: Card;

  constructor(id: string) {
    this.id = id;
    this.type = 'player';
    this.selectedCard = null;
  }
}
