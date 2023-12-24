import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
import { User } from './User'
import { SellerDetail } from './SellerDetail'

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn()
    userDetailId!: number;

    @OneToOne(() => User, user => user.userDetailId)
    userId!: User;

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

    @Column({
        nullable: false,
        default: 0
    })
    seller!: boolean

    @OneToOne(() => SellerDetail, sellerDetail => sellerDetail.userDetailId, { cascade: true, eager: true })
    @JoinColumn({ name: 'sellerDetailId' })
    sellerDetailId!: SellerDetail;
}
