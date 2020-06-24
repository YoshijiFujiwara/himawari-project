import { ApiProperty } from '@nestjs/swagger';

export class CommitsSummary {
  @ApiProperty({
    example: '88:24',
  })
  totalTime: string;

  @ApiProperty({
    example: 99,
  })
  totalCount: number;
}
