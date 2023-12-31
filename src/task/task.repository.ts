import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import TaskEntity from './task.entity';

@Injectable()
export default class TaskRepository {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskModel: Repository<TaskEntity>,
  ) {}

  public save(data: Partial<TaskEntity>) {
    return this.taskModel.save(data);
  }

  public findOne(id: number): Promise<TaskEntity> {
    return this.taskModel.findOne({
      where: { id },
      loadRelationIds: true,
    });
  }

  public update(id: number, data: Partial<TaskEntity>): Promise<UpdateResult> {
    return this.taskModel.update({ id }, data);
  }
}
