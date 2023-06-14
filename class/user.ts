import { IFMemberType, MemberType } from '@/interfaces/memberType';

export class User {
  constructor(private id: string, private memberType: MemberType = 'player') {}

  getId(): string {
    return this.id;
  }

  getMemberType(): MemberType {
    return this.memberType;
  }

  setMemberType(newMemberType: IFMemberType): void {
    this.memberType = newMemberType;
  }
}
