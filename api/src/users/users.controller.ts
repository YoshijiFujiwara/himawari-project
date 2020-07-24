import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserSerializer } from 'src/auth/serializer/user.serializer';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiOkResponse({
    description: '他人の基本情報を取得する',
    type: UserSerializer,
  })
  async getUser(
    @Param('id', ParseIntPipe) userId: number,
  ): Promise<UserSerializer> {
    const user = await this.usersService.getUser(userId);
    return user.transformToSerializer();
  }
}
