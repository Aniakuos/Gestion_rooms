import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { createRoomDto, dm_room, dto_global, get_user_rooms, room_name } from './dto/create-room.dto';

@Injectable()
export class RoomService {
   constructor(private prisma: PrismaService){}

	async create_post_room(createRoomDto: createRoomDto){
		const hash = await argon.hash(createRoomDto.password);
		const name = createRoomDto.name;
		const userCount = await this.prisma.user.count(
            {
                where: {
                    login: createRoomDto.owner
                }
            }
        )
		const identif = await this.prisma.room.count(
			{
				where: {
					name: createRoomDto.name,
					owner: createRoomDto.owner
				}
			}
		)
		if (userCount == 1 && identif == 0)
		{
			if (createRoomDto.name.match('Banned') || createRoomDto.name.match('banned'))
			{
				return new HttpException('Forbidden Banned name', HttpStatus.FORBIDDEN); 
			}
			else{
				const newroom = {
					name: createRoomDto.name,
					type: createRoomDto.type,
					password: hash,
					owner: createRoomDto.owner,
					users_room : {
						create: {
							user_id : createRoomDto.owner,
							user_role: 'owner',
							state_user: '',
						}
					}
				}
				const newroom_ban = {
					name: createRoomDto.name + 'Banned',
					type: 'ban',
					password: '',
					owner: createRoomDto.owner,
				}
				const new_user_room = await this.prisma.room.create({data: newroom});
				await this.prisma.room.create({data: newroom_ban});
				return (new_user_room);
			}
		}
		else {
			return new HttpException('Already exist', HttpStatus.FOUND);
		}
	}

	async get_rooms(UserRoom: get_user_rooms)
    {
        const getrooms = await this.prisma.users_room.findMany({ 
            where:
            {
                user_id: UserRoom.user_id,
				NOT:{
					state_user: {
						contains: 'banned',
					}
				},
				room:{
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
            select:{
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
        })
        return (getrooms);
    }

	async get_public_room(UserRoom: get_user_rooms){
		const getinfo = await this.prisma.room.findMany({
			where: {
				type: 'public',
			},
			select: {
				users_room:{
					where:{
						user_id: UserRoom.user_id,
						NOT:{
							state_user: {
								contains: 'banned',
							}
						}
					},
					select:
					{
						id: false,
						user_role: true,
						room_id: false,
						state_user: false,
					}
				},
				_count: {
					select:{
						users_room: true,
					}
				},
				name : true,
				owner: true,
				type : false,
				password : false,
			},
		})

		console.log(getinfo);
		return (getinfo);
	}

	async get_protected_room(UserRoom: get_user_rooms){
		const getinfo = await this.prisma.room.findMany({
			where: {
				type: 'protected',
			},
			select: {
				users_room:{
					where:{
						user_id: UserRoom.user_id,
						NOT:{
							state_user: {
								contains: 'banned',
							}
						}
					},
					select:
					{
						id: false,
						user_role: true,
						room_id: false,
						state_user: false,
					}
				},
				_count: {
					select:{
						users_room: true,
					}
				},
				name : true,
				owner: true,
				type : false,
				password : false,
			},
		})

		console.log(getinfo);
		return (getinfo);
	}

	async get_room_msgs(name: room_name)
	{
		let arr = [];
		const friends = await this.prisma.friendship.findMany({
			where:{
				id_user_1: name.user_id,// current 
				stat_block: true,
			},
			select:{
				id_user_2: true,
			}
		}).then((value) =>{
			for(let i = 0; i < value.length; i++)
			{
				arr[i] = value[i].id_user_2; 
			}
		})
		const msgs = await this.prisma.messageRoom.findMany({
			where: { room_name: name.room_id, 
				from:{
					notIn: arr,
				}
			},
			select:
			{
				from: true,
				content_msg: true,
				room_name: false,
				id: false,
				creationDate: false
			}
		});
		return (msgs);
	}

	async post_name_dm(name: dm_room){
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
			select:
			{
				from: true,
				to: true,
				content_msg: true,
				id: false,
				creationDate: false
			}
			
		});
		return (msgs);
	}

	async getAllUsersOfRoom(infos : dto_global)
	{ 
		let arr = [];
		const friends = await this.prisma.friendship.findMany({
			where:{
				id_user_1: infos.user_id,// current 
				stat_block: true,
			},
			select:{
				id_user_2: true,
			}
		}).then((value) =>{
			for(let i = 0; i < value.length; i++)
			{
				arr[i] = value[i].id_user_2; 
			}
		})
	  	return await this.prisma.users_room.findMany({
			orderBy: {
				 user_role: 'asc',
			},
			where : {room_id :  infos.room_id,
				user_id :{
					notIn : arr,
				}
			},
			select :{
				user_id :true,
				user_role : true,
				user : {
					select :{
					  id : true,
					  avatar : true
					}
			  }
			},
			
		})    
  }
  
}
