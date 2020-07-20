import { Injectable } from '@nestjs/common';
import { UserEntity } from '../auth/user.entity';
import { GoalEntity } from '../goals/goal.entity';
import { GoalLabelEnum } from '../goals/goal-label.enum';

@Injectable()
export class SearchesService {
  async getGroupOf(
    user: UserEntity,
  ): Promise<{ users: UserEntity[]; goals: GoalEntity[] }> {
    let users = [];
    const newUser1 = new UserEntity();
    newUser1.id = 1;
    newUser1.username = 'test1';
    newUser1.email = 'test1@gmail.com';
    newUser1.password = 'hogehoge';
    newUser1.createdAt = new Date();
    users.push(newUser1);
    const newUser2 = new UserEntity();
    newUser2.id = 2;
    newUser2.username = 'test2';
    newUser2.email = 'test2@gmail.com';
    newUser2.password = 'hogehoge';
    newUser2.createdAt = new Date();
    users.push(newUser2);
    const newUser3 = new UserEntity();
    newUser3.id = 3;
    newUser3.username = 'test3';
    newUser3.email = 'test3@gmail.com';
    newUser3.password = 'hogehoge';
    newUser3.createdAt = new Date();
    users.push(newUser3);

    let goals = [];
    const newGoal1 = new GoalEntity();
    newGoal1.id = 1;
    newGoal1.title = '目標1';
    newGoal1.description = 'fugafuga';
    newGoal1.label = GoalLabelEnum.CHALLENGING;
    newGoal1.isPublic = false;
    newGoal1.userId = 1;
    newGoal1.user = user;
    newGoal1.createdAt = new Date();
    goals.push(newGoal1);
    const newGoal2 = new GoalEntity();
    newGoal2.id = 2;
    newGoal2.title = '目標2';
    newGoal2.description = 'fugafuga';
    newGoal2.label = GoalLabelEnum.CHALLENGING;
    newGoal2.isPublic = false;
    newGoal2.userId = 1;
    newGoal2.user = user;
    newGoal2.createdAt = new Date();
    goals.push(newGoal2);
    const newGoal3 = new GoalEntity();
    newGoal3.id = 3;
    newGoal3.title = '目標3';
    newGoal3.description = 'fugafuga';
    newGoal3.label = GoalLabelEnum.CHALLENGING;
    newGoal3.isPublic = false;
    newGoal3.userId = 1;
    newGoal3.user = user;
    newGoal3.createdAt = new Date();
    goals.push(newGoal3);

    return {
      users,
      goals,
    };
  }
}
