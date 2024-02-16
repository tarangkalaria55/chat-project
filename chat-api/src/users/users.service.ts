import { Injectable } from '@nestjs/common';
import { IUserEntity } from './users';

@Injectable()
export class UsersService {
  private readonly users: IUserEntity[] = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<IUserEntity | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
