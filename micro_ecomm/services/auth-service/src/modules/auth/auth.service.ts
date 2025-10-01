import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { I18nService } from 'nestjs-i18n';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import data from '../../common/constants/data/data';
import { getRandomElement } from '../../common/utils/function';
import { JwtService } from '@nestjs/jwt';
import { ApiResponseHelper } from '../../common/response/api-response';
import { createOpaqueRefreshToken, parseOpaqueRefreshToken } from '../../common/utils/refresh-token.util';

import { CacheService } from '../../infrastructure/cache/cache.service';
import { RefreshAuthDto } from './dto/refresh-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
    private readonly redis: CacheService,
  ) {}

  private getRefreshTTLSeconds() {
    // REFRESH_TOKEN_TTL env example: '30d' or number of seconds. We'll fallback to 30*24*3600
    const env = process.env.REFRESH_TOKEN_TTL || '30d';
    try {
      // if ms available
      // const msVal = ms(env); // returns milliseconds
      // return Math.floor(msVal / 1000);
      // Simpler: if env numeric -> parseInt, else 30d default
      if (/^\d+$/.test(env)) return parseInt(env, 10);
      // Very basic parser:
      if (env.endsWith('d')) return parseInt(env.slice(0, -1), 10) * 24 * 3600;
      if (env.endsWith('h')) return parseInt(env.slice(0, -1), 10) * 3600;
      return 30 * 24 * 3600;
    } catch {
      return 30 * 24 * 3600;
    }
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const existUser = await this.userRepo.findOne({
      where: { email: registerAuthDto.email },
    });

    if (existUser) {
      return ApiResponseHelper.error(this.i18n.t('error.email_exists'));
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(registerAuthDto.password, salt);

    const user = this.userRepo.create({
      ...registerAuthDto,
      password: hashPassword,
      uuid: uuidv4(),
      username: registerAuthDto.email.split('@')[0],
      avatar: getRandomElement(data.avatar),
    });

    await this.userRepo.save(user);
    return ApiResponseHelper.success(user, this.i18n.t('success.register'));
  }
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userRepo.findOne({
      where: {
        email: loginAuthDto.email,
      },
      select: ['id', 'email', 'password'],
    });

    if (!user) {
      return ApiResponseHelper.error('Email not exists in system', [], 402);
    }
    const isMatch = await bcrypt.compare(loginAuthDto.password, user.password);
    if (!isMatch) {
      return ApiResponseHelper.error('Password is incorrect', [], 402);
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    // create refresh token opaque
    const { sessionId, token } = createOpaqueRefreshToken();
    const hashed = await bcrypt.hash(token, 10);

    const ttl = this.getRefreshTTLSeconds();

    // store session in redis: key refresh:{sessionId} => JSON { userId, hashed } with EX TTL
    const key = `refresh:${sessionId}`;
    await this.redis.set(key, { userId: user.id, hashed }, ttl);

    // maintain per-user set of sessions
    const setKey = `user_refresh:${user.id}`;
    await this.redis.addToSet(setKey, sessionId, ttl);

    return ApiResponseHelper.success(
      {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        avatar: user.avatar,
      },
      'Ok',
      {
        access_token: accessToken,
        token_type: 'Bearer',
        token_expiry: process.env.JWT_EXPIRES_IN || '15m',
        refresh_token: token,
      },
    );
  }
  async refresh({ refresh_token }: RefreshAuthDto) {
    const parsed = parseOpaqueRefreshToken(refresh_token);
    if (!parsed) {
      return ApiResponseHelper.error('Invalid refresh token format', [], 401);
    }

    const { sessionId } = parsed;
    const key = `refresh:${sessionId}`;

    const session = await this.redis.get<{ userId: number; hashed: string }>(key);
    if (!session) {
      return ApiResponseHelper.error('Invalid or expired refresh token', [], 401);
    }

    const { userId, hashed } = session;
    const isValid = await bcrypt.compare(refresh_token, hashed);
    if (!isValid) {
      return ApiResponseHelper.error('Invalid refresh token', [], 401);
    }

    // 👉 hợp lệ → tạo access token mới + refresh token mới (rotation)
    // 👉 Xóa refresh token cũ (rotation)
    await this.redis.del(key);
    await this.redis.removeFromSet(`user_refresh:${userId}`, sessionId);

    // 👉 Tạo access token mới
    const payload = { sub: userId };
    const newAccessToken = await this.jwtService.signAsync(payload);

    // 👉 Tạo refresh token mới
    const { sessionId: newSessionId, token: newRefreshToken } = createOpaqueRefreshToken();
    const hashedNew = await bcrypt.hash(newRefreshToken, 10);
    const ttl = this.getRefreshTTLSeconds();

    await this.redis.set(`refresh:${newSessionId}`, { userId, hashed: hashedNew }, ttl);
    await this.redis.addToSet(`user_refresh:${userId}`, newSessionId, ttl);

    return ApiResponseHelper.success({}, 'Ok', {
      access_token: newAccessToken,
      token_type: 'Bearer',
      token_expiry: process.env.JWT_EXPIRES_IN || '15m',
      refresh_token: newRefreshToken,
    });
  }

  logout() {
    return `This action returns all auth`;
  }

  me() {
    return `This action updates a # auth`;
  }

  verifyToken() {
    return `This action removes a  auth`;
  }
}
