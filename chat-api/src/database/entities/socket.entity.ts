import { Entity, Column, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('sockets')
export class SocketEntity {
  @Column({ length: 255, unique: true, primary: true })
  id: string;

  @ManyToOne((type) => UserEntity, (m) => m.sockets)
  user: UserEntity;
}
