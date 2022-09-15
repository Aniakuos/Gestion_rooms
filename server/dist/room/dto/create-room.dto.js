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
exports.dm_msg = exports.dto_changePass = exports.dto_leave = exports.dto_admin = exports.dto_global = exports.dto_user_room = exports.get_user_rooms = exports.dm_room = exports.room_name = exports.createRoomDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class createRoomDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: true, description: "this input used  to add  room name" }),
    __metadata("design:type", String)
], createRoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, description: "this input used  to add  room type if it's private, protected or public" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], createRoomDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true, description: "this input used  to add password room of the protected rooms" }),
    __metadata("design:type", String)
], createRoomDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiProperty)({ required: true, description: "this input used  to add the owner of room" }),
    __metadata("design:type", String)
], createRoomDto.prototype, "owner", void 0);
exports.createRoomDto = createRoomDto;
class room_name {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], room_name.prototype, "room_id", void 0);
exports.room_name = room_name;
class dm_room {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dm_room.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dm_room.prototype, "to", void 0);
exports.dm_room = dm_room;
class get_user_rooms {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], get_user_rooms.prototype, "user_id", void 0);
exports.get_user_rooms = get_user_rooms;
class dto_user_room {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_user_room.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_user_room.prototype, "room_name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dto_user_room.prototype, "content_msg", void 0);
exports.dto_user_room = dto_user_room;
class dto_global {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_global.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_global.prototype, "room_id", void 0);
exports.dto_global = dto_global;
class dto_admin {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_admin.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_admin.prototype, "new_admin", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_admin.prototype, "room_id", void 0);
exports.dto_admin = dto_admin;
class dto_leave {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_leave.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_leave.prototype, "user_role", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_leave.prototype, "room_id", void 0);
exports.dto_leave = dto_leave;
class dto_changePass {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_changePass.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_changePass.prototype, "room_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], dto_changePass.prototype, "password", void 0);
exports.dto_changePass = dto_changePass;
class dm_msg {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dm_msg.prototype, "from", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dm_msg.prototype, "to", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], dm_msg.prototype, "msg", void 0);
exports.dm_msg = dm_msg;
//# sourceMappingURL=create-room.dto.js.map