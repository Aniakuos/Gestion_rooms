import { PrismaService } from 'src/prisma/prisma.service';
export declare class RoomService {
    private prisma;
    constructor(prisma: PrismaService);
    create_room_many(): Promise<void>;
    create_room(): Promise<void>;
    find_room(): Promise<void>;
    create_room_user(): Promise<void>;
}
