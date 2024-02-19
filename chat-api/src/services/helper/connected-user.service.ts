import { Injectable } from '@nestjs/common';
import { DatabaseService, ConnectedUserEntity } from '../../database';

@Injectable()
export class ConnectedUserService {
  constructor(private db: DatabaseService) {}

  async addConnectedSocket(userId: number, socketId: string) {
    const user = await this.db.user.findOneBy({ id: userId });
    const socket = new ConnectedUserEntity();
    socket.id = socketId;
    socket.user = user;
    return this.db.conn_user.save(socket);
  }

  async removeConnectedSocket(socketId: string) {
    return this.db.conn_user.delete({ id: socketId });
  }
}
