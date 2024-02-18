import { Exclude } from 'class-transformer';
import { SocketEntity } from 'src/sockets/entities/sockets.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

export interface IUser {
  id: number;
  username: string;
  password: string;
}

export interface IUserEntity extends IUser {}

@Entity('users')
export class UserEntity implements IUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

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
