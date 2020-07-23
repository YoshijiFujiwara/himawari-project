import { ApiProperty } from '@nestjs/swagger';
import { GoalSerializer } from './goal.serializer';

export interface GoalsSummaryByMonth {
  [key: string]: GoalSerializer;
}
export interface CommitsSummaryByMonth {
  [key: string]: {
    goalTitle: string;
    count: number;
  };
}

export class GoalSummarySerializer {
  @ApiProperty()
  goals: GoalsSummaryByMonth;

  @ApiProperty()
  commits: CommitsSummaryByMonth;
}
