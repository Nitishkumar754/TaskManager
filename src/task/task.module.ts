import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskEntity from './task.entity';
import TaskRepository from './task.repository';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity]), ProjectModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
  exports: [TaskService, TaskRepository],
})
export class TaskModule {}
