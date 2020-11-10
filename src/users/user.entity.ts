import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn({
        type: 'bigint'
    })
    id: number;

    @Column('boolean', {
        nullable: false,
        default: false,
        select: false
    })
    deleted: boolean;

    @Index('userEmailIndex', {unique: true})
    @Column('text', {
        nullable: false
    })
    email: string;

    @Column('character varying', {
        nullable: false,
        select: false
    })
    password: string;

    @Column('character varying', {
        nullable: true
    })
    firstName: string;

    @Column('character varying', {
        nullable: true
    })
    lastName: string;

    @Column('timestamp without time zone', {
        nullable: true,
        default: null,
      })
    birthday: Date;

    @Column('character varying', {
        nullable: true
    })
    sex: string;

    @Column('character varying', {
        nullable: true
    })
    country: string;

    @Column('character varying', {
        nullable: true
    })
    town: string;

    @Column('character varying', {
        nullable: true
    })
    adress: string;

    @Column('json', {
        nullable: true,
        default: null
    })
    avatar: any

}