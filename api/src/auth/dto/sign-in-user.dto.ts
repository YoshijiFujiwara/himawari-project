import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class SignInUserDto {
  // ユーザー名とメールアドレスはsign_in時はOR
  @ApiProperty()
  @IsOptional()
  username?: string;

  @ApiProperty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  password: string;
}
