import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class ForgotpasswordDto {
  @ApiProperty({ example: '123456', description: 'Nhập...' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
