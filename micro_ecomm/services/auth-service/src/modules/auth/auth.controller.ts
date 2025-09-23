import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  login(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @Get('me')
  me() {
    return this.authService.findAll();
  }
  @Post('logout')
  logout(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('refresh')
  refresh(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('verify-token')
  verifyToken(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

}
