import { Injectable } from '@nestjs/common';
import { CreateTaskManagementDto } from './dto/create-task_management.dto';
import { UpdateTaskManagementDto } from './dto/update-task_management.dto';

@Injectable()
export class TaskManagementService {
  create(createTaskManagementDto: CreateTaskManagementDto) {
    return 'This action adds a new taskManagement';
  }

  findAll() {
    return `This action returns all taskManagement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskManagement`;
  }

  update(id: number, updateTaskManagementDto: UpdateTaskManagementDto) {
    return `This action updates a #${id} taskManagement`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskManagement`;
  }
}
