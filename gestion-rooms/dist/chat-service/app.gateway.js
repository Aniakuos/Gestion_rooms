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
const http_1 = require("http");
const chat_service_service_1 = require("./chat-service.service");
const create_msg_room_1 = require("../dto_msg_room/create-msg-room");
const prisma_service_1 = require("../prisma/prisma.service");
let AppGateway = class AppGateway {
    constructor(ChatServiceService, prisma) {
        this.ChatServiceService = ChatServiceService;
        this.prisma = prisma;
        this.logger = new common_1.Logger('AppGateway');
    }
    async handleMessage(client, createdtomsgroom) {
        this.server.emit('msgToClient', createdtomsgroom);
        let userCount = await this.prisma.user.count({
            where: {
                username: createdtomsgroom.name,
            }
        });
        console.log(createdtomsgroom.name);
        if (userCount == 1) {
            const newmsg = await this.prisma.messageRoom.create({
                data: { creationDate: new Date(), from: createdtomsgroom.name, room_name: "room", content_msg: createdtomsgroom.text },
            });
        }
        else {
            return new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
    afterInit(server) {
        this.logger.log('Init');
    }
    handleDisconnect(client) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    handleConnection(client, ...args) {
        this.logger.log(`Client connected: ${client.id}`);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", http_1.Server)
], AppGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('msgToServer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, create_msg_room_1.create_dto_msg]),
    __metadata("design:returntype", Promise)
], AppGateway.prototype, "handleMessage", null);
AppGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [chat_service_service_1.ChatServiceService, prisma_service_1.PrismaService])
], AppGateway);
exports.AppGateway = AppGateway;
//# sourceMappingURL=app.gateway.js.map