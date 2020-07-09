import { ApiProperty } from '@nestjs/swagger';
import { InviteEmailsValidationResultSerializer } from './invite-emails-validation-result.serializer';

export class InviteEmailsResponseSerializer {
  @ApiProperty({
    example: true,
    type: Boolean,
  })
  error: boolean;

  @ApiProperty({
    type: InviteEmailsValidationResultSerializer,
  })
  validationResult: InviteEmailsValidationResultSerializer;
}
