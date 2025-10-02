import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiResponseHelper } from '../../common/response/api-response';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/auth-user.decorator';
import { User } from '../user/entities/user.entity';
import { RefreshAuthDto } from './dto/refresh-auth.dto';
import { ForgotpasswordDto } from './dto/forgotpassword-auth.dto';
import { ResetPasswordDto } from './dto/reset-password-auth.dto';

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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: User) {
    try {
      return ApiResponseHelper.success(user);
    } catch (error) {
      return ApiResponseHelper.error('Lỗi: ' + error);
    }
  }
  @Post('logout')
  logout() {
    return this.authService.logout();
  }
  @Post('refresh')
  refresh(@Body() RefreshAuthDto: RefreshAuthDto) {
    return this.authService.refresh(RefreshAuthDto);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotpasswordDto: ForgotpasswordDto) {
    return this.authService.forgotPassword(forgotpasswordDto);
  }
  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
  @Post('verify-token')
  verifyToken() {
    return this.authService.verifyToken();
  }
}
