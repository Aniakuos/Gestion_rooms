import { Server, Socket } from "socket.io";
import { PrismaService } from 'src/prisma/prisma.service';
import { dto_admin, dto_block, dto_changePass, dto_global, dto_leave, dto_user_room } from "../dto/create-room.dto";
import { ChatRoomService } from './chat_room.service';
export declare class AppGateway {
    private prisma;
    private chatroomservice;
    constructor(prisma: PrismaService, chatroomservice: ChatRoomService);
    myMap: Map<unknown, unknown>;
    banned: string[];
    server: Server;
    private logger;
    afterInit(server: Server): void;
    Join_room(client: Socket, infos: dto_global): Promise<void>;
    Send_message(client: Socket, infos: dto_user_room): Promise<void>;
    ban_user(client: Socket, infos: dto_global): Promise<void>;
    setAdmin(client: Socket, infos: dto_admin): Promise<boolean>;
    leaveRoom(client: Socket, infos: dto_leave): Promise<boolean>;
    changePassword(client: Socket, infos: dto_changePass): Promise<boolean>;
    changeVisibility(client: Socket, infos: dto_global): Promise<boolean>;
    blockUser(client: Socket, infos: dto_block): Promise<boolean>;
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
