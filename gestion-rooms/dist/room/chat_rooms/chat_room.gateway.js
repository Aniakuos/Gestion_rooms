"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../prisma/prisma.service");
const create_room_dto_1 = require("../dto/create-room.dto");
const chat_room_service_1 = require("./chat_room.service");
let AppGateway = class AppGateway {
    constructor(prisma, chatroomservice) {
        this.prisma = prisma;
        this.chatroomservice = chatroomservice;
        this.myMap = new Map([]);
        this.banned = [];
        this.logger = new common_1.Logger('AppGateway');
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    async Join_room(client, infos) {
        console.log(infos);
        client.join(infos.room_id);
        this.myMap.set(client.id, infos.user_id);
        const newObj = await this.chatroomservice.add_user_to_room(infos);
        this.server.to(infos.room_id).emit("Joinned", { "user_role": newObj.user_role, "user_id": newObj.user_id });
    }
    async Send_message(client, infos) {
        console.log(this.banned.length);
        let check = false;
        for (let i = 0; i < this.banned.length; i++) {
            if (infos.name == this.banned[i]) {
                console.log(i, this.banned[i]);
                check = true;
                break;
            }
        }
        if (check == false) {
            this.chatroomservice.add_msg_room(infos);
            this.server.to(infos.room_name).except(infos.room_name + 'Banned').emit('msgToClient', { "from": infos.name, "content_msg": infos.room_name });
            console.log(this.banned);
        }
    }
    async ban_user(client, infos) {
        let check = false;
        this.chatroomservice.ban_user_in_room(infos);
        for (let [key, value] of this.myMap) {
            if (value == infos.user_id) {
                var soketId;
                soketId = key;
                this.server.sockets.sockets.get(soketId).join(infos.room_id + 'Banned');
                this.server.sockets.sockets.get(soketId).leave(infos.room_id);
            }
        }
        for (let i = 0; i < this.banned.length; i++) {
            if (infos.user_id == this.banned[i]) {
                console.log(i, this.banned[i]);
                check = true;
                break;
            }
        }
        if (check == false) {
            let num = this.banned.push(infos.user_id);
            console.log(num);
        }
        this.server.to(infos.room_id).emit("Ban", { "user_id": infos.user_id });
    }
    async setAdmin(client, infos) {
        const ret = await this.chatroomservice.setAdmin(infos);
        return this.server.to(infos.room_id).emit("setAdmin", { "user_id": infos.user_id });
    }
    async leaveRoom(client, infos) {
        const ret = await this.chatroomservice.leaveRoom(infos);
        return this.server.to(infos.room_id).emit("leaveRoom", { "user_id": infos.user_id });
    }
    async changePassword(client, infos) {
        const ret = await this.chatroomservice.changePassword(infos);
        return this.server.to(infos.room_id).emit("changePassword", ret);
    }
    async changeVisibility(client, infos) {
        const ret = await this.chatroomservice.removePassword(infos);
        return this.server.to(infos.room_id).emit("removePassword", ret);
    }
    async blockUser(client, infos) {
        const ret = await this.chatroomservice.block_user(infos);
        return this.server.to(infos.room_id).emit("blocked", { "user_id_blocked": infos.user_to_block });
    }
    async handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleConnection(client) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('JoinRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_global]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "Join_room", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('SendMessageRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_user_room]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "Send_message", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('banned'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_global]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "ban_user", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('setAdmin'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_admin]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "setAdmin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveRoom'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_leave]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "leaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('changePassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_changePass]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "changePassword", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removePassword'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_global]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "changeVisibility", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('block'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_room_dto_1.dto_block]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "blockUser", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        }
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, chat_room_service_1.ChatRoomService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=chat_room.gateway.js.map