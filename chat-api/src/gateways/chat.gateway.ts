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
import { WsAuthGuard } from '../guards';
import { TokenService } from 'src/services';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private tokenService: TokenService) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket, ...args: any[]) {
    try {
      const query_token = socket.handshake.query['token'];
      let token = '';
      if (Array.isArray(query_token)) {
        if (query_token.length) {
          token = query_token[0];
        }
      } else {
        token = query_token;
      }
      const user = await this.getUserFromToken(token || '');
      if (!user) {
        this.disconnect(socket);
      }
      socket.handshake['user'] = user;
    } catch (error) {
      this.disconnect(socket);
    }
  }

  async handleDisconnect(socket: Socket) {
    await this.disconnect(socket);
  }

  private async disconnect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
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

  private async getUserFromToken(authheader?: string) {
    try {
      const token = (authheader ?? '').replace('Bearer', '');
      return await this.tokenService.tokenToUser(token);
    } catch {
      return null;
    }
  }
}
