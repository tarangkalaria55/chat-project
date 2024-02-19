import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from './database';
import { AppController, AuthController } from './controllers';
import { JwtAuthGuard, JwtStrategy, WsStrategy } from './guards';
import { ChatGateway } from './gateways';
import {
  AppService,
  AuthService,
  ConnectedUserService,
  TokenService,
} from './services';
import { ConfigModule, ConfigService } from './config';
import { RequestLoggerMiddleware } from './middlewares';

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
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
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
    ConnectedUserService,
  ],
})
export class AppModule implements NestModule {
  // let's add a middleware on all routes
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
