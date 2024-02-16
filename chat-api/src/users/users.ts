import { Exclude } from 'class-transformer';

export interface IUser {
  userId: number;
  username: string;
  password: string;
}

export interface IUserEntity extends IUser {}

export class UserEntity implements IUserEntity {
  userId: number;
  username: string;

  @Exclude()
  password: string;

  constructor(partial: Partial<IUserEntity>) {
    Object.assign(this, partial);
  }
}
