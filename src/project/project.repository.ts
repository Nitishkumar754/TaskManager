import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import ProjectEntity from './project.entity';
import TaskEntity from 'src/task/task.entity';

@Injectable()
export default class ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectModel: Repository<ProjectEntity>,
  ) {}

  public save(data: Partial<ProjectEntity>) {
    return this.projectModel.save(data);
  }

  public findOne(id: number): Promise<ProjectEntity> {
    return this.projectModel.findOne({
      where: { id },
    });
  }

  public getProjectStatus(id) {
    const queryBuilder = this.projectModel
      .createQueryBuilder('project')
      .select([
        'project.id as "projectId"',
        'project.name as "projectName"',
        'project.description as "projectDescription"',

        'tasks.id as "taskId"',
        'tasks.weight as "taskWeight"',
        'tasks.progress as "taskProgress"',
        'tasks.hasSubTask',
      ])
      .where('project.id = :id', { id })
      .innerJoin(
        TaskEntity,
        'tasks',
        'tasks.projectId = :id and tasks.hasSubTask = false',
        {
          id,
        },
      )
      .groupBy('1,2,3,4,5,6');

    try {
      return queryBuilder.execute();
    } catch (error) {
      console.log('error on get users and rooms', error);
      throw new BadRequestException('error on get users and rooms', error);
    }
  }
}
