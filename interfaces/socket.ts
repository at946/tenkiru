interface membersCards {
  [props: string]: number
}

export interface ServerToClientEvents {
  'update-members-cards': (membersCards: membersCards) => void
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void
  'put-down-a-card': (roomId: string, number: number | string) => void
}