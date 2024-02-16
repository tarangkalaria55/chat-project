import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalStrategy } from './local.strategy';
import { WsAuthStrategy } from './ws-auth.strategy';
import { TokenService } from './token.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AuthService,
    TokenService,
    LocalStrategy,
    JwtStrategy,
    WsAuthStrategy,
  ],
  exports: [AuthService, TokenService],
})
export class AuthModule {}
