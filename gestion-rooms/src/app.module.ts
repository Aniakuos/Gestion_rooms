import { Module } from '@nestjs/common';
import { RoomModule } from './room/room.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AppGateway } from './room/chat_rooms/chat_room.gateway';
import { RoomService } from './room/room.service';
import { DmGateway } from './room/dm/dm.gateway';
import { ChatRoomService } from './room/chat_rooms/chat_room.service';
import { DmModule } from './room/dm/dm.module';
import { DmService } from './room/dm/dm.service';

@Module({
  imports: [RoomModule, PrismaModule, UserModule, DmModule],
  // controllers: [AppController],
  // providers: [AppService],
  providers: [AppGateway, RoomService, DmGateway, ChatRoomService, DmService],
})
export class AppModule {}