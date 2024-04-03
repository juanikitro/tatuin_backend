/* eslint-disable import/no-extraneous-dependencies */
import Redis from 'ioredis'

const redisClient = new Redis({
  host: (process.env.REDIS_ADDRESS as string) || 'redis_service',
  port: 6379,
  lazyConnect: true,
  connectTimeout: 15000,
})

export default redisClient
