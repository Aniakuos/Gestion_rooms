/// <reference types="node" />
import { HttpException } from "@nestjs/common";
import { Socket } from "socket.io";
import { Server } from "http";
import { ChatServiceService } from "./chat-service.service";
import { create_dto_msg } from "src/dto_msg_room/create-msg-room";
import { PrismaService } from "src/prisma/prisma.service";
export declare class AppGateway {
    private ChatServiceService;
    private prisma;
    constructor(ChatServiceService: ChatServiceService, prisma: PrismaService);
    server: Server;
    private logger;
    handleMessage(client: Socket, createdtomsgroom: create_dto_msg): Promise<HttpException>;
    afterInit(server: Server): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: Socket, ...args: any[]): void;
}
