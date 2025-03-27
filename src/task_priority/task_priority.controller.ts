import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { TaskPriorityService } from './task_priority.service';
import { CreateTaskPriorityDto } from './dto/create-task_priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task_priority.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task-priority')
export class TaskPriorityController {
  constructor(private readonly taskPriorityService: TaskPriorityService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async create(@Body() createTaskPriorityDto: CreateTaskPriorityDto) {
    return await this.taskPriorityService.create(createTaskPriorityDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.taskPriorityService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.taskPriorityService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTaskPriorityDto: UpdateTaskPriorityDto,
  ) {
    return await this.taskPriorityService.update(id, updateTaskPriorityDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.taskPriorityService.remove(id);
  }
}
