import { Module } from '@nestjs/common';
import { LearningOutcomesService } from './learning-outcomes.service';
import { ConstructorController } from './constructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningOutcomeEntity } from './models/learning-outcome.entity';
import { VerbsEntity } from './models/verbs.entity';
import { VerbsService } from './verbs.service';
import { FavouritesEntity } from './models/favourites.entity';
import { FavouritesService } from './favourites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      LearningOutcomeEntity,
      VerbsEntity,
      FavouritesEntity,
    ]),
  ],
  providers: [LearningOutcomesService, VerbsService, FavouritesService],
  controllers: [ConstructorController],
})
export class ConstructorModule {}
