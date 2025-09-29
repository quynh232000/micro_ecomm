import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterAuthDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Họ và tên đầy đủ' })
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({ example: 'abc@example.com', description: 'Email hợp lệ' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Mật khẩu (tối thiểu 6 ký tự)' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
