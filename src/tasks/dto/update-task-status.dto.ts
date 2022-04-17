import { IsEnum } from 'class-validator';
import { TasksStatus } from '../task.model';

export class updateTaskStatusDto {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
