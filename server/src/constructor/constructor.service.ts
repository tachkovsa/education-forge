import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getLearningOutcomeById({ id, userId }) {
    const learningOutcome = await this.learningOutcomeRepository.findOne({
      where: { id, user: { id: userId } },
    });

    if (!learningOutcome) {
      throw new NotFoundException();
    }

    return learningOutcome;
  }

  async updateLearningOutcome(
    learningOutcomeForUpdate: Partial<LearningOutcome>,
  ) {
    const { id, user: userId } = learningOutcomeForUpdate;
    const learningOutcome = await this.getLearningOutcomeById({ id, userId });

    await this.learningOutcomeRepository.save({
      ...learningOutcome,
      ...learningOutcomeForUpdate,
    });

    return this.getLearningOutcomeById({ id, userId });
  }

  async deleteLearningOutcomeById({ id }) {
    return this.learningOutcomeRepository.delete(id);
  }
}
