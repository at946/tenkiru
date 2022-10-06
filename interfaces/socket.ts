export interface ServerToClientEvents {
  'update-member-estimates': (members: object) => void
}

export interface ClientToServerEvents {
  'join-room': (roomId: string) => void
}