import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database';
import { AppController, AuthController } from './controllers';
import { JwtAuthGuard, JwtStrategy, WsStrategy } from './guards';
import { ChatGateway } from './gateways';
import {
  AppService,
  AuthService,
  SocketService,
  TokenService,
} from './services';
import { ConfigModule, ConfigService } from './config';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: { expiresIn: '1h' },
        global: true,
      }),
    }),
    DatabaseModule,
    ConfigModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    JwtStrategy,
    WsStrategy,
    ChatGateway,
    AppService,
    AuthService,
    TokenService,
    SocketService,
  ],
})
export class AppModule {}
