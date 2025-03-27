import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskManagementDto } from './create-task_management.dto';

export class UpdateTaskManagementDto extends PartialType(CreateTaskManagementDto) {}
