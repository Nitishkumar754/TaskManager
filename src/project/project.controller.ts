import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import addProjectDto from './dto/addProject.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}
  @Post('')
  public async addProject(@Body() data: addProjectDto) {
    return this.projectService.createProject(data);
  }

  @Get(':id')
  public async getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }
}
