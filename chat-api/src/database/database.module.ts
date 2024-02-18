import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities';
import { DatabaseService } from './database.service';

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
      // entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule, DatabaseService],
})
export class DatabaseModule {}
