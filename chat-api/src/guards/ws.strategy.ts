import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './jwt-payload.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>(
        'JWT_SECRET',
        'SECRET_SECRET_SECRET_SECRET_SECRET_SECRET',
      ),
    });
  }

  async validate(payload: JwtPayloadDto) {
    return payload.user;
  }
}
