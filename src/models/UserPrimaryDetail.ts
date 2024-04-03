// import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm'
// import { User } from './User'
// import { UserSellerDetail } from './UserSellerDetail'

// @Entity()
// export class UserPrimaryDetail {
//     @PrimaryGeneratedColumn()
//     userPrimaryDetailId!: number;

//     @OneToOne(() => User, user => user.userPrimaryDetailId)
//     userId!: User;

//     @Column({
//         nullable: true
//     })
//     firstName!: string;

//     @Column({
//         nullable: true
//     })
//     lastName!: string;

//     @Column({
//         nullable: true
//     })
//     dni!: string;

//     @Column({
//         nullable: true
//     })
//     birthday!: string;

//     @Column({
//         nullable: false,
//         default: 0
//     })
//     seller!: boolean

//     @OneToOne(() => UserSellerDetail, userSellerDetail => userSellerDetail.userPrimaryDetailId, { cascade: true, eager: true })
//     @JoinColumn({ name: 'userSellerDetailId' })
//     userSellerDetailId!: UserSellerDetail;
// }
