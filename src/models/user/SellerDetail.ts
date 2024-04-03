import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm'
import { UserPrimaryDetail } from './UserPrimaryDetail'

@Entity()
export class SellerDetail {
    @PrimaryGeneratedColumn()
    sellerDetailId!: number

    @OneToOne(
        () => UserPrimaryDetail,
        (userDetail) => userDetail.sellerDetail
    )
    userPrimaryDetail!: UserPrimaryDetail

    @Column({
        nullable: true,
    })
    legalName!: string

    @Column({
        nullable: true,
    })
    phoneNumber!: string

    @Column({
        nullable: true,
    })
    address!: string

    @Column({
        nullable: true,
    })
    geo!: string

    @Column({
        nullable: true,
        default: 0,
    })
    balance!: string

    @Column({
        nullable: true,
    })
    media!: string
    //   URLs separated by comas

    @Column({
        nullable: true,
    })
    status!: string
}
