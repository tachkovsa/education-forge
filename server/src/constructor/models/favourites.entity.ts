import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LearningOutcomeEntity } from './learning-outcome.entity';
import { UserEntity } from '../../users/models/user.entity';

@Entity('favourites')
export class FavouritesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.favourites)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(
    () => LearningOutcomeEntity,
    (learningOutcome) => learningOutcome.id,
  )
  @JoinColumn({ name: 'learning_outcome_id' })
  learningOutcome: LearningOutcomeEntity;

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updatedAt: Date;
}
