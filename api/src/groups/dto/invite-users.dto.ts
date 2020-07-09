import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class InviteUsersDto {
  @ApiProperty({
    example: ['test2@gmail.com', 'test3@gmail.com'],
    type: [String],
  })
  @IsEmail(undefined, { each: true })
  emails: string[];
}
