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
exports.RoomService = void 0;
const common_1 = require("@nestjs/common");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
let RoomService = class RoomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create_post_room(createRoomDto) {
        const hash = await argon.hash(createRoomDto.password);
        const name = createRoomDto.name;
        const userCount = await this.prisma.user.count({
            where: {
                login: createRoomDto.owner
            }
        });
        const identif = await this.prisma.room.count({
            where: {
                name: createRoomDto.name,
                owner: createRoomDto.owner
            }
        });
        if (userCount == 1 && identif == 0) {
            if (createRoomDto.name.match('Banned') || createRoomDto.name.match('banned')) {
                return new common_1.HttpException('Forbidden Banned name', common_1.HttpStatus.FORBIDDEN);
            }
            else {
                const newroom = {
                    name: createRoomDto.name,
                    type: createRoomDto.type,
                    password: hash,
                    owner: createRoomDto.owner,
                    users_room: {
                        create: {
                            user_id: createRoomDto.owner,
                            user_role: 'owner',
                            state_user: '',
                        }
                    }
                };
                const newroom_ban = {
                    name: createRoomDto.name + 'Banned',
                    type: 'ban',
                    password: '',
                    owner: createRoomDto.owner,
                };
                const new_user_room = await this.prisma.room.create({ data: newroom });
                await this.prisma.room.create({ data: newroom_ban });
                return (new_user_room);
            }
        }
        else {
            return new common_1.HttpException('Already exist', common_1.HttpStatus.FOUND);
        }
    }
    async get_rooms(UserRoom) {
        const getrooms = await this.prisma.users_room.findMany({
            where: {
                user_id: UserRoom.user_id,
                NOT: {
                    state_user: {
                        contains: 'banned',
                    }
                },
                room: {
                    OR: [
                        {
                            type: 'public'
                        },
                        {
                            type: 'protected'
                        },
                        {
                            type: 'private'
                        },
                    ]
                }
            },
            select: {
                user_role: true,
                room_id: true,
                room: {
                    select: {
                        type: true,
                    }
                },
            },
            orderBy: {
                user_role: 'asc',
            },
        });
        return (getrooms);
    }
    async get_public_room(UserRoom) {
        const getinfo = await this.prisma.room.findMany({
            where: {
                type: 'public',
            },
            select: {
                users_room: {
                    where: {
                        user_id: UserRoom.user_id,
                        NOT: {
                            state_user: {
                                contains: 'banned',
                            }
                        }
                    },
                    select: {
                        id: false,
                        user_role: true,
                        room_id: false,
                        state_user: false,
                    }
                },
                _count: {
                    select: {
                        users_room: true,
                    }
                },
                name: true,
                owner: true,
                type: false,
                password: false,
            },
        });
        console.log(getinfo);
        return (getinfo);
    }
    async get_protected_room(UserRoom) {
        const getinfo = await this.prisma.room.findMany({
            where: {
                type: 'protected',
            },
            select: {
                users_room: {
                    where: {
                        user_id: UserRoom.user_id,
                        NOT: {
                            state_user: {
                                contains: 'banned',
                            }
                        }
                    },
                    select: {
                        id: false,
                        user_role: true,
                        room_id: false,
                        state_user: false,
                    }
                },
                _count: {
                    select: {
                        users_room: true,
                    }
                },
                name: true,
                owner: true,
                type: false,
                password: false,
            },
        });
        console.log(getinfo);
        return (getinfo);
    }
    async get_room_msgs(name) {
        let arr = [];
        const friends = await this.prisma.friendship.findMany({
            where: {
                id_user_1: "sbarka",
                stat_block: true,
            },
            select: {
                id_user_2: true,
            }
        }).then((value) => {
            for (let i = 0; i < value.length; i++) {
                arr[i] = value[i].id_user_2;
            }
        });
        const msgs = await this.prisma.messageRoom.findMany({
            where: { room_name: name.room_id,
                from: {
                    notIn: arr,
                }
            },
            select: {
                from: true,
                content_msg: true,
                room_name: false,
                id: false,
                creationDate: false
            }
        });
        return (msgs);
    }
    async post_name_dm(name) {
        const msgs = await this.prisma.directMessage.findMany({
            where: {
                OR: [
                    {
                        from: name.from, to: name.to,
                    },
                    {
                        from: name.to, to: name.from
                    },
                ]
            },
            select: {
                from: true,
                to: true,
                content_msg: true,
                id: false,
                creationDate: false
            }
        });
        return (msgs);
    }
    async getAllUsersOfRoom(infos) {
        return await this.prisma.users_room.findMany({
            orderBy: {
                user_role: 'asc',
            },
            where: { room_id: infos.room_id },
            select: {
                user_id: true,
                user_role: true,
                user: {
                    select: {
                        id: true,
                        avatar: true
                    }
                }
            },
        });
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map