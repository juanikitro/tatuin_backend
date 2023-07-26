import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { UserDetail } from './UserDetail'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId!: number

    @Column()
    username!: string

    @Column()
    email!: string

    @OneToOne(() => UserDetail, userDetail => userDetail.userId, { cascade: true })
    @JoinColumn()
    userDetailId!: UserDetail;
}

