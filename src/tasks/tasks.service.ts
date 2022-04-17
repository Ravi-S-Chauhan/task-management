import { Injectable } from '@nestjs/common';
import { Tasks, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  createTask(CreateTaskDto: CreateTaskDto): Tasks {
    const { title, description } = CreateTaskDto;
    const task: Tasks = {
      id: uuid(),
      title,
      description,
      status: TasksStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
