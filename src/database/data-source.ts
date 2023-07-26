import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from '../entity/User'
import { UserDetail } from '../entity/UserDetail'
import 'dotenv/config'

export const MariaDb = new DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER ?? 'test',
    password: process.env.MYSQL_PASSWORD ?? 'test',
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: true,
    entities: [User, UserDetail],
    migrations: [],
    subscribers: [],
})
