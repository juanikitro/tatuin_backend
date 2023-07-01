import dotenv from 'dotenv';
import redisClient from '../configs/redis';

dotenv.config();

/**
 * This is an async function that caches a value in Redis with a specified key and expiration time.
 * @param {string} key
 * @param {unknown} value
 */
async function cacheResponse(key:string, value: unknown): Promise<void> {
  await redisClient.connect();
  await redisClient.setex(key, process.env.CACHE_EXPIRATION_TIME ?? 3600, JSON.stringify(value));
  await redisClient.quit();
}

export default cacheResponse;
