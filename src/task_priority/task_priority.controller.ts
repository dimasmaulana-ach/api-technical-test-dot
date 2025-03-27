import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskPriorityService } from './task_priority.service';
import { CreateTaskPriorityDto } from './dto/create-task_priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task_priority.dto';

@Controller('task-priority')
export class TaskPriorityController {
  constructor(private readonly taskPriorityService: TaskPriorityService) {}

  @Post()
  async create(@Body() createTaskPriorityDto: CreateTaskPriorityDto) {
    return await this.taskPriorityService.create(createTaskPriorityDto);
  }

  @Get()
  async findAll() {
    return await this.taskPriorityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskPriorityService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskPriorityDto: UpdateTaskPriorityDto,
  ) {
    return await this.taskPriorityService.update(id, updateTaskPriorityDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskPriorityService.remove(id);
  }
}
