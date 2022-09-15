import { Socket, Server } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';
import { dm_msg } from 'src/room/dto/create-room.dto';
export declare class DmGateway {
    private prisma;
    constructor(prisma: PrismaService);
    server: Server;
    private logger;
    handleMessage(): void;
    check_room_name(client: Socket, message: dm_msg): Promise<void>;
    send_msg(client: Socket, message: dm_msg): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket): void;
}
