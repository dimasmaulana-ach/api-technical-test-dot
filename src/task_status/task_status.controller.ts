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
import { TaskStatusService } from './task_status.service';
import { CreateTaskStatusDto } from './dto/create-task_status.dto';
import { UpdateTaskStatusDto } from './dto/update-task_status.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task-status')
export class TaskStatusController {
  constructor(private readonly taskStatusService: TaskStatusService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async create(@Body() createTaskStatusDto: CreateTaskStatusDto) {
    return await this.taskStatusService.create(createTaskStatusDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    return await this.taskStatusService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.taskStatusService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ) {
    return await this.taskStatusService.update(id, updateTaskStatusDto);
  }

  @Post('bulk')
  @UseGuards(AuthGuard)
  async createBulk(
    @Body() createTaskStatusDtos: { taskStatus: UpdateTaskStatusDto[] },
  ) {
    return await this.taskStatusService.updateBulk(createTaskStatusDtos);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async remove(@Param('id') id: string) {
    return await this.taskStatusService.remove(id);
  }
}
