import { bloomLevels, BloomsLevel } from '../constants';
import { IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SaveLearningOutcomeDto {
  @ApiProperty({
    example: 'applying',
    description: 'Уровень по таксономии Блума',
    enum: [
      'remembering',
      'understanding',
      'applying',
      'analyzing',
      'evaluating',
      'creating',
    ],
  })
  @IsIn(bloomLevels)
  bloomsLevel: BloomsLevel;

  @ApiProperty({
    example: 'проводить',
    description: 'Глагол',
  })
  verb: string;

  @ApiProperty({
    example: 'эксперименты',
    description: 'Цель / Объект',
  })
  goal: string;

  @ApiProperty({
    example: 'в лаборатории',
    description: 'Условие',
  })
  condition: string;
}
