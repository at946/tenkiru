import { MemberType } from './memberType';
import { Card } from './card';

export interface Member {
  id: string;
  type: MemberType;
  card: Card;
}
