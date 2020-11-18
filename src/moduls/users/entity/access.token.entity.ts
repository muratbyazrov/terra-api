import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('access_token', {
  schema: 'security',
})
export class AccessTokenEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column('character varying', {
    name: 'token',
    nullable: false,
  })
  token: string;

  @Column('int', {
    nullable: true,
    select: false,
  })
  expires: number;

  @ManyToOne(() => UserEntity, user => user.tokens)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity;

}