import { PrismaService } from 'src/prisma/prisma.service';
import { dm_msg } from '../dto/create-room.dto';
export declare class DmService {
    private prisma;
    constructor(prisma: PrismaService);
    check_create_room_dm(message: dm_msg): Promise<string>;
}
