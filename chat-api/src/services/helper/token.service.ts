import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../database';
import { JwtPayloadDto } from '../../guards';
import { ConfigService } from '../../config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async tokenToUser(token: string) {
    const decode = await this.jwtService.verifyAsync<JwtPayloadDto>(token, {
      secret: this.config.JWT_SECRET,
    });
    if (decode && decode.user) {
      return decode.user;
    }
    return null;
  }

  async userToToken(user: UserEntity) {
    user.password = '';
    const payload: JwtPayloadDto = {
      sub: user.id,
      user: user,
    };
    return this.jwtService.signAsync(payload, {
      secret: this.config.JWT_SECRET,
    });
  }
}
