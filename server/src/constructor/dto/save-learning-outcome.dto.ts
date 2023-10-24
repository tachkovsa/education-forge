import { BloomsLevel } from '../constants';

export class SaveLearningOutcomeDto {
  who: string;

  bloomsLevel: BloomsLevel;

  verb: string;
  goal: string;
  condition: string;
}
