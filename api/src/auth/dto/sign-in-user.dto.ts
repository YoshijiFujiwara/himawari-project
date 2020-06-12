import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class SignInUserDto {
  // ユーザー名とメールアドレスはsign_in時はOR
  @ApiPropertyOptional({
    example: 'test1',
    pattern: '.{5, 20}',
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({
    example: 'test1@gmail.com',
    pattern:
      '[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}.[A-Za-z0-9]{1,}',
  })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'hogehoge',
    pattern: '.{6, 20}',
  })
  @IsString()
  password: string;
}
