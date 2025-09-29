import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiResponseHelper } from '../../common/response/api-response';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    try {
      return this.authService.login(loginAuthDto);
    } catch (error) {
      return ApiResponseHelper.error('Lỗi: ' + error);
    }
  }

  @Get('me')
  me() {
    return this.authService.me();
  }
  @Post('logout')
  logout() {
    return this.authService.logout();
  }
  @Post('refresh')
  refresh() {
    return this.authService.refresh();
  }
  @Post('verify-token')
  verifyToken() {
    return this.authService.verifyToken();
  }
}
