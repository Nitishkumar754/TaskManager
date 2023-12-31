import { BadRequestException, Injectable } from '@nestjs/common';
import addProjectDto from './dto/addProject.dto';
import ProjectRepository from './project.repository';
import { IgetProjectResponse } from 'src/task/interface/projectDetailResponse.interface';

@Injectable()
export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository) {}
  public async createProject(data: addProjectDto) {
    return this.projectRepo.save(data);
  }

  public formatProjectResponse(result) {
    let weightedProgress = 0;
    let totalWeight = 0;
    result.forEach((r) => {
      weightedProgress += r.taskProgress * r.taskWeight;
      totalWeight += r.taskWeight;
    });
    const projectCompletionPercent = Math.round(
      weightedProgress / totalWeight,
    ).toFixed(0);
    const response: IgetProjectResponse = {
      projectProgress: `${projectCompletionPercent}%`,
      name: result[0].projectName,
      description: result[0].projectDescription,
    };

    return response;
  }
  public async getProject(id) {
    const project = await this.projectRepo.getProjectStatus(id);
    if (!project || !project.length)
      throw new BadRequestException({
        message: 'Invalid projectId or project with no task',
      });

    return this.formatProjectResponse(project);
  }
}
