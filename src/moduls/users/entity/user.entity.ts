import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessTokenEntity } from './access.token.entity';
import { BookEntity } from '../../books/book.entity';
import { MessageEntity } from '../../messages/message.entity';

@Entity('user', {
  schema: 'security',
})
export class UserEntity extends BaseEntity {
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

  @Index('userEmailIndex', { unique: true })
  @Column('text', {
    nullable: false,
  })
  email: string;

  @Column('character varying', {
    nullable: false,
    select: false,
  })
  password: string;

  @Column('character varying', {
    nullable: true,
  })
  firstName: string;

  @Column('character varying', {
    nullable: true,
  })
  lastName: string;

  @Column('date', {
    nullable: true,
    default: '2000-01-01',
  })
  birthday: Date;

  @Column('character varying', {
    nullable: true,
  })
  sex: string;

  @Column('character varying', {
    nullable: true,
    default: 'Страна на Земле',
  })
  country: string;

  @Column('character varying', {
    nullable: true,
    default: 'Город на Земле',
  })
  town: string;

  @Column('character varying', {
    nullable: true,
    default: 'Какой-то адрес на Земле',
  })
  address: string;

  @Column('json', {
    nullable: true,
    default: {
      'fieldname': 'avatar',
      'originalname': 'av1.png',
      'encoding': '7bit',
      'mimetype': 'image/png',
      'destination': 'uploads/avatars',
      'filename': '8a12062fb6f4c53a621e0961c45dd04b',
      'path': 'uploads\\avatars\\av1.png',
      'size': 74623,
    },
  })
  avatar: any;


  @Column('text', {
    nullable: true,
    default: 'Расскажите что-нибудь примечательное о себе',
  })
  about: string;

  @OneToMany(() => AccessTokenEntity, accessToken => accessToken.user, { cascade: true })
  tokens: AccessTokenEntity[];

  @OneToMany(() => BookEntity, books => books.creator)
  books: BookEntity[];

  @OneToMany(() => MessageEntity, message => message.creator)
  message: MessageEntity[];
}