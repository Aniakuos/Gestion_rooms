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
const prisma_service_1 = require("./prisma/prisma.service");
let RoomService = class RoomService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create_room_many() {
        const newRoom = await this.prisma.room.createMany({
            data: [
                { name: 'room3', type: 'Public', owner: 'Soukaina' },
                { name: 'room4', type: 'Private', owner: 'Soukaina' },
            ],
            skipDuplicates: true,
        });
        console.log(newRoom);
    }
    async create_room() {
        const newRoom = await this.prisma.room.create({
            data: { name: 'room1', type: 'Public', owner: 'Soukaina' },
        });
        console.log(newRoom);
    }
    async find_room() {
        const newRoom = await this.prisma.room.findMany({});
        console.log(newRoom);
    }
    async create_room_user() {
        const newroom = {
            name: 'room_etoile', type: 'Public', owner: 'Soukaina',
            users_room: {
                create: {
                    user_id: 'Soukaina', user_role: 'owner', state_user: ''
                },
            },
        };
        const new_user_room = await this.prisma.room.create({ data: newroom });
    }
};
RoomService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoomService);
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map