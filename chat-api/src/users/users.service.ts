import { Injectable } from '@nestjs/common';
import { UserEntity } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | null> {
    return this.usersRepository.findOne({ where: { username: username } });
  }

  async findOne(options: FindOneOptions<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOne(options);
  }

  async find(options?: FindManyOptions<UserEntity>): Promise<UserEntity[]> {
    return this.usersRepository.find(options);
  }
}
