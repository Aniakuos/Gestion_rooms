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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomController = void 0;
const common_1 = require("@nestjs/common");
const create_room_dto_1 = require("./dto/create-room.dto");
const get_rooms_interceptor_1 = require("./get_rooms.interceptor");
const data_room_interceptor_1 = require("./data_room.interceptor");
const room_service_1 = require("./room.service");
const get_users_room_interceptor_1 = require("./get_users_room.interceptor");
let RoomController = class RoomController {
    constructor(roomService) {
        this.roomService = roomService;
    }
    post_room(createroomdto) {
        return this.roomService.create_post_room(createroomdto);
    }
    get_rooms(UserRoom) {
        return this.roomService.get_rooms(UserRoom);
    }
    get_public_room(UserRoom) {
        return this.roomService.get_public_room(UserRoom);
    }
    get_protected_room(UserRoom) {
        return this.roomService.get_protected_room(UserRoom);
    }
    post_name_room(room_id) {
        return this.roomService.get_room_msgs(room_id);
    }
    post_name_room_dm(name) {
        return this.roomService.post_name_dm(name);
    }
    async getAllUsersOfRoom(infos) {
        return await this.roomService.getAllUsersOfRoom(infos);
    }
};
__decorate([
    (0, common_1.Post)('/postroom'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.createRoomDto]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "post_room", null);
__decorate([
    (0, common_1.UseInterceptors)(get_rooms_interceptor_1.GetRoomsInterceptor),
    (0, common_1.Post)('/All_rooms_of_user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.get_user_rooms]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "get_rooms", null);
__decorate([
    (0, common_1.UseInterceptors)(data_room_interceptor_1.DataRoomInterceptor),
    (0, common_1.Post)('/public_room'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.get_user_rooms]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "get_public_room", null);
__decorate([
    (0, common_1.UseInterceptors)(data_room_interceptor_1.DataRoomInterceptor),
    (0, common_1.Post)('/protected_room'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.get_user_rooms]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "get_protected_room", null);
__decorate([
    (0, common_1.Post)('/get_room_msgs'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.room_name]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "post_name_room", null);
__decorate([
    (0, common_1.Post)('/post_name_room_dm'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.dm_room]),
    __metadata("design:returntype", void 0)
], RoomController.prototype, "post_name_room_dm", null);
__decorate([
    (0, common_1.Post)('/usersRoom'),
    (0, common_1.UseInterceptors)(get_users_room_interceptor_1.TransformInterceptor),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_dto_1.dto_global]),
    __metadata("design:returntype", Promise)
], RoomController.prototype, "getAllUsersOfRoom", null);
RoomController = __decorate([
    (0, common_1.Controller)('room'),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomController);
exports.RoomController = RoomController;
//# sourceMappingURL=room.controller.js.map