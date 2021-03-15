import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';

@Entity('post', {
  schema: 'posts',
})
export class PostEntity extends BaseEntity {
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

  @Column('json', {
    nullable: true,
  })
  photo: JSON;

  @Column('character varying', {
    nullable: true,
  })
  content: string;

  @Column('int', {
    nullable: true,
    default: 0,
  })
  likes: number;

  @Column('int', {
    nullable: true,
    default: 0,
  })
  views: number;

  @ManyToOne(() => UserEntity, (user) => user.posts)
  @JoinColumn({
    name: 'creator_id',
    referencedColumnName: 'id',
  })
  creator: UserEntity;

  @Column('timestamp without time zone')
  created: Date;
}