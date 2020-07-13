import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsIn } from 'class-validator';
import { ReactionType } from '../reaction-type.enum';

export class CreateReactionDto {
  @ApiProperty({
    example: 'PIEN',
    description: `${ReactionType.GOOD}, ${ReactionType.BAD}, ${ReactionType.SMILE}, ${ReactionType.PIEN}, ${ReactionType.POPPER} の中から1つ`,
  })
  @IsNotEmpty({
    message: 'emojiの選択は必須です',
  })
  @IsIn([
    ReactionType.GOOD,
    ReactionType.BAD,
    ReactionType.SMILE,
    ReactionType.PIEN,
    ReactionType.POPPER,
  ])
  emoji: ReactionType;
}
