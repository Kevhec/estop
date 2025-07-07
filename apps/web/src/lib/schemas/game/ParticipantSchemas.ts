import { z } from 'zod';

export const participantSchema = z.object({
  id: z.string().uuid().optional(),
  username: z.string(),
  ready: z.boolean().optional(),
});

export type ParticipantType = z.infer<typeof participantSchema>;
