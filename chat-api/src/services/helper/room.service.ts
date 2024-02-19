import { Injectable } from '@nestjs/common';
import { DatabaseService, SocketEntity } from '../../database';

@Injectable()
export class SocketService {
  constructor(private db: DatabaseService) {}

  async addConnectedSocket(userId: number, socketId: string) {
    const user = await this.db.user.findOneBy({ id: userId });
    const socket = new SocketEntity();
    socket.id = socketId;
    socket.user = user;
    return this.db.socket.save(socket);
  }

  async removeConnectedSocket(socketId: string) {
    return this.db.socket.delete({ id: socketId });
  }
}
