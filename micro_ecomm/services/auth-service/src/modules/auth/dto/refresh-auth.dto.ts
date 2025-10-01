import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class RefreshAuthDto {
  @ApiProperty({ example: '123456', description: 'Nhập...' })
  @IsNotEmpty()
  refresh_token: string;
}
