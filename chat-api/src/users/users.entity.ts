import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  userId: number;
  username: string;
  password: string;
}

export interface IUserEntity extends IUser {}

@Entity('users')
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  constructor(partial: Partial<IUserEntity>) {
    Object.assign(this, partial);
  }
}
