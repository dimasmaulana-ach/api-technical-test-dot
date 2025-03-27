import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskStatusDto } from './dto/create-task_status.dto';
import { UpdateTaskStatusDto } from './dto/update-task_status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskStatus } from './entities/task_status.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private taskStatusRepository: Repository<TaskStatus>,
  ) {}

  async create(createTaskStatusDto: CreateTaskStatusDto) {
    const body = createTaskStatusDto;
    const data = await this.taskStatusRepository.create(body);
    const result = await this.taskStatusRepository.save(data);
    return {
      message: 'Task Status created successfully',
      data: result,
    };
  }

  async findAll() {
    const data = await this.taskStatusRepository
      .createQueryBuilder('taskStatus')
      .select([
        'taskStatus.id',
        'taskStatus.name',
        'taskStatus.description',
        'taskStatus.sequence',
        'taskStatus.color',
        'taskStatus.createdAt',
        'taskStatus.updatedAt',
      ])
      .orderBy('taskStatus.sequence', 'ASC')
      .getMany();
    return {
      message: 'Task Status retrieved successfully',
      data: data,
    };
  }

  async findOne(id: string) {
    const data = await this.taskStatusRepository
      .createQueryBuilder('taskStatus')
      .select([
        'taskStatus.id',
        'taskStatus.name',
        'taskStatus.description',
        'taskStatus.sequence',
        'taskStatus.color',
        'taskStatus.createdAt',
        'taskStatus.updatedAt',
      ])
      .where('taskStatus.id = :id', { id })
      .getOne();
    if (!data) {
      throw new NotFoundException(`TaskStatus with id ${id} not found`);
    }
    return {
      message: 'Task Status retrieved successfully',
      data: data,
    };
  }

  async update(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
    const taskStatus = this.taskStatusRepository.findOneBy({ id });
    if (!taskStatus) {
      throw new NotFoundException(`TaskStatus with id ${id} not found`);
    }

    await this.taskStatusRepository.update(id, updateTaskStatusDto);

    const data = await this.taskStatusRepository
      .createQueryBuilder('taskStatus')
      .select([
        'taskStatus.id',
        'taskStatus.name',
        'taskStatus.description',
        'taskStatus.sequence',
        'taskStatus.color',
        'taskStatus.createdAt',
        'taskStatus.updatedAt',
      ])
      .where('taskStatus.id = :id', { id })
      .getOne();
    if (!data) {
      throw new NotFoundException(`TaskStatus with id ${id} not found`);
    }
    return {
      message: 'Task Status updated successfully',
      data: data,
    };
  }

  async updateBulk(createTaskStatusDtos: {
    taskStatus: UpdateTaskStatusDto[];
  }) {
    const { taskStatus } = createTaskStatusDtos;

    // Pisahkan data dengan ID (update) dan tanpa ID (insert)
    const updates = taskStatus.filter((dto) => dto.id);
    const inserts = taskStatus.filter((dto) => !dto.id);

    // Jika ada yang perlu di-update, cari data lamanya
    if (updates.length > 0) {
      const ids = updates.map((dto) => dto.id);
      const existingTaskStatuses = await this.taskStatusRepository.find({
        where: { id: In(ids) },
      });

      if (existingTaskStatuses.length === 0) {
        throw new NotFoundException(`No TaskStatus found`);
      }

      // Perbarui data yang ada
      updates.forEach((dto) => {
        const existing = existingTaskStatuses.find((e) => e.id === dto.id);
        Object.assign(existing, dto);
      });

      await this.taskStatusRepository.save(existingTaskStatuses);
    }

    // Insert data baru
    if (inserts.length > 0) {
      await this.taskStatusRepository.save(inserts);
    }

    // Ambil data terbaru dari database
    const data = await this.taskStatusRepository
      .createQueryBuilder('taskStatus')
      .select([
        'taskStatus.id',
        'taskStatus.name',
        'taskStatus.description',
        'taskStatus.sequence',
        'taskStatus.color',
        'taskStatus.createdAt',
        'taskStatus.updatedAt',
      ])
      .getMany();

    return {
      message: 'TaskStatus updated successfully',
      data,
    };
  }

  async remove(id: string) {
    const taskStatus = await this.taskStatusRepository.findOneBy({ id });
    if (!taskStatus) {
      throw new NotFoundException(`TaskStatus with id ${id} not found`);
    }

    await this.taskStatusRepository.delete(id);
    return {
      message: 'Task Status deleted successfully',
    };
  }
}
