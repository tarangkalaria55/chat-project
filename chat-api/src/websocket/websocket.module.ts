import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { SocketsModule } from 'src/sockets/sockets.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, SocketsModule],
  providers: [WebsocketService, WebsocketGateway],
})
export class WebsocketModule {}
