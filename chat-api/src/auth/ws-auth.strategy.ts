import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { jwtConstants, wsQueryParam } from './constants';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/users/entities/users.entity';

@Injectable()
export class WsAuthStrategy extends PassportStrategy(Strategy, 'ws') {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter(wsQueryParam.token),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const user = await this.authService.validateUserJwt(
      payload.sub,
      payload.username,
    );
    if (!user) {
      throw new WsException('Not Autorized');
    }
    return user;
  }
}
