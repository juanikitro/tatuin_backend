import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../models/User'
import { UserDetail } from '../models/UserDetail'
import 'dotenv/config'
import { SellerDetail } from '../models/SellerDetail'

export const MariaDb = new DataSource({
    type: 'mariadb',
    host: process.env.MYSQL_ADDRESS as string,
    port: 3306,
    username: process.env.MYSQL_USER as string ?? 'test',
    password: process.env.MYSQL_PASSWORD as string ?? 'test',
    database: process.env.MYSQL_DATABASE as string,
    synchronize: true,
    logging: true,
    entities: [User, UserDetail, SellerDetail],
    migrations: [],
    subscribers: [],
})
