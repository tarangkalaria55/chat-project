import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database';
import { AppController, AuthController } from './controllers';
import { JwtAuthGuard, JwtStrategy, WsStrategy } from './guards';
import { ChatGateway } from './gateways';
import { AppService, AuthService, TokenService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>(
          'JWT_SECRET',
          'SECRET_SECRET_SECRET_SECRET_SECRET_SECRET',
        ),
        signOptions: { expiresIn: '1h' },
        global: true,
      }),
    }),
    DatabaseModule,
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
  ],
})
export class AppModule {}
