import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WebsocketModule } from './websocket/websocket.module';
import { UserEntity } from './users/users.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'sa',
      password: 'm00ns00n',
      database: 'chatdb',
      entities: [UserEntity],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    WebsocketModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
