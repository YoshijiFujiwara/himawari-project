import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('searches')
@Controller('searches')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth()
export class SearchesController {}
