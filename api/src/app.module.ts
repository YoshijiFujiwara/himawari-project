import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { AuthModule } from './auth/auth.module';
import { GoalsModule } from './goals/goals.module';
import { CommitsModule } from './commits/commits.module';
import { GroupsModule } from './groups/groups.module';
import { TimelinesModule } from './timelines/timelines.module';
import { CommentsModule } from './comments/comments.module';
import { ReactionsModule } from './reactions/reactions.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: process.env.MAIL_TRAP_USER || '',
          pass: process.env.MAIL_TRAP_PASS || '',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/../templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TasksModule,
    AuthModule,
    GoalsModule,
    CommitsModule,
    GroupsModule,
    TimelinesModule,
    CommentsModule,
    ReactionsModule,
    SearchModule,
  ],
})
export class AppModule {}
