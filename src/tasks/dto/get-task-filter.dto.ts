import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TasksStatus } from '../task-status.enum';

export class GetTaskFilterDto {
  @IsEnum(TasksStatus)
  @IsOptional()
  status?: TasksStatus;
  @IsString()
  @IsOptional()
  search?: string;
}
