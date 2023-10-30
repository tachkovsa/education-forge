import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  Patch,
  Query,
  Delete,
} from '@nestjs/common';
import { SaveLearningOutcomeDto } from './dto/save-learning-outcome.dto';
import { LearningOutcomesService } from './learning-outcomes.service';
import { UpdateLearningOutcomeDto } from './dto/update-learning-outcome.dto';
import { ApiTags, ApiParam, ApiProperty, ApiBearerAuth } from '@nestjs/swagger';
import { BloomsLevel } from './constants';
import { VerbsService } from './verbs.service';
import { Public } from '../auth/decorators/public.decorator';
import { FavouritesService } from './favourites.service';

@ApiTags('constructor')
@Controller('constructor')
export class ConstructorController {
  constructor(
    private constructorService: LearningOutcomesService,
    private verbsService: VerbsService,
    private favouritesService: FavouritesService,
  ) {}

  @ApiBearerAuth('JWT')
  @Post('learning-outcomes')
  createLearningOutcome(
    @Body() saveLearningOutcomeDto: SaveLearningOutcomeDto,
    @Request() req,
  ) {
    return this.constructorService.createLearningOutcome({
      ...saveLearningOutcomeDto,
      creator: req.user.sub,
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
  getLearningOutcome(@Param('id') id) {
    return this.constructorService.getLearningOutcomeById({ id });
  }

  @Patch('learning-outcomes')
  updateLearningOutcomes(
    @Body() updateLearningOutcomeDto: UpdateLearningOutcomeDto,
    @Request() req,
  ) {
    return this.constructorService.updateLearningOutcome({
      ...updateLearningOutcomeDto,
      creator: req.user.sub,
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

  @ApiProperty({
    name: 'learning-outcome-id',
  })
  @Post('favourites')
  addToFavourites(
    @Query('learning-outcome-id') learningOutcomeId,
    @Request() req,
  ) {
    return this.favouritesService.addLearningOutcomeToFavourites({
      user: req.user.sub,
      learningOutcome: learningOutcomeId,
    });
  }

  @Get('favourites')
  getFavourites(@Request() req) {
    return this.favouritesService.getFavouritesByUserId(req.user.sub);
  }

  @Delete('favourites/:id')
  removeFromFavourites(@Param('id') learningOutcomeId, @Request() req) {
    const { id: userId } = req.user;

    return this.favouritesService.removeFromFavourites({
      learningOutcomeId,
      userId,
    });
  }
}
