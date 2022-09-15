import { Body, Controller, Get, Post, UseInterceptors} from '@nestjs/common';
import { createRoomDto, dm_room, dto_global, get_user_rooms, room_name } from './dto/create-room.dto';
import { GetRoomsInterceptor } from './get_rooms.interceptor';
import { DataRoomInterceptor } from './data_room.interceptor';
import { RoomService } from './room.service';
import { TransformInterceptor } from './get_users_room.interceptor';

@Controller('room')
export class RoomController {
    constructor(private roomService: RoomService){}

    @Post('/postroom')
    post_room(@Body() createroomdto: createRoomDto){
        //console.log(createroomdto);
        return this.roomService.create_post_room(createroomdto);
    }

    @UseInterceptors(GetRoomsInterceptor)
    @Post('/All_rooms_of_user')
    get_rooms(@Body() UserRoom: get_user_rooms)
    {
        return this.roomService.get_rooms(UserRoom);
    }

    @UseInterceptors(DataRoomInterceptor)
    @Post('/public_room')
    get_public_room(@Body() UserRoom: get_user_rooms){
        return this.roomService.get_public_room(UserRoom);
    }

    @UseInterceptors(DataRoomInterceptor)
    @Post('/protected_room')
    get_protected_room(@Body() UserRoom: get_user_rooms){
        return this.roomService.get_protected_room(UserRoom);
    }

    @Post('/get_room_msgs')
    post_name_room(@Body() room_id: room_name){
        return this.roomService.get_room_msgs(room_id);
    }

    @Post('/post_name_room_dm')
    post_name_room_dm(@Body() name: dm_room){
        return this.roomService.post_name_dm(name);
    }

    @Post('/usersRoom')
    @UseInterceptors(TransformInterceptor)
     async getAllUsersOfRoom(@Body() infos : dto_global)
     {
        return await this.roomService.getAllUsersOfRoom(infos);
     }
}
