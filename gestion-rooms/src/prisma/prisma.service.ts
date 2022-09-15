import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db: {
                    url: 'postgresql://postgres:postgrespw@localhost:55000/tran_db?schema=public'
                }
            }
        })
    }
}
