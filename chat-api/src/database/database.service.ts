import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  get user() {
    return this.usersRepository;
  }
}
