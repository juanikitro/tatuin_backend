import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn()
    userDetailId!: number;

    @Column({
        nullable: true
    })
    firstName!: string;

    @Column({
        nullable: true
    })
    lastName!: string;

    @Column({
        nullable: true
    })
    dni!: string;

    @Column({
        nullable: true
    })
    birthday!: string;

    @OneToOne(() => User, user => user.userDetailId)
    userId!: User;
}
