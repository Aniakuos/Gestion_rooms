import { 
		OnGatewayConnection, 
		OnGatewayDisconnect, 
		OnGatewayInit, 
		SubscribeMessage, 
		WebSocketGateway, 
		WebSocketServer 
	} from "@nestjs/websockets";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PrismaService } from 'src/prisma/prisma.service';
import { dto_admin, dto_block, dto_changePass, dto_global, dto_leave, dto_user_room } from "../dto/create-room.dto";
import { ChatRoomService } from './chat_room.service';
import { emit } from "process";

@WebSocketGateway({
    // namespace: 'chat',
    cors: {
        origin: '*',
    }
})

export class AppGateway {
    
    constructor(private prisma: PrismaService, private chatroomservice: ChatRoomService){}
    myMap = new Map([]);
	banned: string[] = [];

    @WebSocketServer()
    server: Server;
    private logger: Logger = new Logger('AppGateway');

    afterInit(server: Server) {
      this.logger.log('Init');
    }

    @SubscribeMessage('JoinRoom')
    async Join_room(client: Socket, infos: dto_global)
	{	
		console.log(infos);
		client.join(infos.room_id);
		// const test = await this.server.in("room1").allSockets();
		// console.log(test);
		this.myMap.set(client.id, infos.user_id);
		const newObj = await this.chatroomservice.add_user_to_room(infos);
        
        this.server.to(infos.room_id).emit("Joinned", {"user_role": newObj.user_role, "user_id":  newObj.user_id}); //!!!!!!!add user Abdellah
        }

    @SubscribeMessage('SendMessageRoom')
    async Send_message(client: Socket, infos: dto_user_room){
	// client.data.username = "Soukaina";
		console.log(this.banned.length);
		let check = false;
		for (let i = 0; i < this.banned.length; i++){
			if (infos.name == this.banned[i])
			{
				console.log(i ,this.banned[i]);
				check = true;
				break;
			}
		}
		if (check == false)
		{
			this.chatroomservice.add_msg_room(infos);
			this.server.to(infos.room_name).except(infos.room_name + 'Banned').emit('msgToClient', {"from" : infos.name , "content_msg" : infos.room_name });
			console.log(this.banned);
		}
    }

	@SubscribeMessage('banned')
    async ban_user(client: Socket, infos: dto_global){
        let check = false;
        this.chatroomservice.ban_user_in_room(infos);
        for (let [key, value] of this.myMap) {
            if (value == infos.user_id)
            {
                var soketId;
                soketId = key;
                this.server.sockets.sockets.get(soketId).join(infos.room_id + 'Banned');
                this.server.sockets.sockets.get(soketId).leave(infos.room_id);
            }
        }
        for (let i = 0; i < this.banned.length; i++){
            if (infos.user_id == this.banned[i])
            {
                console.log(i ,this.banned[i]);
                check = true;
                break;
            }
        }
        if (check == false)
        {
            let num = this.banned.push(infos.user_id);
            console.log(num);
        }
        this.server.to(infos.room_id).emit("Ban", {"user_id": infos.user_id});
    }
  

    @SubscribeMessage('setAdmin')
    async setAdmin(client :Socket , infos : dto_admin)
    {
        const ret = await this.chatroomservice.setAdmin(infos);
        return this.server.to(infos.room_id).emit("setAdmin" , {"user_id": infos.user_id});
    }

    @SubscribeMessage('leaveRoom')
    async leaveRoom(client: Socket,infos : dto_leave){
        const ret = await this.chatroomservice.leaveRoom(infos);
        return this.server.to(infos.room_id).emit("leaveRoom" , {"user_id" : infos.user_id})
   
    }

    @SubscribeMessage('changePassword')
    async changePassword(client: Socket, infos : dto_changePass)
    {
      const ret = await this.chatroomservice.changePassword(infos);
      return this.server.to(infos.room_id).emit("changePassword" , ret)
    }

    @SubscribeMessage('removePassword')
    async changeVisibility(client: Socket, infos : dto_global)
    {
        const ret = await this.chatroomservice.removePassword(infos);
        return this.server.to(infos.room_id).emit("removePassword" , ret)
    }
    
    @SubscribeMessage('block')
    async blockUser(client: Socket, infos : dto_block)
    {
        const ret = await this.chatroomservice.block_user(infos);
        return this.server.to(infos.room_id).emit("blocked" , {"user_id_blocked" : infos.user_to_block})
    }

    async handleDisconnect(client: Socket) {
    	this.logger.log(`Client disconnected: ${client.id}`);
		// const test = await this.server.in("room1").allSockets();
		// console.log(test);
    }
  
    async handleConnection(client: Socket) {
    	this.logger.log(`Client connected: ${client.id}`);
    }
  }