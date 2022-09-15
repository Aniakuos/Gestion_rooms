import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { dm_msg } from '../dto/create-room.dto';

@Injectable()
export class DmService {
    constructor(private prisma: PrismaService){}

    async check_create_room_dm(message: dm_msg){
        const dm_name = await this.prisma.room.count({
            where:{
                OR: [
                    {
                    name: message.from + message.to,
                    },
                    {
                    name: message.to + message.from,
                    },
                ]
            }
        })
        if (dm_name == 1){
            const get_name = await this.prisma.room.findFirst({
                where:{
                    OR: [
                    {
                        name: message.from + message.to,
                    },
                    {
                        name: message.to + message.from,
                    },
                    ]
                },
                select:{
                    name: true,
                }
            })
            return(get_name.name);
        }
        else if (dm_name == 0){
            const add_dm_room = await this.prisma.room.create({
              data: {
                name: message.from + message.to, type: 'dm', password: '', owner: message.from,
              }
                
            })
            return(add_dm_room.name);
        }
        // const dm_name = await this.prisma.users_room.create({
        //     data:{
        //         type: 'dm', 
        //         password: '', 
        //         owner: message.from,
        //         room:{
        //             connectOrCreate:{
        //                 where:{
        //                     name: message.from + message.to,
        //                 },
        //                 create:{

        //                 }
        //             }
        //         }
        //     },
        // })

    }
}
