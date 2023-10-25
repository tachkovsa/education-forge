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
import { UpdateLearningOutcomeDto } from './dto/update-learning-outcome.dto';

@Controller('constructor')
export class ConstructorController {
  constructor(private constructorService: ConstructorService) {}
  @Post('learning-outcomes')
  createLearningOutcome(
    @Body() saveLearningOutcomeDto: SaveLearningOutcomeDto,
    @Request() req,
  ) {
    // const { who, bloomsLevel, verb, goal, condition } = saveLearningOutcomeDto;

    return this.constructorService.createLearningOutcome({
      ...saveLearningOutcomeDto,
      user: req.user.sub,
    });
  }

  @Get('learning-outcomes')
  getLearningOutcomes(@Request() req) {
    return this.constructorService.getLearningOutcomesByUser({
      userId: req.user.sub,
    });
  }

  @Get('learning-outcomes/:id')
  getLearningOutcome(@Param('id') id, @Request() req) {
    const { sub: userId } = req.user;

    return this.constructorService.getLearningOutcomeById({ id, userId });
  }

  @Patch('learning-outcomes')
  updateLearningOutcomes(
    @Body() updateLearningOutcomeDto: UpdateLearningOutcomeDto,
    @Request() req,
  ) {
    return this.constructorService.updateLearningOutcome({
      ...updateLearningOutcomeDto,
      user: req.user.sub,
    });
  }
}
