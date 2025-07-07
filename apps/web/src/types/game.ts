import type { ParticipantType } from '@/lib/schemas/game/ParticipantSchemas';

export type PendingAction = 'new' | 'join' | null;

export interface JoinRoomData {
  roomId: string
  participant: ParticipantType
}
