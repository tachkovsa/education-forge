import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerbsEntity } from '../models/verbs.entity';

@Injectable()
export class VerbsService {
  constructor(
    @InjectRepository(VerbsEntity)
    private verbsRepository: Repository<VerbsEntity>,
  ) {}

  async getVerbsByBloomsLevel({ bloomsLevel }) {
    return this.verbsRepository.find({ where: { bloomsLevel } });
  }
}
