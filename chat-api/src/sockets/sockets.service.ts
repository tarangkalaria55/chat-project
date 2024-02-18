import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SocketEntity } from './sockets.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class SocketsService {
  constructor(
    @InjectRepository(SocketEntity)
    private repo: Repository<SocketEntity>,
    private userService: UsersService,
  ) {}

  findByUserId(userId: number) {
    return this.repo.find({ where: { user: { userId } } });
  }
  findBySocketId(socketId: string) {
    return this.repo.findOne({ where: { socketId } });
  }
  async createSocket(userId: number, socketId: string) {
    const user = await this.userService.findOne({ where: { userId } });
    const socket = new SocketEntity();
    socket.socketId = socketId;
    socket.user = user;
    const newSocket = await this.repo.save(socket);
    return newSocket;
  }
  async deleteSocketBySocketId(socketId: string) {
    const sockets = await this.repo.find({ where: { socketId } });
    await this.repo.remove(sockets);
  }
  async deleteSocketByUserId(userId: number) {
    const sockets = await this.repo.find({ where: { user: { userId } } });
    await this.repo.remove(sockets);
  }
}
