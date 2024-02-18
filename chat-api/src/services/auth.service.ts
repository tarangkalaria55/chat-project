import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database';
import { LoginDto } from '../dto';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private db: DatabaseService,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.db.user.findOneBy({
      username: loginDto.username,
      password: loginDto.password,
    });

    if (!user) {
    }

    const token = await this.tokenService.userToToken(user);
    return {
      token: token,
      user: user,
    };
  }
}
