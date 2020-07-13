import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ReactionType } from '../reaction-type.enum';
export class ReactionTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [
    ReactionType.GOOD,
    ReactionType.BAD,
    ReactionType.SMILE,
    ReactionType.PIEN,
    ReactionType.POPPER,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (this.isTypesValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid type`);
    }

    return value;
  }

  private isTypesValid(type: any) {
    const idx = this.allowedTypes.indexOf(type);
    return idx === -1;
  }
}
