import TaskEntity from 'src/task/task.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Index,
  UpdateDateColumn,
} from 'typeorm';

@Entity('project')
export default class ProjectEntity {
  @PrimaryGeneratedColumn()
  @Index()
  readonly id: number;

  @Column({ nullable: true })
  readonly name: string;

  @Column({ nullable: true })
  readonly description: string;

  @OneToMany(() => TaskEntity, (task) => task.id)
  task: TaskEntity[];

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
