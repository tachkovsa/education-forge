import { InjectRepository } from '@nestjs/typeorm';
import { FavouritesEntity } from '../models/favourites.entity';
import { Repository } from 'typeorm';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class FavouritesService {
  constructor(
    @InjectRepository(FavouritesEntity)
    private favouritesRepository: Repository<FavouritesEntity>,
  ) {}

  async addLearningOutcomeToFavourites(favourite: Partial<FavouritesEntity>) {
    const newFavourite = this.favouritesRepository.create(favourite);
    return this.favouritesRepository.save(newFavourite);
  }

  async getFavouritesByUserId(userId: string) {
    return this.favouritesRepository.find({
      relations: ['learningOutcome'],
      where: { user: { id: userId } },
    });
  }

  async removeFromFavourites({ learningOutcomeId, userId }) {
    const favourite = await this.favouritesRepository.findOne({
      where: { id: learningOutcomeId },
    });

    if (favourite.user !== userId) {
      throw new ForbiddenException('Данный объект вам не принадлежит');
    }

    return this.favouritesRepository.delete(learningOutcomeId);
  }
}
