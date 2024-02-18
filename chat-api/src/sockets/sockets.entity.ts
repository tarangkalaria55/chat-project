import { IUserEntity, UserEntity } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface ISocket {
  id: number;
  socketId: string;
  user: IUserEntity;
}

export interface ISocketEntity extends ISocket {}

@Entity('sockets')
export class SocketEntity implements ISocketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  socketId: string;

  @ManyToOne(() => UserEntity, (user) => user.sockets, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
