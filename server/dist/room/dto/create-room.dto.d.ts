export declare class createRoomDto {
    name: string;
    type: string;
    password: string;
    owner: string;
}
export declare class room_name {
    room_id: string;
}
export declare class dm_room {
    from: string;
    to: string;
}
export declare class get_user_rooms {
    user_id: string;
}
export declare class dto_user_room {
    name: string;
    room_name: string;
    content_msg: string;
}
export declare class dto_global {
    user_id: string;
    room_id: string;
}
export declare class dto_admin {
    user_id: string;
    new_admin: string;
    room_id: string;
}
export declare class dto_leave {
    user_id: string;
    user_role: string;
    room_id: string;
}
export declare class dto_changePass {
    user_id: string;
    room_id: string;
    password: string;
}
export declare class dm_msg {
    from: string;
    to: string;
    msg: string;
}
