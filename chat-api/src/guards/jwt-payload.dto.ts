import { UserEntity } from '../database';

export interface JwtPayloadDto {
  sub: string | number;
  user: UserEntity;
}
