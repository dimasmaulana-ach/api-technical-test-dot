import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskManagementService } from './task_management.service';
import { CreateTaskManagementDto } from './dto/create-task_management.dto';
import { UpdateTaskManagementDto } from './dto/update-task_management.dto';

@Controller('task-management')
export class TaskManagementController {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  @Post()
  create(@Body() createTaskManagementDto: CreateTaskManagementDto) {
    return this.taskManagementService.create(createTaskManagementDto);
  }

  @Get()
  findAll() {
    return this.taskManagementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskManagementService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskManagementDto: UpdateTaskManagementDto,
  ) {
    return this.taskManagementService.update(id, updateTaskManagementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskManagementService.remove(id);
  }
}
