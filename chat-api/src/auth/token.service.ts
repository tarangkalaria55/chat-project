import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/users.entity';
import { AuthService } from './auth.service';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  getUserFromToken(token: string) {
    const payload = this.jwtService.verify(token);
    if (!payload) return null;
    return this.authService.validateUserJwt(payload.sub, payload.username);
  }

  getTokenFromUser(user: UserEntity) {
    const payload = { username: user.username, sub: user.userId };
    return this.jwtService.sign(payload);
  }
}
