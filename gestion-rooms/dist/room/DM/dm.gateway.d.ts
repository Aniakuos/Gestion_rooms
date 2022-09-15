import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { dm_msg } from 'src/room/dto/create-room.dto';
import { DmService } from './dm.service';
export declare class DmGateway {
    private prisma;
    private dm_service;
    constructor(prisma: PrismaService, dm_service: DmService);
    server: Server;
    private logger;
    handleMessage(): void;
    check_room_name(client: Socket, message: dm_msg): Promise<void>;
    send_msg(client: Socket, message: dm_msg): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
