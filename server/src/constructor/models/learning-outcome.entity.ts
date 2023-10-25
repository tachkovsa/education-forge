import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/models/user.entity';
import { BloomsLevel } from '../constants';

@Entity('learning_outcomes')
export class LearningOutcome {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  who: string;

  @Column({ name: 'blooms_level' })
  bloomsLevel: BloomsLevel;

  @Column()
  verb: string;

  @Column()
  goal: string;

  @Column()
  condition: string;

  @ManyToOne(() => User, (user) => user.learningOutcomes)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'create_date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_date' })
  updatedAt: Date;
}