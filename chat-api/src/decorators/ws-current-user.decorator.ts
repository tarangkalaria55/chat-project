import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { UserEntity } from '../users/users';

export const WsCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity | null => {
    const req = context.switchToWs().getClient<Socket>().handshake;
    if (req['user']) {
      return new UserEntity(req['user']);
    }
    return null;
  },
);
