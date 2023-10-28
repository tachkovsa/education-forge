import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Patch,
  Query,
} from '@nestjs/common';
import { SaveLearningOutcomeDto } from './dto/save-learning-outcome.dto';
import { LearningOutcomesService } from './learning-outcomes.service';
import { UpdateLearningOutcomeDto } from './dto/update-learning-outcome.dto';
import { ApiTags, ApiParam, ApiProperty } from '@nestjs/swagger';
import { BloomsLevel } from './constants';
import { VerbsService } from './verbs.service';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('constructor')
@Controller('constructor')
export class ConstructorController {
  constructor(
    private constructorService: LearningOutcomesService,
    private verbsService: VerbsService,
  ) {}
  @Post('learning-outcomes')
  createLearningOutcome(
    @Body() saveLearningOutcomeDto: SaveLearningOutcomeDto,
    @Request() req,
  ) {
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
  @ApiParam({
    name: 'id',
    description: 'Идентификатор результата обучения',
    type: String,
  })
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

  @ApiProperty({
    name: 'blooms-level',
    enum: [
      'remembering',
      'understanding',
      'applying',
      'analyzing',
      'evaluating',
      'creating',
    ],
  })
  @Public()
  @Get('verbs')
  getVerbsByBloomsLevel(@Query('blooms-level') bloomsLevel: BloomsLevel) {
    return this.verbsService.getVerbsByBloomsLevel({ bloomsLevel });
  }
}
