import { Card } from './card'

export interface Member {
  id: string,
  type: MemberType,
  card: Card,
}

export type MemberType = 'player' | 'audience'