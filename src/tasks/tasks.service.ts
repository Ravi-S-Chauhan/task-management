import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, TasksStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getAllTasks(): Tasks[] {
    return this.tasks;
  }

  getTaskWithFilter(filterDto: GetTaskFilterDto): Tasks[] {
    const { status, search } = filterDto;
    
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.description.includes(search) || task.title.includes(search)) {
          return true;
        }
        return false;
      });
    }
    return tasks;
  }

  getTaskById(id: string): Tasks {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Not found task of id: "${id}"`);
    }
    return found;
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
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  updateTaskStatus(id: string, status: TasksStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
