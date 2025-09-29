import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
export class CreateAuthDto {
  @IsNotEmpty()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  username: string;

  @MinLength(6)
  password: string;

  @IsOptional()
  phone?: string;
}
