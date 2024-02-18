import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { SocketEntity } from './socket.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true })
  username: string;

  @Exclude()
  @Column({ length: 255 })
  password: string;

  @Exclude()
  @OneToMany((type) => SocketEntity, (m) => m.user)
  sockets: SocketEntity[];
}
