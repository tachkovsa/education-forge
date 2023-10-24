import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Patch,
} from '@nestjs/common';
import { SaveLearningOutcomeDto } from './dto/save-learning-outcome.dto';
import { ConstructorService } from './constructor.service';

@Controller('constructor')
export class ConstructorController {
  constructor(private constructorService: ConstructorService) {}
  @Post('learning-outcome')
  createLearningOutcome(
    @Body() saveLearningOutcomeDto: SaveLearningOutcomeDto,
    @Request() req,
  ) {
    const { who, bloomsLevel, verb, goal, condition } = saveLearningOutcomeDto;

    return this.constructorService.createLearningOutcome({
      who,
      bloomsLevel,
      verb,
      goal,
      condition,
      user: req.user.sub,
    });
  }

  @Get('learning-outcome')
  getLearningOutcomes(@Request() req) {
    return this.constructorService.getLearningOutcomesByUser({
      userId: req.user.sub,
    });
  }

  @Get('learning-outcome/:id')
  getLearningOutcome(@Param('id') id) {
    return this.constructorService.getLearningOutcomeById({ id });
  }

  @Patch('learning-outcome')
  updateLearningOutcomes(
    @Body() updateLearningOutcomeDto: SaveLearningOutcomeDto,
  ) {
    return this.constructorService.updateLearningOutcome(
      updateLearningOutcomeDto,
    );
  }
}
