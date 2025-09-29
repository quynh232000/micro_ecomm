import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginAuthDto {
  @ApiProperty({ example: 'test@gmail.com', description: 'Họ và tên đầy đủ' })
  @IsEmail()
  email: string;
  @ApiProperty({ example: '123456', description: 'Nhập mật khẩu' })
  @IsNotEmpty()
  password: string;
}
