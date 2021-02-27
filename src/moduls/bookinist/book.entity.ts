import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from '../users/entity/user.entity';

@Entity('book', {
  schema: 'books',
})
export class BookEntity extends BaseEntity {

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

  @Column('character varying', {
    nullable: false,
  })
  name: string;

  @Column('character varying', {
    nullable: false,
  })
  author: string;

  @Column('json', {
    nullable: true,
  })
  photo: JSON;

  @Column('text', {
    nullable: false,
  })
  comments: string;

  @Column('character varying', {
    nullable: false,
  })
  genre: string;

  @Column('int', {
    nullable: false,
  })
  price: number;

  @Column('character varying', {
    nullable: false,
  })
  town: string;

  @ManyToOne(() => UserEntity, (user) => user.books)
  @JoinColumn({
    name: 'creator_id',
    referencedColumnName: 'id',
  })
  creator: UserEntity;

  @Column('date')
  created: Date;

  @ManyToMany(() => UserEntity, (users) => users.favoriteBooks)
  favoriteCreators: UserEntity[];

}

