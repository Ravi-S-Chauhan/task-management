import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Tasks, TasksStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Tasks[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Tasks {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() CreateTaskDto: CreateTaskDto): Tasks {
    return this.tasksService.createTask(CreateTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TasksStatus,
  ): Tasks {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
