import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import ProjectRepository from './project.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import ProjectEntity from './project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  providers: [ProjectService, ProjectRepository],
  controllers: [ProjectController],
  exports: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
