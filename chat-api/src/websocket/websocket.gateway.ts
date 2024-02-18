import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server, Socket } from 'socket.io';
import { TokenService } from 'src/auth/token.service';
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { WsCurrentUser } from 'src/decorators/ws-current-user.decorator';
import { SocketsService } from 'src/sockets/sockets.service';
import { UserEntity } from 'src/users/entities/users.entity';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private tokenService: TokenService,
    private socketService: SocketsService,
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    try {
      const tokenquery = socket?.handshake?.query?.token || '';
      let token = '';
      if (tokenquery) {
        if (Array.isArray(tokenquery)) {
          token = tokenquery.length > 0 ? tokenquery[0] || '' : '';
        } else {
          token = tokenquery || '';
        }
      }

      const user = await this.tokenService.getUserFromToken(
        (token || '').trim(),
      );

      if (!user) {
        return await this.disconnect(socket);
      }
      socket.handshake['user'] = user;

      const userId = user.userId;
      const socketID = socket.id;
      await this.socketService.createSocket(userId, socketID);
    } catch {
      return await this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.disconnect(socket);
  }

  private async disconnect(socket: Socket) {
    await this.socketService.deleteSocketBySocketId(socket.id);
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('message')
  handleMessage(
    socket: Socket,
    payload: any,
    @WsCurrentUser() user: UserEntity,
  ): string {
    return 'Hello world!';
  }

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
