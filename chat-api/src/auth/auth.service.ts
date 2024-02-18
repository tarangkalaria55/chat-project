import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const result = new UserEntity(user);
      return result;
    }
    return null;
  }
  async validateUserJwt(
    userId: number,
    username: string,
  ): Promise<UserEntity | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.id === userId) {
      const result = new UserEntity(user);
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
