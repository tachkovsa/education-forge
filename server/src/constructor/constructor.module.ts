import { Module } from '@nestjs/common';
import { ConstructorService } from './constructor.service';
import { ConstructorController } from './constructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningOutcome } from './models/learning-outcome.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LearningOutcome])],
  providers: [ConstructorService],
  controllers: [ConstructorController],
})
export class ConstructorModule {}
