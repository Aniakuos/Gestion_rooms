import { Body, Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { dm_msg } from 'src/room/dto/create-room.dto';
import { DmService } from './dm.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class DmGateway {
  constructor(private prisma: PrismaService, private dm_service: DmService){}

  @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway_DM');

  @SubscribeMessage('message')
  handleMessage() {
    console.log("hello world1!!!!");
    //return 'Hello world!';
  }

  @SubscribeMessage('check_room')
    async check_room_name(client: Socket,message: dm_msg){

      const join_name = await this.dm_service.check_create_room_dm(message);
      //console.log(join_name);
      client.join(join_name);
      //this.server.to(get_name.name).emit("hello");
      
      
    }

    @SubscribeMessage('dm_message')
    async send_msg(client: Socket, @Body()message: dm_msg){
      let get_name;
      get_name = await this.prisma.room.findFirst({
        where:{
          OR: [
            {
              name: message.from + message.to,
            },
            {
              name: message.to + message.from,
            },
          ]
        },
        select:{
          name: true,
        }
      })
      this.server.to(get_name.name).emit('msgToClient_dm', message);
      const newmsg = await this.prisma.directMessage.create({
        data:
          {creationDate: new Date(), from: message.from, to: message.to, content_msg: message.msg},
        });
    }

    handleDisconnect(client: Socket) {
    	this.logger.log(`Client disconnected: ${client.id}`);
    }
  
    handleConnection(client: Socket) {
    	this.logger.log(`Client connected: ${client.id}`);
    }
}
