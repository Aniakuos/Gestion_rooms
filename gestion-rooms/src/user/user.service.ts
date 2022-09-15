import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async signup(){
        let userCount = await this.prisma.user.count(
            {
                where: {
                    login: 'ssghuri'
                }
            }
        )
        //try{    
            // save the new user in the db
        if (userCount === 0)
        {
            const newuser = await this.prisma.user.create({
                data: {
                    login: 'ssghuri',
                    username: 'Soukaina',
                    avatar: 'ava',
                    email: 'ssghuri@student.1337.ma',
                    losses: 0,
                    wins: 0,
                    ladder_level:0,
                },
            });
            console.log(newuser);
            console.log('I have signed up');
        }
        else{
            console.log('already exists');
        }
           
        
        let userCount1 = await this.prisma.user.count(
            {
                where: {
                    login: 'hchorfi'
                }
            }
        )
        //try{    
            // save the new user in the db
        if (userCount1 === 0)
        {
            const newuser1 = await this.prisma.user.create({
                data: {
                    login: 'hchorfi',
                    username: 'Hamza',
                    avatar: 'ava',
                    email: 'hchorfi@student.1337.ma',
                    losses: 0,
                    wins: 0,
                    ladder_level:0,
                },
            });
            console.log(newuser1);
            console.log('I have signed up');
        }


        let userCount2 = await this.prisma.user.count(
            {
                where: {
                    login: 'sbarka'
                }
            }
        )
        if (userCount2 === 0)
        {
            const newuser2 = await this.prisma.user.create({
                data: {
                    login: 'sbarka',
                    username: 'Safa',
                    avatar: 'ava',
                    email: 'sbarka@student.1337.ma',
                    losses: 0,
                    wins: 0,
                    ladder_level:0,
                },
            });
            console.log(newuser2);
            console.log('I have signed up');
        }
        else{
            console.log('already exists');
        }
        let userCount5 = await this.prisma.user.count(
            {
                where: {
                    login: 'bsanaoui'
                }
            }
        )
        //try{    
            // save the new user in the db
        if (userCount5 === 0)
        {
            const newuser = await this.prisma.user.create({
                data: {
                    login: 'bsanaoui',
                    username: 'Brahim',
                    avatar: 'ava',
                    email: 'brahim@student.1337.ma',
                    losses: 0,
                    wins: 0,
                    ladder_level:0,
                },
            });
            console.log(newuser);
            console.log('I have signed up');
        }
        else{
            console.log('already exists');
        }

    }
}
