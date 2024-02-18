import { Injectable } from '@nestjs/common';
import { RoomEntity } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(RoomEntity)
    private repo: Repository<RoomEntity>,
    private userService: UsersService,
  ) {}

  async createRoom(userIds: number[]) {
    const room = new RoomEntity();
    room.users = await this.userService.find({
      where: { id: In([...userIds]) },
    });
    return await this.repo.create(room);
  }

  async addUsersToRoom(roomId: string, userIds: number[]) {
    const room = await this.repo.findOne({ where: { id: roomId } });
    const currentUserIds = room.users.map((x) => x.id);
    const userIdsToAdd = [
      ...currentUserIds,
      ...userIds.filter((x) => !currentUserIds.includes(x)),
    ];
    room.users = await this.userService.find({
      where: { id: In([...userIdsToAdd]) },
    });

    await this.repo.save(room);
  }

  async removeUsersToRoom(roomId: string, userIds: number[]) {
    const room = await this.repo.findOne({ where: { id: roomId } });
    room.users = room.users.filter((x) => !userIds.includes(x.id));
    await this.repo.save(room);
  }
}
