import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';

@Entity('messages', {
  schema: 'messages',
})
export class MessageEntity extends BaseEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id: number;

  @Column('boolean', {
    nullable: false,
    default: false,
    select: false,
  })
  deleted: boolean;

  @Column('text', {
    nullable: true,
  })
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.message)
  @JoinColumn({
    name: 'creator_id',
    referencedColumnName: 'id',
  })
  creator: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.message)
  @JoinColumn({
    name: 'recipient_id',
    referencedColumnName: 'id',
  })
  recipient: UserEntity;

  @Column('date')
  created: Date;

}

