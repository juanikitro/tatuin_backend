import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { UserDetail } from './UserDetail'

@Entity()
export class SellerDetail {
    @PrimaryGeneratedColumn()
    sellerDetailId!: number;

    @OneToOne(() => UserDetail, userDetail => userDetail.sellerDetailId)
    userDetailId!: UserDetail;

    @Column({
        nullable: true
    })
    legalName!: string;

    @Column({
        nullable: true
    })
    phoneNumber!: string;

    @Column({
        nullable: true
    })
    address!: string;

    @Column({
        nullable: true
    })
    geo!: string;

    @Column({
        nullable: true,
        default: 0
    })
    balance!: string;

    @Column({
        nullable: true
    })
    media!: string;
    // URLs separated by comas

    @Column({
        nullable: true
    })
    status!: string;
}
