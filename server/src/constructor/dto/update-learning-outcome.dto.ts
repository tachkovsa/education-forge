import { SaveLearningOutcomeDto } from './save-learning-outcome.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateLearningOutcomeDto extends PartialType(
  SaveLearningOutcomeDto,
) {}
