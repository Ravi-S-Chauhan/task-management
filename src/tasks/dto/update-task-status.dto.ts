import { IsEnum } from 'class-validator';
import { TasksStatus } from '../task-status.enum';

export class updateTaskStatusDto {
  @IsEnum(TasksStatus)
  status: TasksStatus;
}
