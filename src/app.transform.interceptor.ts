import {
  BadGatewayException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, from, map, Observable, throwError } from 'rxjs';

export interface Response<T> {
  data: T;
}

@Injectable()
export class AppTransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({ status: 'success', data })),
      catchError((err) =>
        throwError(() => {
          return new BadGatewayException({
            status: 'fail',
            data: err.message,
          });
        }),
      ),
    );
  }
}
