import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { type } from 'os';
import { PrismaService } from 'src/prisma/prisma.service';
import { dto_admin, dto_block, dto_changePass, dto_global, dto_leave, dto_user_room, room_name } from '../dto/create-room.dto';
import * as argon from 'argon2';
@Injectable()
export class ChatRoomService {
    constructor(private prisma: PrismaService){}

    async add_user_to_room(infos: dto_global)
    {
      let newUserRoom
        const usercount = await this.prisma.users_room.count({
			where: {
				user_id: infos.user_id,
				room_id: infos.room_id,
			}
		})
		if (usercount == 0){
			 return  await this.prisma.users_room.create({
				data:
					{user_id: infos.user_id, user_role: "user", room_id: infos.room_id, state_user: ""},
			});
         
		}
      return (newUserRoom);
    }

    async add_msg_room(infos: dto_user_room){
        const newmsg = await this.prisma.messageRoom.create({
            data:
            {creationDate: new Date(), from: infos.name, room_name: infos.room_name, content_msg: infos.content_msg},
        });
    }

    async ban_user_in_room(infos: dto_global){
        const usercount = await this.prisma.users_room.count({
			where: {
				user_id: infos.user_id,
				room_id: infos.room_id + 'Banned',
			}
        })
        if (usercount == 0){
            const newUserRoom = await this.prisma.users_room.create({
            data:
                {user_id: infos.user_id, user_role: "ban", room_id: infos.room_id + 'Banned', state_user: ""},
        	});
            const ban = await this.prisma.users_room.update({
                where: {
                    user_id_room_id : {
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


    async setAdmin(infos : dto_admin)
   {
      return  await this.prisma.users_room.update({
        where : {
            user_id_room_id : {
                user_id : infos.user_id,
                room_id : infos.room_id
            }
        },
        data : {
          user_role :"admin"
        }
      });
    
   }

   async leaveRoom(infos : dto_leave)
   {


     if (infos.user_role === "owner")
         return this.leaveOwner(infos);
     else
       return this.leave(infos);

   }

  async leaveOwner(infos: dto_leave)
  {
      const find = await this.prisma.users_room.findFirst({ 
        orderBy : {user_role : "asc"} ,
          where : {
            room_id : infos.room_id,
            OR : [ {user_role : "admin"} , {user_role : "user"} ]
          }
      }); 

    if (!find)
    {
        return await this.prisma.room.delete({
          where: {
            name : infos.room_id,
          },
      });
    }
    else
    {
        await this.prisma.users_room.delete({
          where : {
              user_id_room_id :{
                user_id : infos.user_id,
                room_id : infos.user_id
              },
          }
        });

        return await this.prisma.users_room.update({
          where : {
            user_id_room_id : {
              user_id : find.user_id,
              room_id : find.room_id
            }
          },
          data : {
            user_role : "owner",
            room : {
              update : {
                owner : find.user_id
              }
            }
          },
          include : {room : true},
      });
  }
  }

   async leave(infos : dto_leave)
    {
      return await this.prisma.users_room.delete ({
        where : {
            user_id_room_id :{
              user_id : infos.user_id,
              room_id : infos.room_id
            },
        }
      });
    }

    async removePassword(infos : dto_global)
    {
        const data = await  this.prisma.room.findFirst({
            where : {
                name : infos.room_id,
                type : "protected",
            }
        });
        if(data)
            return await  this.prisma.room.update({
            where :{
              name :  infos.room_id,
            },
            data :{
              type : "public",
              password : ""
            }
          });
        return null;
    }



    async changePassword(infos : dto_changePass)
    {
        const data = await  this.prisma.room.findFirst({
            where : {
                name : infos.room_id,
                type : "protected",
            }
        });
        if(data)
        {
            const new_password = await argon.hash(infos.password);
            return await  this.prisma.room.update({
            where :{
              name :  infos.room_id,
            },
            data :{
              password : new_password
            }
          });
        }
        return null;
    }



     async block_user(infos: dto_block)
     {
      const check = await this.prisma.friendship.findFirst({
        where :{
          id_user_1 : infos.user_id,
          id_user_2 : infos.user_to_block
        }
      });
      if(!check)
      {
        return await this.prisma.friendship.create({
          data : {
            id_user_1 : infos.user_id ,
            id_user_2 : infos.user_to_block,
            stat_block : true,
            type : "user"
          }
        })
      }
      return this.prisma.friendship.update({
        where:{
          id : check.id,
        },
        data : {
          stat_block : true
        }
      })
     }
  
}
