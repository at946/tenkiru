interface membersCards {
  [props: string]: number
}

export interface ServerToClientEvents {
  'update-members-cards': (membersCards: membersCards) => void
  'update-cards-state': (cardsAreOpen: boolean) => void
  'replay': (membersCards: membersCards) => void
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void
  'put-down-a-card': (roomId: string, number: number | string) => void
  'open-cards-on-table': (roomId: string) => void
  'clean-cards-on-table': (roomId: string) => void
}