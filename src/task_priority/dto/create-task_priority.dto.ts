import { IsString } from 'class-validator';

export class CreateTaskPriorityDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  level: string;
  @IsString()
  color: string;
}
