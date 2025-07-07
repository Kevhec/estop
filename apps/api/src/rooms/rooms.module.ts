import { Module } from '@nestjs/common';
import { RoomsController } from './rooms.controller';
import { RoomsService } from './rooms.service';
import { GatewayGateway } from './rooms.gateway';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, GatewayGateway],
})
export class RoomsModule {}
