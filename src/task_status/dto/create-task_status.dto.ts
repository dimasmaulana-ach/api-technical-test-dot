import { IsString } from 'class-validator';

export class CreateTaskStatusDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
  @IsString()
  sequence: string;
  @IsString()
  color: string;
}
