import { UseGuards } from '@nestjs/common';
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
import { WsAuthGuard } from 'src/auth/ws-auth.guard';
import { WsCurrentUser } from 'src/decorators/ws-current-user.decorator';
import { UserEntity } from 'src/users/users';

@UseGuards(WsAuthGuard)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket, @WsCurrentUser() user: UserEntity) {
    //console.log(client, user);
  }
  handleDisconnect(client: Socket) {
    //console.log(client);
  }

  @SubscribeMessage('message')
  handleMessage(
    client: Socket,
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
