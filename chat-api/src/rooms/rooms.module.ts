import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RoomEntity } from './entities/room.entity';
import { RoomsService } from './rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity]), UsersModule],
  providers: [RoomsService],
  exports: [RoomsService],
})
export class RoomsModule {}
