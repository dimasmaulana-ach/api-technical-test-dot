import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateTaskManagementDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  targetDate: string;

  @IsString()
  @IsOptional()
  actualDate: string;

  @IsString()
  @IsOptional()
  taskStatusId: string;

  @IsString()
  @IsOptional()
  taskPriorityId: string;

  @IsArray()
  @IsOptional()
  userIds: string[];
}
