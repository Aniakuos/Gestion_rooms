import { HttpException } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { PrismaService } from 'src/prisma/prisma.service';
import { dto_user_room } from "./room/dto/create-room.dto";
export declare class AppGateway {
    private prisma;
    constructor(prisma: PrismaService);
    myMap: Map<unknown, unknown>;
    banned: string[];
    server: Server;
    private logger;
    afterInit(server: Server): void;
    step1Tojoinroom(client: Socket, infos: dto_user_room): Promise<HttpException>;
    join_room(client: Socket, infos: dto_user_room): Promise<HttpException>;
    ban_user(client: Socket, infos: dto_user_room): Promise<void>;
    handleDisconnect(client: Socket): Promise<void>;
    handleConnection(client: Socket): Promise<void>;
}
