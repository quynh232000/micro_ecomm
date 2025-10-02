import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class ResetPasswordDto {
  @ApiProperty({ example: '123456', description: 'Nhập...' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '123456', description: 'Nhập...' })
  @IsNotEmpty()
  token: string;
  @ApiProperty({ example: '123456', description: 'Nhập...' })
  @IsNotEmpty()
  newPassword: string;
}
