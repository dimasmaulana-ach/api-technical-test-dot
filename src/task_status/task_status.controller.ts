import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskStatusService } from './task_status.service';
import { CreateTaskStatusDto } from './dto/create-task_status.dto';
import { UpdateTaskStatusDto } from './dto/update-task_status.dto';

@Controller('task-status')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Post()
  async create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return await this.taskStatusService.create(createTaskStatusDto);
  }

  @Get()
  async findAll() {
    return await this.taskStatusService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.taskStatusService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return await this.taskStatusService.update(id, updateTaskStatusDto);
  }

  @Post('bulk')
  async createBulk(
    @Body() createTaskStatusDtos: { taskStatus: UpdateTaskStatusDto[] },
  ) {
    return await this.taskStatusService.updateBulk(createTaskStatusDtos);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.taskStatusService.remove(id);
  }
}
