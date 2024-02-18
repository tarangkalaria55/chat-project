import { UserEntity } from 'src/users/entities/users.entity';
import { Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'rooms' })
export class RoomEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => UserEntity)
  users: UserEntity[];
}
