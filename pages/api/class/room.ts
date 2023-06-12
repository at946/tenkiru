import { DeckType } from "@/interfaces/deckType";
import { Member } from "@/interfaces/member";

export default class Room {
  id: string;
  deckType: DeckType;
  areCardsOpen: boolean;
  members: Member[];

  constructor(id: string) {
    this.id = id;
    this.deckType = 'fibonacci';
    this.areCardsOpen = false;
    this.members = [];
  }

  addMember(member: Member) {
    this.members.push(member);
  }
}
