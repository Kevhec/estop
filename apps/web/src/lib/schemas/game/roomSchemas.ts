import { z } from 'zod';
import { participantSchema } from './ParticipantSchemas';

export const roomSchema = z.object({
  id: z.string(),
  participantsCount: z.number(),
  participants: z.array(participantSchema),
});

export const joinRoomsSchema = z.object({
  roomId: z.string(),
});

export type RoomSchemaType = z.infer<typeof roomSchema>;
export type JoinRoomSchemaType = z.infer<typeof joinRoomsSchema>;
