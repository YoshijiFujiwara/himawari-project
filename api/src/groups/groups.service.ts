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
    const group = await this.groupRepository.createGroup(createGroupDto, user);

    if (createGroupDto.emails.length) {
      const validationResult = await this.validateInvitationEmails(
        group.id,
        createGroupDto.emails,
      );

      // 処理を簡単にするために、全てのメールアドレスが正しい場合にのみ招待を実行する
      if (validationResult.invalid.length) {
        // TODO: 本当はトランザクションを張って、ロールバックした方がスマートなのだが、
        // なんかドキュメントが少ないので、簡単にやります
        // 招待メールが全て正しい場合にのみグループの新規作成をするため
        this.groupRepository.delete({ id: group.id });

        const emailsStr = validationResult.invalid.reduce(
          (acc, email, index) => (index === 0 ? email : `${acc}, ${email}`),
          '',
        );
        throw new BadRequestException(
          `${emailsStr}が存在しないメールアドレスです。全てのメールアドレスが正しい場合のみ、グループの作成と招待を実行出来ます`,
        );
      } else {
        validationResult.valid.forEach(async email => {
          const inviteUser = await this.userRepository.validateEmail({ email });
          await this.groupRepository.inviteUser(group.id, inviteUser);

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
      }
    }
    return group;
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
    const isBelongLoginUser = await this.userRepository.belongsToGroup(
      groupId,
      user,
    );
    if (!isBelongLoginUser) {
      throw new NotFoundException('このグループには参加していません');
    }

    const validationResult = await this.validateInvitationEmails(
      groupId,
      inviteUsersDto.emails,
    );

    // 処理を簡単にするために、全てのメールアドレスが正しい場合にのみ招待を実行する
    if (validationResult.invalid.length) {
      const emailsStr = validationResult.invalid.reduce(
        (acc, email, index) => (index === 0 ? email : `${acc}, ${email}`),
        '',
      );
      throw new BadRequestException(
        `${emailsStr}がすでにグループに参加しているか、存在しないメールアドレスです。全てのメールアドレスが正しい場合のみ、招待を実行出来ます`,
      );
    } else {
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

  private async validateInvitationEmails(
    groupId: number,
    emails: string[],
  ): Promise<ValidationResult> {
    const validationResult: ValidationResult = {
      valid: [],
      invalid: [],
    };

    for (const email of emails) {
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
    return validationResult;
  }
}
