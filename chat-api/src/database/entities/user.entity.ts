import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RoomEntity } from './room.entity';
import { ConnectedUserEntity } from './connected-user.entity';
import { JoinedRoomEntity } from './joined-room.entity';
import { MessageEntity } from './message.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Exclude()
  @Column({ select: false })
  password: string;

  @Exclude()
  @ManyToMany(() => RoomEntity, (room) => room.users)
  rooms: RoomEntity[];

  @Exclude()
  @OneToMany(() => ConnectedUserEntity, (connection) => connection.user)
  connections: ConnectedUserEntity[];

  @Exclude()
  @OneToMany(() => JoinedRoomEntity, (joinedRoom) => joinedRoom.room)
  joinedRooms: JoinedRoomEntity[];

  @Exclude()
  @OneToMany(() => MessageEntity, (message) => message.user)
  messages: MessageEntity[];

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.username = this.username.toLowerCase();
  }

  static removePassword(userObj: UserEntity) {
    return Object.fromEntries(
      Object.entries(userObj).filter(([key, val]) => key !== 'password'),
    );
  }
}
