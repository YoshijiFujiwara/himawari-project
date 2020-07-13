import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { UserEntity } from '../auth/user.entity';
import { GroupEntity } from './group.entity';
import { InviteUserDto } from './dto/invite-user.dto';
import { UserRepository } from '../auth/user.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { AssignGoalDto } from './dto/assign-goal.dto';
import { GoalRepository } from '../goals/goal.repository';
import { InviteUsersDto } from './dto/invite-users.dto';

interface ValidationResult {
  valid: string[];
  invalid: string[];
}

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
    return await this.groupRepository.getGroupsUserMemberOf(user);
  }

  async inviteUser(
    groupId: number,
    { email }: InviteUserDto,
    user: UserEntity,
  ): Promise<void> {
    const isBelongLoginUser = await this.userRepository.belongsToGroup(
      groupId,
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
      groupId,
      inviteUser,
    );
    if (isBelongInvitedUser) {
      throw new ConflictException('このユーザーは参加済です');
    }

    const group = await this.groupRepository.inviteUser(groupId, inviteUser);

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

  async inviteUsers(
    groupId: number,
    inviteUsersDto: InviteUsersDto,
    user: UserEntity,
  ): Promise<void> {
    console.log(inviteUsersDto);
    const isBelongLoginUser = await this.userRepository.belongsToGroup(
      groupId,
      user,
    );
    if (!isBelongLoginUser) {
      throw new NotFoundException('このグループには参加していません');
    }

    const validationResult: ValidationResult = {
      valid: [],
      invalid: [],
    };

    for (const email of inviteUsersDto.emails) {
      const isValidEmail = await this.userRepository.isValidEmail({ email });
      if (!isValidEmail) {
        validationResult.invalid.push(email);
        continue;
      }
      const invitedUser = await this.userRepository.findOne({ email });
      const isBelongInvitedUser = await this.userRepository.belongsToGroup(
        groupId,
        invitedUser,
      );
      if (isBelongInvitedUser) {
        validationResult.invalid.push(email);
        continue;
      }
      validationResult.valid.push(email);
      continue;
    }

    // 処理を簡単にするために、全てのメールアドレスが正しい場合にのみ招待を実行する
    if (!validationResult.invalid.length) {
      validationResult.valid.forEach(async email => {
        const inviteUser = await this.userRepository.validateEmail({ email });
        const group = await this.groupRepository.inviteUser(
          groupId,
          inviteUser,
        );

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
      });
    } else {
      const emailsStr = validationResult.invalid.reduce((acc, email) => {
        return `${email}, ${acc}`;
      }, '');
      throw new BadRequestException(
        `${emailsStr}がすでにグループに参加しているか、存在しないメールアドレスです`,
      );
    }
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
