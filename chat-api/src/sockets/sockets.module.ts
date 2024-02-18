import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocketsService } from './sockets.service';
import { SocketEntity } from './sockets.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([SocketEntity]), UsersModule],
  providers: [SocketsService],
  exports: [SocketsService],
})
export class SocketsModule {}
