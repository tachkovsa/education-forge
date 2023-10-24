import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LearningOutcome } from './models/learning-outcome.entity';

@Injectable()
export class ConstructorService {
  constructor(
    @InjectRepository(LearningOutcome)
    private learningOutcomeRepository: Repository<LearningOutcome>,
  ) {}

  async createLearningOutcome(
    learningOutcome: Partial<LearningOutcome>,
  ): Promise<LearningOutcome> {
    const newLearningOutcome =
      this.learningOutcomeRepository.create(learningOutcome);

    const { id } =
      await this.learningOutcomeRepository.save(newLearningOutcome);

    return this.learningOutcomeRepository.findOne({ where: { id } });
  }

  async getLearningOutcomesByUser({ userId }) {
    return this.learningOutcomeRepository.find({
      // relations: ['user'],
      where: { user: { id: userId } },
      // select: {
      // },
    });
  }

  async getLearningOutcomeById({ id }) {
    return this.learningOutcomeRepository.findOne({ where: { id } });
  }

  async updateLearningOutcome(
    learningOutcomeForUpdate: Partial<LearningOutcome>,
  ) {
    const { id } = learningOutcomeForUpdate;
    const learningOutcome = await this.getLearningOutcomeById({ id });

    await this.learningOutcomeRepository.save({
      ...learningOutcome,
      ...learningOutcomeForUpdate,
    });

    return this.getLearningOutcomeById({ id });
  }

  async deleteLearningOutcomeById({ id }) {
    return this.learningOutcomeRepository.delete(id);
  }
}
