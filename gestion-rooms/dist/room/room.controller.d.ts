import { createRoomDto, dm_room, dto_global, get_user_rooms, room_name } from './dto/create-room.dto';
import { RoomService } from './room.service';
export declare class RoomController {
    private roomService;
    constructor(roomService: RoomService);
    post_room(createroomdto: createRoomDto): Promise<import("@nestjs/common").HttpException | import(".prisma/client").Room>;
    get_rooms(UserRoom: get_user_rooms): Promise<{
        user_role: string;
        room: {
            type: string;
        };
        room_id: string;
    }[]>;
    get_public_room(UserRoom: get_user_rooms): Promise<{
        owner: string;
        name: string;
        users_room: {
            user_role: string;
        }[];
        _count: {
            users_room: number;
        };
    }[]>;
    get_protected_room(UserRoom: get_user_rooms): Promise<{
        owner: string;
        name: string;
        users_room: {
            user_role: string;
        }[];
        _count: {
            users_room: number;
        };
    }[]>;
    post_name_room(room_id: room_name): Promise<{
        from: string;
        content_msg: string;
    }[]>;
    post_name_room_dm(name: dm_room): Promise<{
        from: string;
        content_msg: string;
        to: string;
    }[]>;
    getAllUsersOfRoom(infos: dto_global): Promise<{
        user: {
            id: number;
            avatar: string;
        };
        user_role: string;
        user_id: string;
    }[]>;
}
