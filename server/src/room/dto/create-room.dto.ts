import { ApiProperty } from "@nestjs/swagger";
import { IsInt, isInt, IsNotEmpty, IsString } from "class-validator";

export class createRoomDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({required:true,description:"this input used  to add  room name"})
    name: string;
    @ApiProperty({required:true,description:"this input used  to add  room type if it's private, protected or public"})
    @IsString()
    type: string;
    @IsString()
    @ApiProperty({required:true,description:"this input used  to add password room of the protected rooms"})
    password: string;
    @IsString()
    @ApiProperty({required:true,description:"this input used  to add the owner of room"})
    owner: string;
}

export class room_name{
    @IsString()
    @IsNotEmpty()
    room_id: string;
}

export class dm_room{
    @IsString()
    from: string;
    @IsString()
    to: string;
}
//----Done
export class get_user_rooms{
    @IsString()
    user_id: string;// to delete
}
//----DOne
export class dto_user_room{
    @IsString()
    @IsNotEmpty()
    name: string;//to delete
    @IsString()
    @IsNotEmpty()
    room_name: string;
    @IsString()
    content_msg: string;
}
//----DOne
export class dto_global{
    @IsString()
    @IsNotEmpty()
    user_id: string;//to delete
    @IsString()
    @IsNotEmpty()
    room_id: string;
}

//---- Done
export class dto_admin {
    @IsString()
    @IsNotEmpty()
    user_id : string // to delete 

    @IsString()
    @IsNotEmpty()
    new_admin : string

    @IsString()
    @IsNotEmpty()
    room_id: string;
}
//--- Done
export class dto_leave {
    @IsString()
    @IsNotEmpty()
    user_id : string // to delete

    @IsString()
    @IsNotEmpty()
    user_role : string // to delete

    @IsString()
    @IsNotEmpty()
    room_id: string;
}

//--- Done
export class dto_changePass {
    @IsString()
    @IsNotEmpty()
    user_id : string // to delete

    @IsString()
    @IsNotEmpty()
    room_id: string 

    @IsString()
    @IsNotEmpty()
    password: string;
}





// export class dto_visibility {

//     room_name : string

//     old_type : string
//     new_type: string;

//     // tio remove
//     owner: string;

// }




export class dm_msg{
    @IsString()
    from: string;
    @IsString()
    to: string;
    @IsString()
    msg: string;
}