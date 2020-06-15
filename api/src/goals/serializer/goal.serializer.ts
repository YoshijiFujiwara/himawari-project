import { ApiProperty } from '@nestjs/swagger';

export class GoalSerializer {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  isPublic: boolean;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  createdAt: Date;
}
