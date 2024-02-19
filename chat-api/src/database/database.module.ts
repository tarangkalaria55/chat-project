import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocketEntity, UserEntity } from './entities';
import { DatabaseService } from './database.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.getOrThrow<string>('DB_HOST', 'localhost'),
        port: config.getOrThrow<number>('DB_PORT', 3306),
        username: config.getOrThrow<string>('DB_USER', 'root'),
        password: config.getOrThrow<string>('DB_PASSWORD', ''),
        database: config.getOrThrow<string>('DB_DATABASE', 'chatdb'),
        autoLoadEntities: true,
        // entities: [User],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([UserEntity, SocketEntity]),
  ],
  providers: [DatabaseService],
  exports: [TypeOrmModule, DatabaseService],
})
export class DatabaseModule {}
