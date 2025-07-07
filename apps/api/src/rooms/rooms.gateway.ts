import {
  ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoomsService } from './rooms.service';
import { AddPlayerDto } from './dto/add-player.dto';

@WebSocketGateway()
export class GatewayGateway {
  @WebSocketServer()
    server: Server;

  constructor(private roomsService: RoomsService) {}

  @SubscribeMessage('join-room')
  async handleMessage(
    @MessageBody() payload: AddPlayerDto,
      @ConnectedSocket() client: Socket,
  ): Promise<string> {
    try {
      const room = this.roomsService.addPlayer(payload);
      const roomId = room.id;

      // Join player to the room
      await client.join(roomId);

      // Notify everyone the new room state
      this.server.to(roomId).emit('player-joined', room);
    } catch (error) {
      console.log(error);
    }
    return 'Hello world!';
  }
}
