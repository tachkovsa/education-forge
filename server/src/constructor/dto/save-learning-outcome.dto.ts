import { bloomLevels, BloomsLevel } from '../constants';
import { IsIn } from 'class-validator';

export class SaveLearningOutcomeDto {
  who: string;

  @IsIn(bloomLevels)
  bloomsLevel: BloomsLevel;

  verb: string;
  goal: string;
  condition: string;
}
