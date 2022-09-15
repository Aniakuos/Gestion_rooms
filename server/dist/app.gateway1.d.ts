/// <reference types="node" />
import { Socket } from "socket.io";
import { Server } from "http";
export declare class AppGateway {
    server: Server;
    handleMessage(client: Socket, payload: string): void;
}
