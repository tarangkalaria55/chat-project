import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';
import { User } from '../database';
import { JwtPayloadDto } from '../guards';

@Injectable()
export class TokenService {
  constructor(private jwtService: JwtService) {}

  async tokenToUser(token: string): Promise<User> {
    const decode = await this.jwtService.verifyAsync<JwtPayloadDto>(token, {
      secret: jwtConstants.secret,
    });
    if (decode && decode.user) {
      return decode.user;
    }
    return null;
  }

  async userToToken(user: User) {
    user.password = '';
    const payload: JwtPayloadDto = {
      sub: user.id,
      user: user,
    };
    return this.jwtService.signAsync(payload, { secret: jwtConstants.secret });
  }
}
