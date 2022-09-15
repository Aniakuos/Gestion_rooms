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
exports.DmService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DmService = class DmService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async check_create_room_dm(message) {
        const dm_name = await this.prisma.room.count({
            where: {
                OR: [
                    {
                        name: message.from + message.to,
                    },
                    {
                        name: message.to + message.from,
                    },
                ]
            }
        });
        if (dm_name == 1) {
            const get_name = await this.prisma.room.findFirst({
                where: {
                    OR: [
                        {
                            name: message.from + message.to,
                        },
                        {
                            name: message.to + message.from,
                        },
                    ]
                },
                select: {
                    name: true,
                }
            });
            return (get_name.name);
        }
        else if (dm_name == 0) {
            const add_dm_room = await this.prisma.room.create({
                data: {
                    name: message.from + message.to, type: 'dm', password: '', owner: message.from,
                }
            });
            return (add_dm_room.name);
        }
    }
};
DmService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DmService);
exports.DmService = DmService;
//# sourceMappingURL=dm.service.js.map