import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from '../users/users';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): UserEntity | null => {
    const req = context.switchToHttp().getRequest();
    if (req['user']) {
      return new UserEntity(req['user']);
    }
    return null;
  },
);
