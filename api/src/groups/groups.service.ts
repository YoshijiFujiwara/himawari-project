import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserEntity } from '../auth/user.entity';
import { GroupEntity } from './group.entity';
import { InviteUserDto } from '../auth/dto/invite-group.dto';
import { UserRepository } from '../auth/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { AssignGoalDto } from './dto/assign-goal.dto';
import { GoalRepository } from '../goals/goal.repository';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupRepository)
    private groupRepository: GroupRepository,
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(GoalRepository)
    private goalRepository: GoalRepository,
    private readonly mailerService: MailerService,
  ) {}

  async createGroup(
    createGroupDto: CreateGroupDto,
    user: UserEntity,
  ): Promise<GroupEntity> {
    return await this.groupRepository.createGroup(createGroupDto, user);
  }

  async getGroups(user: UserEntity): Promise<GroupEntity[]> {
    return await this.groupRepository.find({
      join: { alias: 'groups', innerJoin: { users: 'groups.users' } },
      relations: ['users'],
      where: qb => {
        qb.where('users.id = :userId', { userId: user.id });
      },
    });
  }

  async inviteUser(
    id: number,
    { email }: InviteUserDto,
    user: UserEntity,
  ): Promise<void> {
    const isBelongLoginUser = await this.userRepository.belongsToGroup(
      id,
      user,
    );
    if (!isBelongLoginUser) {
      throw new NotFoundException('このグループには参加していません');
    }

    const inviteUser = await this.userRepository.validateEmail({ email });
    if (!inviteUser) {
      throw new NotFoundException('メールアドレスが存在しません');
    }

    const isBelongInvitedUser = await this.userRepository.belongsToGroup(
      id,
      inviteUser,
    );
    if (isBelongInvitedUser) {
      throw new ConflictException('このユーザーは参加済です');
    }

    const group = await this.groupRepository.inviteUser(id, inviteUser);

    await this.mailerService.sendMail({
      to: email,
      from: 'noreply@nestjs.com',
      subject: `[HimawariHub] グループに招待されました '${email}'`,
      template: 'completeInvitation',
      context: {
        user,
        inviteUser,
        group,
      },
    });
  }

  async getGroup(id: number, user: UserEntity): Promise<GroupEntity> {
    // ユーザーがグループに入っているか
    const isBelong = await this.userRepository.belongsToGroup(id, user);
    if (!isBelong) {
      throw new NotFoundException('このグループには参加していません');
    }

    return await this.groupRepository.findOne({
      relations: ['users'],
      where: { id },
    });
  }

  async assignGoal(
    id: number,
    { goalId }: AssignGoalDto,
    user: UserEntity,
  ): Promise<void> {
    // グループにユーザーは参加しているか？
    const isBelongLoginUser = await this.userRepository.belongsToGroup(
      id,
      user,
    );
    if (!isBelongLoginUser) {
      throw new NotFoundException('このグループには参加していません');
    }

    const goal = await this.goalRepository.findOne({
      id: goalId,
      userId: user.id,
    });
    if (!goal) {
      throw new NotFoundException();
    }

    await this.groupRepository.assignGoal(id, goal);
  }
}
