import { User } from '../database';

export interface JwtPayloadDto {
  sub: string | number;
  user: User;
}
