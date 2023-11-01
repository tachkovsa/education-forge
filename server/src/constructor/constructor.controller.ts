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
import {
  ApiTags,
  ApiParam,
  ApiProperty,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
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
  @ApiOperation({
    summary: 'Создать результат обучения',
  })
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

  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Получить созданные текущие пользователем результаты обучения',
  })
  @Get('learning-outcomes')
  getLearningOutcomes(@Request() req) {
    return this.constructorService.getLearningOutcomesByUser({
      userId: req.user.sub,
    });
  }

  @ApiOperation({
    summary: 'Получить результат обучения по идентификатору',
  })
  @Public()
  @Get('learning-outcomes/:id')
  @ApiParam({
    name: 'id',
    description: 'Идентификатор результата обучения',
    type: String,
  })
  getLearningOutcome(@Param('id') id) {
    return this.constructorService.getLearningOutcomeById({ id });
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Изменить результат обучения',
  })
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

  @ApiOperation({
    summary:
      'Получить глаголы, соответствующие указанному уровню таксономии Блума',
  })
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
    description: 'Уровень таксономии Блума',
  })
  @Public()
  @Get('verbs')
  getVerbsByBloomsLevel(@Query('blooms-level') bloomsLevel: BloomsLevel) {
    return this.verbsService.getVerbsByBloomsLevel({ bloomsLevel });
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Добавить результат обучения в избранные',
  })
  @ApiProperty({
    name: 'learning-outcome-id',
    description: 'Идентификатор результата обучения',
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

  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Получить избранные результаты обучения текущего пользователя',
  })
  @Get('favourites')
  getFavourites(@Request() req) {
    return this.favouritesService.getFavouritesByUserId(req.user.sub);
  }

  @ApiBearerAuth('JWT')
  @ApiOperation({
    summary: 'Удалить результат обучения из избранного',
  })
  @ApiParam({
    name: 'id',
    description: 'Идентификатор избранного',
  })
  @Delete('favourites/:id')
  removeFromFavourites(@Param('id') learningOutcomeId, @Request() req) {
    const { id: userId } = req.user;

    return this.favouritesService.removeFromFavourites({
      learningOutcomeId,
      userId,
    });
  }
}
