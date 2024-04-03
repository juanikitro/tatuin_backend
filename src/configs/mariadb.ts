import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../models/user/User'
import { UserPrimaryDetail } from '../models/user/UserPrimaryDetail'
import 'dotenv/config'
import { SellerDetail } from '../models/user/SellerDetail'

export const MariaDb = new DataSource({
    type: 'mariadb',
    host: (process.env.MYSQL_ADDRESS as string) || 'mariadb_service',
    port: 3306,
    username: (process.env.MYSQL_USER as string) ?? 'test',
    password: (process.env.MYSQL_PASSWORD as string) ?? 'test',
    database: process.env.MYSQL_DATABASE as string,
    synchronize: true,
    logging: true,
    entities: [User, UserPrimaryDetail, SellerDetail],
    migrations: [],
    subscribers: [],
})
