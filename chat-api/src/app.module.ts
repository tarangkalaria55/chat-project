import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database';
import { jwtConstants } from './constants';
import { AppController, AuthController } from './controllers';
import { JwtAuthGuard, JwtStrategy, WsStrategy } from './guards';
import { ChatGateway } from './gateways';
import { AppService, AuthService, TokenService } from './services';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
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
