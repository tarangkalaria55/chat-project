import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [AuthModule, UsersModule, WebsocketModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
