import { Injectable } from '@nestjs/common';
import { Tasks, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TasksController } from './tasks.controller';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getTaskById(id: string): Tasks {
    return this.tasks.find((task) => task.id === id);
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

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TasksStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
