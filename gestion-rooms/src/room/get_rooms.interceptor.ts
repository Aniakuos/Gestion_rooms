import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class GetRoomsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
        .handle()
        .pipe(
          map(items => items.map(item => {
          
            return ({
                user_role : item.user_role,
                room_id : item.room_id,
                type : item.room.type
            });
        }))
        )
  }
}

