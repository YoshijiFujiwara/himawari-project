import { GoalSerializer } from '../serializer/goal.serializer';

export interface MonthlyGoalCommitSummary {
  [key: string]: {
    createdGoals: GoalSerializer[];
    [key: string]:
      | {
          goalTitle: string;
          count: number;
        }
      | GoalSerializer[];
  };
}
