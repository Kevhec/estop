export interface Participant {
  id: string
  username: string
  ready: boolean
}

export interface RoomOptions {
  roundTime: number;
  rounds: number;
  maxPlayers: number;
  // categories: string[];
  // language: string;
}

export interface Room {
  id: string
  participantsCount: number
  participants: Participant[]
  gameStarted: boolean
}
