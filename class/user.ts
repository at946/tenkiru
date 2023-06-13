import { MemberType } from '@/interfaces/memberType';

export class User {
  constructor(private id: string, private type: MemberType = 'player') {}

  getId(): string {
    return this.id;
  }

  getMemberType(): MemberType {
    return this.type;
  }
}
