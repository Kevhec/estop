import { RoomOptionsDto } from './options.dto';
import { ParticipantDto } from './participant.dto';

export class CreateRoomDto {
  creator: ParticipantDto;

  options: RoomOptionsDto;
}
