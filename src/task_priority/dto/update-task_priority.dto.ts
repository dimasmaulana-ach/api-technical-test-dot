import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskPriorityDto } from './create-task_priority.dto';

export class UpdateTaskPriorityDto extends PartialType(CreateTaskPriorityDto) {
  id: string;
}
