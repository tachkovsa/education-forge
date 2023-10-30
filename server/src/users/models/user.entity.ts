import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LearningOutcomeEntity } from '../../constructor/models/learning-outcome.entity';
import { FavouritesEntity } from '../../constructor/models/favourites.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  firstname: string;

  @Column({ nullable: true })
  middlename: string;

  @Column({ nullable: true })
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    default: false,
  })
  isVerified: boolean;

  @OneToMany(
    () => LearningOutcomeEntity,
    (learningOutcome) => learningOutcome.creator,
  )
  @JoinColumn()
  learningOutcomes: LearningOutcomeEntity[];

  @OneToMany(() => FavouritesEntity, (favourite) => favourite.user)
  favourites: FavouritesEntity[];

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updatedAt: Date;
}
