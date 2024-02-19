import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ConnectedUserEntity,
  JoinedRoomEntity,
  MessageEntity,
  RoomEntity,
  UserEntity,
} from './entities';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,

    @InjectRepository(ConnectedUserEntity)
    private connectedUserRepo: Repository<ConnectedUserEntity>,

    @InjectRepository(JoinedRoomEntity)
    private joinedRoomRepo: Repository<JoinedRoomEntity>,

    @InjectRepository(MessageEntity)
    private messageRepo: Repository<MessageEntity>,

    @InjectRepository(RoomEntity)
    private roomRepo: Repository<RoomEntity>,
  ) {}

  get user() {
    return this.userRepo;
  }

  get conn_user() {
    return this.connectedUserRepo;
  }

  get joined_room() {
    return this.joinedRoomRepo;
  }

  get message() {
    return this.messageRepo;
  }

  get room() {
    return this.roomRepo;
  }
}
