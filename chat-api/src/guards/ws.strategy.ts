import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { JwtPayloadDto } from './jwt-payload.dto';
import { ConfigService } from '../config';

@Injectable()
export class WsStrategy extends PassportStrategy(Strategy, 'ws') {
  constructor(private config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
      ignoreExpiration: false,
      secretOrKey: config.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayloadDto) {
    return payload.user;
  }
}
