import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { ReactionType } from '../reaction-type.enum';

export class CreateReactionDto {
  @ApiProperty({
    example: 'PIEN',
    enum: ReactionType,
    type: String,
  })
  @IsNotEmpty({
    message: 'emojiの選択は必須です',
  })
  @IsEnum(ReactionType)
  emoji: ReactionType;
}
