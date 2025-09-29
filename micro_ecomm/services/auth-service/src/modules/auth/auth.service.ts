import { ConflictException, Injectable } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly i18n: I18nService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerAuthDto: RegisterAuthDto): Promise<User> {
    const existUser = await this.userRepo.findOne({
      where: { email: registerAuthDto.email },
    });
    console.log(registerAuthDto);

    if (existUser) {
      throw new ConflictException(this.i18n.t('errors.email_exists'));
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

    return this.userRepo.save(user);
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
    const token = await this.jwtService.signAsync(payload);

    // Tạo refresh token (hash trước khi lưu DB)
    const refreshToken = uuidv4();
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.remember_token = hashedRefreshToken;
    await this.userRepo.save(user);

    return ApiResponseHelper.success(
      {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        avatar: user.avatar,
      },
      'Ok',
      {
        token,
        token_type: 'Bearer',
        expires_in: process.env.JWT_EXPIRE,
        refresh_token: hashedRefreshToken,
      },
    );
  }

  logout() {
    return `This action returns all auth`;
  }

  refresh() {
    return `This action returns a  auth`;
  }

  me() {
    return `This action updates a # auth`;
  }

  verifyToken() {
    return `This action removes a  auth`;
  }
}
