import { Exclude } from 'class-transformer';
import { SocketEntity } from 'src/sockets/sockets.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @Exclude()
  @OneToMany(() => SocketEntity, (socket) => socket.user)
  sockets: SocketEntity[];

  constructor(partial: Partial<IUserEntity>) {
    Object.assign(this, partial);
  }
}
