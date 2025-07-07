import {
  Body, Controller, Get, Param, Post,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create.dto';
import { VerifyRoomDto } from './dto/verify.dto';
import { JoinRoomBodyDto, JoinRoomParamDto } from './dto/join-body.dto';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
  ) {}

  @Post()
  createRoom(@Body() body: CreateRoomDto) {
    return this.roomsService.create(body);
  }

  @Get(':roomId')
  getRoom(@Param('roomId') param: VerifyRoomDto) {
    const room = this.roomsService.getRoom(param);

    return room;
  }

  @Post(':roomId')
  joinRoom(
  @Param('roomId') param: JoinRoomParamDto,
    @Body() body: JoinRoomBodyDto,
  ) {

  }
}
