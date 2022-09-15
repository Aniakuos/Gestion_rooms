import { PrismaService } from 'src/prisma/prisma.service';
export declare class ChatServiceService {
    private prisma;
    constructor(prisma: PrismaService);
    savamsg(): Promise<void>;
}
