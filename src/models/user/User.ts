import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { UserPrimaryDetail } from './UserPrimaryDetail'

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

    @OneToOne(() => UserPrimaryDetail, (userDetail: { userId: number }) => userDetail.userId, { cascade: true, eager: true })
    @JoinColumn()
    userPrimaryDetail!: UserPrimaryDetail;
}

