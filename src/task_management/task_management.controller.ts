import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskManagementService } from './task_management.service';
import { CreateTaskManagementDto } from './dto/create-task_management.dto';
import { UpdateTaskManagementDto } from './dto/update-task_management.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('task-management')
export class TaskManagementController {
  constructor(private readonly taskManagementService: TaskManagementService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  create(@Body() createTaskManagementDto: CreateTaskManagementDto) {
    return this.taskManagementService.create(createTaskManagementDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return this.taskManagementService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return this.taskManagementService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTaskManagementDto: UpdateTaskManagementDto,
  ) {
    return this.taskManagementService.update(id, updateTaskManagementDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.taskManagementService.remove(id);
  }
}
