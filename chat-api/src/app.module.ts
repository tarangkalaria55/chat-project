import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';
import { SocketsModule } from './sockets/sockets.module';
import { RoomsModule } from './rooms/rooms.module';
import { SocketEntity } from './sockets/entities/sockets.entity';
import { UserEntity } from './users/entities/users.entity';
import { RoomEntity } from './rooms/entities/room.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sa',
      password: 'm00ns00n',
      database: 'chatdb',
      autoLoadEntities: true,
      // entities: [UserEntity, SocketEntity, RoomEntity],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    WebsocketModule,
    SocketsModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
