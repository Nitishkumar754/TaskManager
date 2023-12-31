import { BadRequestException, Injectable } from '@nestjs/common';
import TaskRepository from './task.repository';
import addTaskDto from './dto/addTask.dto';
import { ICreateTask } from './interface/task.interface';
import ProjectRepository from 'src/project/project.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly projectRepo: ProjectRepository,
  ) {}

  public async createTask(data: addTaskDto) {
    const { name, description, projectId, parentTaskId, weight } = data;
    const taskObj: ICreateTask = {
      name,
      description,
      project: projectId,
    };

    const project = await this.projectRepo.findOne(Number(projectId));
    if (!project) {
      throw new BadRequestException({ message: 'Invalid projectId' });
    }
    if (parentTaskId) {
      const task = await this.taskRepo.findOne(Number(parentTaskId));
      if (!task)
        throw new BadRequestException({ message: 'Invalid parentTaskId' });
      taskObj.progress = 0;
      taskObj.parentTask = parentTaskId;
      taskObj.weight = weight;
      taskObj.project = task.project; // overide the requested projectId to projectId of parentTask

      this.taskRepo.update(Number(parentTaskId), {
        hasSubTask: true,
        weight: null,
        progress: null,
      });
    }
    return this.taskRepo.save(taskObj);
  }

  public async updateTask(taskId: string, updateRequest: any) {
    const { progress, weight } = updateRequest;
    const task = await this.taskRepo.findOne(Number(taskId));
    if (!task) {
      throw new BadRequestException({ message: 'Invalid taskId' });
    }
    if ((progress || weight) && task.hasSubTask) {
      throw new BadRequestException({ message: 'Task has subtasks' });
    }

    const updateObj = { progress, weight };
    return this.taskRepo.update(Number(taskId), updateObj);
  }
}
