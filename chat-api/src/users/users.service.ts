import { Injectable } from '@nestjs/common';
import { IUserEntity, UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findOne(username: string): Promise<IUserEntity | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }
}
