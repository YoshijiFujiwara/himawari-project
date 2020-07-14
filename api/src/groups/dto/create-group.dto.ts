import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    example: 'グループひまわり',
    minLength: 1,
    maxLength: 20,
  })
  @IsNotEmpty({
    message: 'グループ名は必須です',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  name: string;

  @ApiProperty({
    example: ['test2@gmail.com', 'test3@gmail.com'],
    type: [String],
  })
  @IsEmail(undefined, {
    each: true,
    message: '形式が正しくないメールドレスが含まれています',
  })
  emails: string[];
}
