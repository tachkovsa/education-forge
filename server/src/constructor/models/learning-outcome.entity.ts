import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from '../../users/models/user.entity';
import { BloomsLevel } from '../constants';
import { FavouritesEntity } from './favourites.entity';

@Entity('learning_outcomes')
export class LearningOutcomeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  who?: string;

  @Column({ name: 'blooms_level' })
  bloomsLevel: BloomsLevel;

  @Column()
  verb: string;

  @Column()
  goal: string;

  @Column()
  condition: string;

  @ManyToOne(() => UserEntity, (user) => user.learningOutcomes, {
    nullable: true,
  })
  @JoinColumn({ name: 'creator_id' })
  creator?: UserEntity;

  @OneToMany(() => FavouritesEntity, (favourite) => favourite.learningOutcome)
  favourites: FavouritesEntity[];

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updatedAt: Date;
}
