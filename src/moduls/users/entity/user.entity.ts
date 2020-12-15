import { BaseEntity, Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AccessTokenEntity } from './access.token.entity';

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
    default: null,
  })
  birthday: Date;

  @Column('character varying', {
    nullable: true,
  })
  sex: string;

  @Column('character varying', {
    nullable: true,
    default: 'Страна на Земле'
  })
  country: string;

  @Column('character varying', {
    nullable: true,
    default: 'Город на Земле'
  })
  town: string;

  @Column('character varying', {
    nullable: true,
    default: 'Какой-то адрес на Земле'
  })
  address: string;

  @Column('json', {
    nullable: true,
    default: null,
  })
  avatar: any;

  @Column('text', {
    nullable: true,
    default: null
  })
  about: string;

  @OneToMany(() => AccessTokenEntity, accessToken => accessToken.user, {cascade: true})
  tokens: AccessTokenEntity[];
}