import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskPriorityDto } from './dto/create-task_priority.dto';
import { UpdateTaskPriorityDto } from './dto/update-task_priority.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskPriority } from './entities/task_priority.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskPriorityService {
  constructor(
    @InjectRepository(TaskPriority)
    private readonly taskPriorityRepository: Repository<TaskPriority>,
  ) {}

  async create(createTaskPriorityDto: CreateTaskPriorityDto) {
    const body = createTaskPriorityDto;
    const taskPriority = await this.taskPriorityRepository.create(body);
    await this.taskPriorityRepository.save(taskPriority);
    return {
      message: 'Task Priority created successfully',
      data: taskPriority,
    };
  }

  async findAll() {
    const data = await this.taskPriorityRepository
      .createQueryBuilder('taskPriority')
      .select([
        'taskPriority.id',
        'taskPriority.name',
        'taskPriority.description',
        'taskPriority.level',
        'taskPriority.color',
        'taskPriority.createdAt',
        'taskPriority.updatedAt',
      ])
      .orderBy('taskPriority.level', 'ASC')
      .getMany();
    return {
      message: 'Task Priority retrieved successfully',
      data: data,
    };
  }

  async findOne(id: string) {
    const data = await this.taskPriorityRepository
      .createQueryBuilder('taskPriority')
      .select([
        'taskPriority.id',
        'taskPriority.name',
        'taskPriority.description',
        'taskPriority.level',
        'taskPriority.color',
        'taskPriority.createdAt',
        'taskPriority.updatedAt',
      ])
      .where('taskPriority.id = :id', { id })
      .getOne();
    if (!data) {
      throw new NotFoundException(`Task Priority with id ${id} not found`);
    }
    return {
      message: 'Task Priority retrieved successfully',
      data: data,
    };
  }

  async update(id: string, updateTaskPriorityDto: UpdateTaskPriorityDto) {
    const check = await this.taskPriorityRepository.findOneBy({ id });
    if (!check) {
      throw new NotFoundException(`Task Priority with id ${id} not found`);
    }
    await this.taskPriorityRepository.update(id, updateTaskPriorityDto);

    const data = await this.taskPriorityRepository
      .createQueryBuilder('taskPriority')
      .select([
        'taskPriority.id',
        'taskPriority.name',
        'taskPriority.description',
        'taskPriority.level',
        'taskPriority.color',
        'taskPriority.createdAt',
        'taskPriority.updatedAt',
      ])
      .where('taskPriority.id = :id', { id })
      .getOne();
    return {
      message: 'Task Priority updated successfully',
      data: data,
    };
  }

  async remove(id: string) {
    const data = await this.taskPriorityRepository.findOneBy({ id });
    if (!data) {
      throw new NotFoundException(`Task Priority with id ${id} not found`);
    }
    await this.taskPriorityRepository.delete(id);
    return {
      message: 'Task Priority deleted successfully',
    };
  }
}
