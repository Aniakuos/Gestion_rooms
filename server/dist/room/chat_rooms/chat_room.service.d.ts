import { PrismaService } from 'src/prisma/prisma.service';
import { dto_admin, dto_changePass, dto_global, dto_leave, dto_user_room } from '../dto/create-room.dto';
export declare class ChatRoomService {
    private prisma;
    constructor(prisma: PrismaService);
    add_user_to_room(infos: dto_global): Promise<import(".prisma/client").Users_room>;
    add_msg_room(infos: dto_user_room): Promise<void>;
    ban_user_in_room(infos: dto_global): Promise<void>;
    setAdmin(infos: dto_admin): Promise<import(".prisma/client").Users_room>;
    leaveRoom(infos: dto_leave): Promise<import(".prisma/client").Room | import(".prisma/client").Users_room>;
    leaveOwner(infos: dto_leave): Promise<import(".prisma/client").Room | (import(".prisma/client").Users_room & {
        room: import(".prisma/client").Room;
    })>;
    leave(infos: dto_leave): Promise<import(".prisma/client").Users_room>;
    removePassword(infos: dto_global): Promise<import(".prisma/client").Room>;
    changePassword(infos: dto_changePass): Promise<import(".prisma/client").Room>;
}
