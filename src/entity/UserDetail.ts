import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn()
    userDetailId!: number;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    dni!: string;

    @Column()
    birthday!: string;

    @OneToOne(() => User, user => user.userDetailId)
    userId!: User;
}
