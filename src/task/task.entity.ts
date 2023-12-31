import ProjectEntity from 'src/project/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('task')
export default class TaskEntity {
  @PrimaryGeneratedColumn()
  @Index()
  readonly id: number;

  @Column({ nullable: true })
  readonly name: string;

  @Column({ nullable: true })
  readonly description: string;

  @ManyToOne(() => ProjectEntity, (project) => project.id, {
    onDelete: 'CASCADE',
  })
  project: ProjectEntity;

  @Column({ nullable: true }) // null implies parent task
  parentTask: string;

  @Column({ default: false }) // null implies parent task
  hasSubTask: boolean;

  @Column({ default: 1, nullable: true })
  weight: number;

  @Column({ nullable: true, default: 0 })
  progress: number;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
