import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { UserDetail } from './UserDetail'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId!: number

    @Column()
    googleId!: string

    @Column()
    username!: string

    @Column({
        nullable: true
    })
    email!: string

    @OneToOne(() => UserDetail, (userDetail: { userId: number }) => userDetail.userId, { cascade: true })
    @JoinColumn()
    userDetailId!: UserDetail;
}

