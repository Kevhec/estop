import { ParticipantDto } from './participant.dto';

export class AddPlayerDto {
  roomId: string;

  participant: ParticipantDto;
}
