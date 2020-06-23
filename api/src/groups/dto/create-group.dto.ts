import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

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
}
