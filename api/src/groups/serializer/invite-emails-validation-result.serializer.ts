import { ApiProperty } from '@nestjs/swagger';

export class InviteEmailsValidationResultSerializer {
  @ApiProperty({
    example: ['hogehoge@hoge.com'],
    type: [String],
  })
  valid: string[];

  @ApiProperty({
    example: ['fugafuga@fuga.com'],
    type: [String],
  })
  invalid: string[];
}
