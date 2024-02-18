import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities';
import { SocketEntity } from './entities/socket.entity';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @InjectRepository(SocketEntity)
    private socketsRepository: Repository<SocketEntity>,
  ) {}

  get user() {
    return this.usersRepository;
  }

  get socket() {
    return this.socketsRepository;
  }
}
