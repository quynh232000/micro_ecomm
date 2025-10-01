import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  // ✅ Set key-value với TTL
  async set(key: string, value: any, ttl = 60) {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  // ✅ Get key-value
  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? (JSON.parse(data) as T) : null;
  }

  // ✅ Xóa key
  async del(key: string) {
    await this.redis.del(key);
  }

  // ✅ Thêm value vào 1 set + TTL
  async addToSet(setKey: string, value: string, ttl: number) {
    await this.redis.sadd(setKey, value);
    await this.redis.expire(setKey, ttl);
  }

  // ✅ Xóa value khỏi set
  async removeFromSet(setKey: string, value: string) {
    await this.redis.srem(setKey, value);
  }

  // ✅ Kiểm tra value có trong set hay không
  async isMemberOfSet(setKey: string, value: string): Promise<boolean> {
    const result = await this.redis.sismember(setKey, value);
    return result === 1;
  }

  // ✅ Lấy toàn bộ phần tử trong set (hữu ích khi logout all session của user)
  async getSetMembers(setKey: string): Promise<string[]> {
    return this.redis.smembers(setKey);
  }
}
