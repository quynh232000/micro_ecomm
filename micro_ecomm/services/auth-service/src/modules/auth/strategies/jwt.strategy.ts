import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }

  async validate(payload: any) {
    // payload = { sub: user.id, email: user.email }
    // eslint-disable-next-line @typescript-eslint/await-thenable
    const user = await this.userService.findOne({ where: { id: payload.sub } });
    if (!user) {
      return null;
    }
    return {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      avatar: user.avatar,
    };
  }
}
