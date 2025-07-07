import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { MAX_COMBINATIONS } from 'src/utils/room-code-utils';
import { Participant, Room } from './interfaces/rooms.interfaces';
import { CreateRoomDto } from './dto/create.dto';
import { AddPlayerDto } from './dto/add-player.dto';
import { VerifyRoomDto } from './dto/verify.dto';

@Injectable()
export class RoomsService {
  // Define room map
  private rooms = new Map<string, Room>();

  private playerRooms = new Map<string, string>();

  private roomCodeCounter = 0;

  create(createRoomDto: CreateRoomDto): string {
    const { creator } = createRoomDto;

    // Setup room settings
    // Turn counter into base 36 and ensure 4 characters
    const id = this.roomCodeCounter.toString(36).padStart(4, '0');
    const participants: Participant[] = [creator];
    const participantsCount = 1;

    this.roomCodeCounter += 1;

    // Reset code counter if limit is reached
    if (this.roomCodeCounter > MAX_COMBINATIONS) {
      this.roomCodeCounter = 0;
    }

    // Create room object and add it to rooms map
    const room: Room = {
      id, participantsCount, participants, gameStarted: false,
    };
    this.rooms.set(id, room);

    // Return room id for creating participant to join
    return id;
  }

  addPlayer(addPlayerDto: AddPlayerDto): Room {
    const playerRoom = this.playerRooms.get(addPlayerDto.participant.id);

    if (playerRoom) {
      throw new ConflictException('Player is already in a room');
    }

    const room = this.rooms.get(addPlayerDto.roomId);

    if (!room) {
      throw new NotFoundException('Room does not exist');
    }

    // Update room state
    room.participants.push(addPlayerDto.participant);
    room.participantsCount += 1;

    // Keep track of current player's room
    this.playerRooms.set(addPlayerDto.participant.id, addPlayerDto.roomId);

    this.rooms.set(room.id, room);

    return room;
  }

  getRoom({ roomId }: VerifyRoomDto) {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new NotFoundException('Room does not exist');
    }

    return room;
  }
}
