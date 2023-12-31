import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import addTaskDto from './dto/addTask.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @Post('')
  public async addTask(@Body() data: addTaskDto) {
    return this.taskService.createTask(data);
  }

  @Patch(':id')
  public async updateTask(@Param('id') id: string, @Body() data: any) {
    return this.taskService.updateTask(id, data);
  }
}
