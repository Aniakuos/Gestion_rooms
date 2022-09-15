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
exports.ChatRoomService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const argon = require("argon2");
let ChatRoomService = class ChatRoomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async add_user_to_room(infos) {
        const usercount = await this.prisma.users_room.count({
            where: {
                user_id: infos.user_id,
                room_id: infos.room_id,
            }
        });
        if (usercount == 0) {
            const newUserRoom = await this.prisma.users_room.create({
                data: { user_id: infos.user_id, user_role: "user", room_id: infos.room_id, state_user: "" },
            });
            return (newUserRoom);
        }
        return (null);
    }
    async add_msg_room(infos) {
        const newmsg = await this.prisma.messageRoom.create({
            data: { creationDate: new Date(), from: infos.name, room_name: infos.room_name, content_msg: infos.content_msg },
        });
    }
    async ban_user_in_room(infos) {
        const usercount = await this.prisma.users_room.count({
            where: {
                user_id: infos.user_id,
                room_id: infos.room_id + 'Banned',
            }
        });
        if (usercount == 0) {
            const newUserRoom = await this.prisma.users_room.create({
                data: { user_id: infos.user_id, user_role: "ban", room_id: infos.room_id + 'Banned', state_user: "" },
            });
            const ban = await this.prisma.users_room.update({
                where: {
                    user_id_room_id: {
                        user_id: infos.user_id,
                        room_id: infos.room_id
                    }
                },
                data: {
                    state_user: "banned",
                },
            });
        }
    }
    async setAdmin(infos) {
        return await this.prisma.users_room.update({
            where: {
                user_id_room_id: {
                    user_id: infos.user_id,
                    room_id: infos.room_id
                }
            },
            data: {
                user_role: "admin"
            }
        });
    }
    async leaveRoom(infos) {
        if (infos.user_role === "owner")
            return this.leaveOwner(infos);
        else
            return this.leave(infos);
    }
    async leaveOwner(infos) {
        const find = await this.prisma.users_room.findFirst({
            orderBy: { user_role: "asc" },
            where: {
                room_id: infos.room_id,
                OR: [{ user_role: "admin" }, { user_role: "user" }]
            }
        });
        if (!find) {
            return await this.prisma.room.delete({
                where: {
                    name: infos.room_id,
                },
            });
        }
        else {
            await this.prisma.users_room.delete({
                where: {
                    user_id_room_id: {
                        user_id: infos.user_id,
                        room_id: infos.user_id
                    },
                }
            });
            return await this.prisma.users_room.update({
                where: {
                    user_id_room_id: {
                        user_id: find.user_id,
                        room_id: find.room_id
                    }
                },
                data: {
                    user_role: "owner",
                    room: {
                        update: {
                            owner: find.user_id
                        }
                    }
                },
                include: { room: true },
            });
        }
    }
    async leave(infos) {
        return await this.prisma.users_room.delete({
            where: {
                user_id_room_id: {
                    user_id: infos.user_id,
                    room_id: infos.room_id
                },
            }
        });
    }
    async removePassword(infos) {
        const data = await this.prisma.room.findFirst({
            where: {
                name: infos.room_id,
                type: "protected",
            }
        });
        if (data)
            return await this.prisma.room.update({
                where: {
                    name: infos.room_id,
                },
                data: {
                    type: "public",
                    password: ""
                }
            });
        return null;
    }
    async changePassword(infos) {
        const data = await this.prisma.room.findFirst({
            where: {
                name: infos.room_id,
                type: "protected",
            }
        });
        if (data) {
            const new_password = await argon.hash(infos.password);
            return await this.prisma.room.update({
                where: {
                    name: infos.room_id,
                },
                data: {
                    password: new_password
                }
            });
        }
        return null;
    }
};
ChatRoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ChatRoomService);
exports.ChatRoomService = ChatRoomService;
//# sourceMappingURL=chat_room.service.js.map